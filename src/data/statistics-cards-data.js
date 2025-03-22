// statistics-cards-data.js - Integración de datos climáticos
import { SunIcon, CloudIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { getCurrentWeather, getWeatherForecast, getWeatherAlerts } from "@/data/weatherService";

const weatherData = await getCurrentWeather();
const forecastData = await getWeatherForecast();
const alertData = await getWeatherAlerts();

export const statisticsCardsData = [
  {
    color: "blue",
    icon: SunIcon,
    title: "Clima Actual",
    value: `${weatherData.temperature}°C - ${weatherData.condition}`,
    footer: {
      color: "text-blue-500",
      value: `Humedad: ${weatherData.humidity}%`,
      label: "Viento: " + weatherData.wind_speed + " km/h",
    },
  },
  {
    color: "gray",
    icon: CloudIcon,
    title: "Pronóstico 3 Días",
    value: forecastData.summary,
    footer: {
      color: "text-gray-500",
      value: "Temp. Máx: " + forecastData.max_temp + "°C",
      label: "Temp. Mín: " + forecastData.min_temp + "°C",
    },
  },
  {
    color: "red",
    icon: ExclamationTriangleIcon,
    title: "Alertas Meteorológicas",
    value: alertData.count + " Alertas",
    footer: {
      color: "text-red-500",
      value: alertData.details,
      label: "Última actualización",
    },
  },
];

export default statisticsCardsData;
