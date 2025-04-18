import React, { useState, useEffect, useRef } from "react";
import { GoogleGenAI } from "@google/genai";
import axios from "axios"; // Importamos Axios para realizar solicitudes HTTP

// Definimos la clave de API y la URL base de WeatherAPI
const API_KEY = "15d4466459384ee996c03456251103";
const BASE_URL = "https://api.weatherapi.com/v1";

const ai = new GoogleGenAI({ apiKey: "AIzaSyBU2J0qovGFAOBrDGkqiNlLg5JJ9Rbd5wk" });

async function generarRespuesta(prompt) {
    /**
     * Genera una respuesta en texto utilizando la API de Gemini de Google AI Studio.
     *
     * @param {string} prompt - El prompt o instrucción para el modelo.
     * @returns {Promise<string>} - La respuesta generada por el modelo.
     */
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
    });
    return response.text;
}



// Definimos el estado para almacenar el pronóstico del clima



const SmartAssistant = () => {
    const [isListening, setIsListening] = useState(false);
    const [vozesDisponibles, setVozesDisponibles] = useState([]);
    const recognitionRef = useRef(null);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const timerRef = useRef(null);

    const [forecast, setForecast] = useState([]);
    const [currentWeather, setCurrentWeather] = useState([]);
    // Definimos el estado para manejar posibles errores
    const [error, setError] = useState(null);

    // useEffect se ejecuta cuando el componente se monta
    useEffect(() => {
        // Función asíncrona para obtener el pronóstico del clima
        const obtenerClima = async () => {
            try {
                // Construimos la URL con los parámetros requeridos
                const url = `${BASE_URL}/forecast.json?key=${API_KEY}&q=Cali&days=3&lang=es`;
                // Realizamos la solicitud GET a la API
                const respuesta = await axios.get(url);
                // Actualizamos el estado con los datos obtenidos
                setForecast(respuesta.data.forecast.forecastday);
                setCurrentWeather(respuesta.data.current);
            } catch (error) {
                // Si ocurre un error, actualizamos el estado con un mensaje de error
                setError("Error al obtener el pronóstico del clima.");
            }
        };

        obtenerClima(); // Llamamos a la función para obtener el clima
    }, []);


    useEffect(() => {

        const handleVoices = () => {
            const voices = window.speechSynthesis.getVoices();
            setVozesDisponibles(voices);
        };

        if (typeof window !== "undefined" && window.speechSynthesis) {
            window.speechSynthesis.onvoiceschanged = handleVoices;
            handleVoices();
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
            clearInterval(timerRef.current);
        };
    }, []);

    useEffect(() => {
        if (isListening) {
            timerRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);
        } else {
            clearInterval(timerRef.current);
            setRecordingTime(0);
        }

        return () => clearInterval(timerRef.current);
    }, [isListening]);

    const reproducirTexto = (texto) => {
        if ("speechSynthesis" in window && texto) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(texto);
            utterance.lang = "es-MX";
            utterance.pitch = 0.8;
            utterance.rate = 1.5;

            const vozLatino = vozesDisponibles.find(
                (v) => v.name === "Microsoft Sabina - Spanish (Mexico)"
            );
            if (vozLatino) {
                utterance.voice = vozLatino;
            }

            utterance.onstart = () => {
                setIsSpeaking(true);
            };

            utterance.onend = () => {
                setIsSpeaking(false);
                console.log("Fin de la reproducción de voz");
            };

            utterance.onerror = (event) => {
                console.error("Error en speech synthesis:", event);
                setIsSpeaking(false);
            };

            window.speechSynthesis.speak(utterance);
        }
    };



    const procesarMensaje = async (nuevoMensaje) => {
        const mensaje = nuevoMensaje.toLowerCase(); // Convertir a minúsculas para comparación
        try {
            if (mensaje.includes('abrir asistente')) {
                reproducirTexto('Nos dirigimos al asistente interactivo');
                window.location.href = "/dashboard/assistant"
            } else if (mensaje.includes('abrir ayuda')) {
                reproducirTexto('Nos dirigimos a la sección de ayuda.');
                window.location.href = '/dashboard/usermanual';
            } else if (mensaje.includes('ir al inicio')) {
                reproducirTexto('Nos dirigimos al inicio');
                window.location.href = '/dashboard/home';
            }
            else if (mensaje.includes('clima actual')) {
                generarRespuesta(
                    `
                    Te voy a pasar el clima actual de Cali, Colombia.
                    por Favor en una frase corta dame el resumen del clima actual.
                    con lo más importante como la temperatura, la humedad y el estado del clima.
                    y algunas recomendaciones.
                    ${currentWeather.condition.text}
                    ${currentWeather.temp_c}°C
                    ${currentWeather.feelslike_c}°C
                    
                    `
                ).then((respuesta) => {
                    console.log("Respuesta generada:", respuesta);
                    reproducirTexto(respuesta); // Reproducir la respuesta generada
                });
            }
            else if (mensaje.includes('pronóstico para mañana')) {
                generarRespuesta(
                    `
                    Te voy a pasar el pronóstico del clima para el día de mañana en Cali, Colombia.
                    por Favor en una frase corta dame el resumen del clima actual.
                    con lo más importante como la temperatura, la humedad y el estado del clima.
                    y algunas recomendaciones.
                    ${forecast[0].day.condition.text}
                    ${forecast[0].day.maxtemp_c}°C
                    ${forecast[0].day.mintemp_c}°C
                    ${forecast[0].day.humidity}%
                    ${forecast[0].day.daily_chance_of_rain}%
                    `
                ).then((respuesta) => {
                    console.log("Respuesta generada:", respuesta);
                    reproducirTexto(respuesta); // Reproducir la respuesta generada
                });
            }
            else if (mensaje.includes('saludar')) {
                const saludo = "¡Hola! ¿Cómo estás? Es un placer saludarte. Estoy aquí para ayudarte en lo que necesites. ¡Espero que tengas un excelente día!";
                reproducirTexto(saludo); // Reproducir el saludo
            } else {
                console.log("Comando no reconocido");
                reproducirTexto("Lo siento, no reconozco ese comando. Di ayuda para más información"); // Reproducir un mensaje de error
            }
        } catch (error) {
            console.error("Error al enviar al backend:", error);
        }
    };

    useEffect(() => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            console.error("Tu navegador no soporta SpeechRecognition.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = "es-ES";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.trim();
            console.log("Usuario dijo:", transcript);
            procesarMensaje(transcript);
        };

        recognition.onerror = (event) => {
            console.error("Error en reconocimiento de voz:", event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current = recognition;
    }, [vozesDisponibles]);

    const startListening = () => {
        if (!recognitionRef.current) return;
        try {
            recognitionRef.current.start();
            setIsListening(true);
        } catch (error) {
            console.error("Error al iniciar el reconocimiento:", error);
            setIsListening(false);
        }
    };

    const stopListening = () => {
        if (!recognitionRef.current) return;
        recognitionRef.current.stop();
        setIsListening(false);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const detenerHabla = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    };

    return (
        <div className="p-2 flex flex-col items-center">
            {/* Botones en fila */}
            <div className="flex items-center justify-between w-full max-w-xs ">
                {/* Botón Detener Voz (izquierda) */}
                {isSpeaking && (
                    <button
                        onClick={detenerHabla}
                        className="w-8 h-8 m-2 bg-red-600 text-white font-bold rounded-lg flex items-center justify-center shadow-lg hover:bg-red-700 transition-all"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 12h14"
                            />
                        </svg>
                    </button>
                )}

                {/* Botón Grabación (centro) */}
                <div className="relative flex-grow flex justify-center">
                    <button
                        onClick={() => {
                            if (!isListening) {
                                startListening();
                            }
                        }}
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold 
          ${isListening ? 'bg-red-500 animate-pulse' : 'bg-green-500'} 
          shadow-lg hover:shadow-xl transition-all`}
                    >
                        {isListening ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>
                        )}
                    </button>

                    {isListening && (
                        <div className="absolute -bottom-6 text-gray-600 text-sm">
                            {formatTime(recordingTime)}
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
};

export default SmartAssistant;
