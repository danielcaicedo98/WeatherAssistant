// src/data/weatherService.js
const API_KEY = "15d4466459384ee996c03456251103";
const BASE_URL = "http://api.weatherapi.com/v1";
const LOCATION = "Cali"; 
const LANG = "es"; 

export async function getCurrentWeather() {
  try {
    const response = await fetch(
      `${BASE_URL}/current.json?key=${API_KEY}&q=${LOCATION}&lang=${LANG}`
    );
    const data = await response.json();
    return {
      temperature: data.current.temp_c,
      condition: data.current.condition.text,
      condition_code: data.current.condition.code,
      icon: data.current.condition.icon,
      feelslike_c: data.current.feelslike_c,
      humidity: data.current.humidity,
      wind_speed: data.current.wind_kph,
      wind_dir: data.current.wind_dir,
      pressure_mb: data.current.pressure_mb,
      uv: data.current.uv
    };
  } catch (error) {
    console.error("Error obteniendo el clima actual:", error);
    return {};
  }
}

export async function getWeatherForecast() {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${LOCATION}&days=3&lang=${LANG}`
    );
    const data = await response.json();
    const forecast = data.forecast.forecastday[1].day; // Pronóstico para mañana
    return {
      summary: forecast.condition.text,
      max_temp: forecast.maxtemp_c,
      min_temp: forecast.mintemp_c,
      icon: forecast.condition.icon
    };
  } catch (error) {
    console.error("Error obteniendo el pronóstico:", error);
    return {};
  }
}

export async function getWeatherAlerts() {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${LOCATION}&days=1&alerts=yes&lang=${LANG}`
    );
    const data = await response.json();
    
    let alertCount = 0;
    let alertDetails = "Sin alertas";
    
    if (data.alerts && data.alerts.alert.length > 0) {
      alertCount = data.alerts.alert.length;
      alertDetails = data.alerts.alert.map(alert => alert.headline).join(", ");
    }
    
    return { 
      count: alertCount, 
      details: alertDetails 
    };
  } catch (error) {
    console.error("Error obteniendo alertas meteorológicas:", error);
    return { count: 0, details: "No disponible" };
  }
}