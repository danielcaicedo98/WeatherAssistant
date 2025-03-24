import React, { useEffect, useState } from "react"; // Importamos React y los hooks useEffect y useState
import axios from "axios"; // Importamos Axios para realizar solicitudes HTTP

// Definimos la clave de API y la URL base de WeatherAPI
const API_KEY = "15d4466459384ee996c03456251103";
const BASE_URL = "http://api.weatherapi.com/v1";

const Forecast = () => {
  // Definimos el estado para almacenar el pronóstico del clima
  const [forecast, setForecast] = useState([]);
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
      } catch (error) {
        // Si ocurre un error, actualizamos el estado con un mensaje de error
        setError("Error al obtener el pronóstico del clima.");
      }
    };
    
    obtenerClima(); // Llamamos a la función para obtener el clima
  }, []); // El array vacío asegura que la solicitud solo se haga una vez al montar el componente

  // Si hay un error, mostramos un mensaje de error en pantalla
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold text-center mb-4">Pronóstico del Clima en Cali</h1>
      {forecast.map((day) => (
        <div key={day.date} className="mb-4 p-4 border rounded-lg bg-gray-100">
          {/* Mostramos la fecha del pronóstico */}
          <h2 className="text-lg font-semibold">{day.date}</h2>
          {/* Mostramos el ícono del clima correspondiente */}
          <img src={day.day.condition.icon} alt={day.day.condition.text} className="mx-auto" />
          {/* Descripción del estado del clima */}
          <p className="text-center text-gray-700">{day.day.condition.text}</p>
          {/* Temperaturas máximas y mínimas */}
          <p className="text-gray-700">Temperatura Máxima: {day.day.maxtemp_c}°C</p>
          <p className="text-gray-700">Temperatura Mínima: {day.day.mintemp_c}°C</p>
          {/* Probabilidad de lluvia */}
          <p className="text-gray-700">Probabilidad de Lluvia: {day.day.daily_chance_of_rain}%</p>
        </div>
      ))}
    </div>
  );
};

export default Forecast; // Exportamos el componente para su uso en otros archivos
