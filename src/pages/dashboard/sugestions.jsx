import { useState, useRef, useEffect } from "react";
import { Card, Button, Typography } from "@material-tailwind/react";
import { ArrowLeft, CloudRain, Sun, Cloud, Umbrella, Mic } from "lucide-react";
import { responderConsultaClima } from "../../configs/chatbot/gemini";
import { useSpeechRecognition } from "../../hooks/useSpeechRecognition";
import { useLocalWhisper } from "../../hooks/useLocalWhisper";

const Message = ({ text, sender, time }) => {
  return (
    <div className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs p-3 rounded-lg flex flex-col ${sender === 'user'
          ? 'bg-white text-gray-800 rounded-br-none border border-gray-200'
          : 'bg-gray-100 text-gray-800 rounded-bl-none border border-gray-200'}`}
      >
        <Typography variant="small" className="font-normal">
          {text}
        </Typography>
        <Typography variant="small" className="text-xs opacity-70 mt-1 self-end">
          {time}
        </Typography>
      </div>
    </div>
  );
};

const TypingIndicator = () => (
  <div className="flex justify-start">
    <div className="bg-gray-100 p-3 rounded-lg rounded-bl-none border border-gray-200">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  </div>
);

const Suggestions = ({ setScreen, weatherData }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para formatear la fecha como "YYYY-MM-DD"
  const getDateString = (date) => date.toISOString().split('T')[0];

  // Fecha de hoy
  const today = new Date();
  // Usamos hace dos días como fecha final para asegurarnos de que el día esté completo
  const endDate = new Date(today);
  endDate.setDate(today.getDate() - 2);
  // Fecha de inicio: 7 días atrás (incluyendo el día final, se obtienen 7 días completos)
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 8);


  const start_date_str = getDateString(startDate);
  const end_date_str = getDateString(endDate);

  // Coordenadas aproximadas de Cali, Colombia
  const latitude = 3.4516;
  const longitude = -76.5320;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // URL del endpoint histórico de Open-Meteo
        const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${start_date_str}&end_date=${end_date_str}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=America%2FBogota`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Error al obtener los datos del clima');
        }
        const data = await response.json();

        setWeather(data.daily);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [start_date_str, end_date_str, latitude, longitude]);

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Hoy hay un ${weatherData?.rainProbability || 87}% de probabilidad de lluvia en ${weatherData?.city || "Cali"}. ¿Qué tipo de sugerencias necesitas?`,
      sender: "bot",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // 
  const { startRecording, stopRecording, isRecording } = useLocalWhisper({
    onTranscript: (text) => {
      setInputValue(text);
      setTimeout(() => handleSendMessage(), 100);
    },
  });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getWeatherIcon = () => {
    const rainProb = weatherData?.rainProbability || 87;
    if (rainProb > 70) return <CloudRain className="text-blue-500" size={24} />;
    if (rainProb > 30) return <Cloud className="text-gray-500" size={24} />;
    return <Sun className="text-yellow-500" size={24} />;
  };

  const getSuggestionBasedOnWeather = (userInput) => {
    const rainProb = weatherData?.rainProbability || 87;
    const tempMax = weatherData?.tempMax || 29.3;
    const tempMin = weatherData?.tempMin || 14.6;

    if (userInput.toLowerCase().includes('ropa') || userInput.toLowerCase().includes('vestir')) {
      if (rainProb > 70) {
        return "Te recomiendo usar ropa impermeable y calzado resistente al agua. No olvides un paraguas.";
      } else if (tempMax - tempMin > 10) {
        return "Como habrá gran variación térmica, usa ropa por capas que puedas ajustar durante el día.";
      } else if (tempMax > 28) {
        return "Usa ropa ligera y de colores claros, y no olvides protector solar.";
      } else {
        return "Un abrigo ligero sería buena idea para las temperaturas de hoy.";
      }
    } else if (userInput.toLowerCase().includes('actividad') || userInput.toLowerCase().includes('plan')) {
      if (rainProb > 70) {
        return "Con esta probabilidad de lluvia, mejor planea actividades en interiores como visitar museos o cafés.";
      } else if (rainProb > 40) {
        return "Puedes hacer actividades al aire libre, pero ten un plan alternativo por si llueve.";
      } else {
        return "¡Es un gran día para actividades al aire libre! Disfruta del buen tiempo.";
      }
    } else if (userInput.toLowerCase().includes('transporte') || userInput.toLowerCase().includes('viaje')) {
      if (rainProb > 60) {
        return "La lluvia puede afectar el tráfico. Sal con tiempo adicional y considera transporte público.";
      } else {
        return "El transporte debería fluir normalmente hoy. ¡Buen viaje!";
      }
    } else {
      if (rainProb > 70) {
        return "No olvides tu paraguas o impermeable hoy. La lluvia puede ser intensa.";
      } else if (tempMax > 28) {
        return "Recuerda mantenerte hidratado y usar protección solar hoy.";
      } else if (tempMin < 15) {
        return "Las mañanas pueden ser frescas, considera llevar algo abrigado.";
      } else {
        return "El clima hoy parece bastante agradable. ¡Disfruta tu día!";
      }
    }
  };

  const handleSendMessage = async () => {
    if (inputValue.trim()) {

      const newUserMessage = {
        id: messages.length + 1,
        text: inputValue,
        sender: "user",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }


      setMessages(prev => [...prev, newUserMessage]);
      setInputValue('');
      setIsTyping(true);

      const AiResponse = await responderConsultaClima(inputValue, JSON.stringify(weather));
      console.log({ AiResponse });

      setTimeout(() => {
        const botResponse = getSuggestionBasedOnWeather(inputValue);

        const newBotMessage = {
          id: messages.length + 2,
          text: AiResponse,
          sender: "bot",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, newBotMessage]);
        setIsTyping(false);
      }, 1000 + Math.random() * 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <Card className="p-6 max-w-md bg-blue-500 text-white rounded-2xl shadow-xl w-full">
        <div className="mb-4 border-b border-blue-400 pb-3">
          <div className="flex items-center gap-2">
            {getWeatherIcon()}
            <Typography variant="h5" className="font-bold text-white">
              Sugerencias - {weatherData?.city || "Cali"}
            </Typography>
          </div>

          <div className="mt-3 text-sm grid grid-cols-2 gap-2 text-white">
            <div>
              <Typography variant="small" className="font-semibold">
                <Umbrella className="inline mr-1" size={16} />
                Prob. Lluvia: {weatherData?.rainProbability || 87}%
              </Typography>
            </div>
            <div>
              <Typography variant="small">
                <Sun className="inline mr-1" size={16} />
                Máx: {weatherData?.tempMax || 29.3}°C
              </Typography>
            </div>
            <div>
              <Typography variant="small">
                Condición: {weatherData?.condition || "Lluvia moderada"}
              </Typography>
            </div>
            <div>
              <Typography variant="small">
                <Sun className="inline mr-1" size={16} />
                Mín: {weatherData?.tempMin || 14.6}°C
              </Typography>
            </div>
          </div>
        </div>
        <div className="h-64 overflow-y-auto mb-4 space-y-3">
          {messages.map((message) => (
            <Message
              key={message.id}
              text={message.text}
              sender={message.sender}
              time={message.time}
            />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Escribe tu pregunta..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white text-gray-800"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button
            onClick={handleSendMessage}
            className="bg-white text-blue-500 hover:bg-gray-100 hover:text-blue-600"
            disabled={!inputValue.trim()}
          >
            Enviar
          </Button>
          <Button
            onClick={isRecording ? stopRecording : startRecording}
            className={`bg-white ${isRecording ? "text-red-500" : "text-blue-500"} hover:bg-gray-100`}
          >
            🎙️
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Suggestions;