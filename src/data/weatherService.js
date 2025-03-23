// src/data/weatherService.js
import { useState, useEffect } from "react";

const API_URL = "https://api.open-meteo.com/v1/forecast";
const LATITUDE = 3.4516;
const LONGITUDE = -76.5320;
const TIMEZONE = "America/Bogota";

export async function getCurrentWeather() {
  try {
    const response = await fetch(
      `${API_URL}?latitude=${LATITUDE}&longitude=${LONGITUDE}&current_weather=true&timezone=${TIMEZONE}`
    );
    const data = await response.json();
    return {
      temperature: data.current_weather.temperature,
      condition: data.current_weather.weathercode,
      humidity: data.current_weather.relative_humidity,
      wind_speed: data.current_weather.windspeed,
    };
  } catch (error) {
    console.error("Error obteniendo el clima actual:", error);
    return {};
  }
}

export async function getWeatherForecast() {
  try {
    const response = await fetch(
      `${API_URL}?latitude=${LATITUDE}&longitude=${LONGITUDE}&daily=temperature_2m_max,temperature_2m_min&timezone=${TIMEZONE}`
    );
    const data = await response.json();
    return {
      summary: "Próximos días: Soleado a parcialmente nublado",
      max_temp: data.daily.temperature_2m_max[1],
      min_temp: data.daily.temperature_2m_min[1],
    };
  } catch (error) {
    console.error("Error obteniendo el pronóstico:", error);
    return {};
  }
}

export async function getWeatherAlerts() {
  try {
    const response = await fetch("https://archive-api.open-meteo.com/v1/archive?latitude=3.4516&longitude=-76.532&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=America%2FBogota");
    const data = await response.json();
    let alertCount = 0;
    let alertDetails = "Sin alertas";
    
    if (data.daily.temperature_2m_max[0] >= 35) {
      alertCount++;
      alertDetails = "⚠️ Calor extremo";
    }
    if (data.daily.precipitation_sum[0] >= 20) {
      alertCount++;
      alertDetails = "🌧️ Lluvias fuertes";
    }
    return { count: alertCount, details: alertDetails };
  } catch (error) {
    console.error("Error obteniendo alertas meteorológicas:", error);
    return { count: 0, details: "No disponible" };
  }
}