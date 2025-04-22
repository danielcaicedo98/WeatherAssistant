import { useState, useEffect } from "react";
import axios from "axios";
import { useTextToSpeech } from "../../hooks/useTextToSpeech";

const API_KEY = "15d4466459384ee996c03456251103";
const BASE_URL = "https://api.weatherapi.com/v1";

function CurrentWeather() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const { speak } = useTextToSpeech();

  useEffect(() => {
    async function fetchWeather() {
      try {
        const url = `${BASE_URL}/forecast.json?key=${API_KEY}&q=Cali&days=3&lang=es`;
        const response = await axios.get(url);
        setWeather(response.data.current);

        // 👇 TEXTO PARA LEER
        const data = response.data.current;
        const mensaje = `El clima actual en Cali es ${data.condition.text}, con una temperatura de ${data.temp_c} grados. 
      con una sensacion termica de ${data.feelslike_c} grados. La humedad es del ${data.humidity} por ciento, el viento sopla a ${data.wind_kph} kilómetros por hora hacia el ${data.wind_dir}. 
      La presión atmosférica es de ${data.pressure_mb} milibares y el índice UV es ${data.uv}.`;

        speak(mensaje); // 🗣️ Leer en voz alta
      } catch (err) {
        setError("No se pudo obtener el clima. Inténtalo de nuevo más tarde.");
      }
    }
    fetchWeather();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  if (!weather) {
    return <div className="text-center p-4">Cargando clima...</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Cali</h2>
      <div className="flex items-center justify-center">
        <img
          src={"https:" + weather.condition.icon}
          alt={weather.condition.text}
          className="w-16 h-16"
        />
        <p className="text-lg font-semibold">{weather.condition.text}</p>
      </div>
      <p className="text-center text-xl font-bold">{weather.temp_c}°C</p>
      <p className="text-center text-gray-600">Sensación térmica: {weather.feelslike_c}°C</p>
      <p className="text-center text-gray-600">Humedad: {weather.humidity}%</p>
      <p className="text-center text-gray-600">Viento: {weather.wind_kph} km/h ({weather.wind_dir})</p>
      <p className="text-center text-gray-600">Presión: {weather.pressure_mb} mb</p>
      <p className="text-center text-gray-600">Índice UV: {weather.uv}</p>
    </div>
  );
}

export default CurrentWeather;
