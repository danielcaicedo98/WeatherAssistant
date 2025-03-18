import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";

function WeatherAlerts() {
  const [alerts, setAlerts] = useState([]);
  const latitude = 3.4516;
  const longitude = -76.532;
  const start_date_str = new Date().toISOString().split("T")[0];
  const end_date_str = start_date_str;

  useEffect(() => {
    const fetchWeatherData = async () => {
      const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${start_date_str}&end_date=${end_date_str}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=America%2FBogota`;
      
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
  }, []);

  const checkForAlerts = (data) => {
    let warnings = [];
    const maxTemp = data.daily.temperature_2m_max[0];
    const minTemp = data.daily.temperature_2m_min[0];
    const precipitation = data.daily.precipitation_sum[0];

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
