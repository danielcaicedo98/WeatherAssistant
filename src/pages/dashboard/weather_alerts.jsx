import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";

function WeatherAlerts() {
  const [alerts, setAlerts] = useState([]);
  const apiKey = "15d4466459384ee996c03456251103";
  const location = "Cali";
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchWeatherData = async () => {
      const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=1`;
      
      try {
        const response = await fetch(url);
        const data = await response.json();
        const alertsList = checkForAlerts(data);
        setAlerts(alertsList);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [apiKey, location]);

  const checkForAlerts = (data) => {
    let warnings = [];
    const maxTemp = data.forecast.forecastday[0].day.maxtemp_c;
    const minTemp = data.forecast.forecastday[0].day.mintemp_c;
    const precipitation = data.forecast.forecastday[0].day.totalprecip_mm;

    if (maxTemp >= 35) {
      warnings.push("⚠️ Alerta de calor extremo en Cali. Se recomienda mantenerse hidratado y evitar exposición prolongada al sol.");
    }
    if (minTemp <= 5) {
      warnings.push("⚠️ Alerta de frío extremo en Cali. Se recomienda abrigarse adecuadamente.");
    }
    if (precipitation >= 20) {
      warnings.push("⚠️ Alerta de fuertes lluvias en Cali. Se recomienda evitar zonas propensas a inundaciones.");
    }
    return warnings;
  };

  return (
    <div className="p-4">
      {alerts.length > 0 ? (
        alerts.map((alert, index) => (
          <div key={index} className="mb-2 p-4 bg-red-100 border-red-500 flex items-center">
            <AlertCircle className="text-red-500 mr-2" />
            <span>{alert}</span>
          </div>
        ))
      ) : (
        <p>No hay alertas climáticas en este momento.</p>
      )}
    </div>
  );
}

export default WeatherAlerts;
