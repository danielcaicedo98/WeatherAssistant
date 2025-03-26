import React, { useEffect, useState } from 'react';

const WeatherData = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = "15d4466459384ee996c03456251103";
  const location = 'Cali'; // Ciudad a consultar

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const promises = [];
        for (let i = 1; i <= 7; i++) {
          const date = getPastDate(i);
          const url = `https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${location}&dt=${date}`;
          promises.push(fetch(url).then((res) => res.json()));
        }
        
        const results = await Promise.all(promises);
        const weatherData = results.map((data) => data.forecast.forecastday[0]);
        setWeather(weatherData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchWeather();
  }, [apiKey, location]);

  const getPastDate = (daysAgo) => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toISOString().split('T')[0];
  };

  if (loading) return <p>Cargando datos del clima...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Clima en {location}, Colombia (Últimos 7 días)</h2>
      {weather.length > 0 ? (
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
            {weather.map((day) => (
              <tr key={day.date}>
                <td>{day.date}</td>
                <td>{day.day.maxtemp_c}</td>
                <td>{day.day.mintemp_c}</td>
                <td>{day.day.totalprecip_mm}</td>
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
