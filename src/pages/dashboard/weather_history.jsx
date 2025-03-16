  import React, { useEffect, useState } from 'react';

  const WeatherData = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    // Función para formatear la fecha como "YYYY-MM-DD"
    const getDateString = (date) => date.toISOString().split('T')[0];
  
    // Fecha de hoy
    const today = new Date();
    // Usamos ayer como fecha final (para tener datos completos)
    const endDate = new Date(today);
    endDate.setDate(today.getDate() - 1);
    // Fecha de inicio: 7 días atrás (incluyendo ayer, se obtienen 7 días completos)
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 7);
  
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
  
    if (loading) return <p>Cargando datos del clima...</p>;
    if (error) return <p>Error: {error}</p>;
  
    return (
      <div>
        <h2>Clima en Cali, Colombia (Últimos 7 días)</h2>
        {weather && weather.time ? (
          <table border="1" cellPadding="5" cellSpacing="0">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Temp. Máxima (°C)</th>
                <th>Temp. Mínima (°C)</th>
                <th>Precipitación (mm)</th>
              </tr>
            </thead>
            <tbody>
              {weather.time.map((date, index) => (
                <tr key={date}>
                  <td>{date}</td>
                  <td>{weather.temperature_2m_max[index]}</td>
                  <td>{weather.temperature_2m_min[index]}</td>
                  <td>{weather.precipitation_sum[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No se encontraron datos.</p>
        )}
      </div>
    );
  };
  
  export default WeatherData;
