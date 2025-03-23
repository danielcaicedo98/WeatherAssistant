import { useEffect, useState } from "react";
// import {  } from "@/components/ui/button";
import { Card, CardContent, Button } from "@material-tailwind/react";
import { Sun, CloudRain, AlertCircle, Settings, ArrowLeft, History } from "lucide-react";
import CurrentWeather from "./current_weather";
import Forecast from "./forecast";
import WeatherAlerts from "./weather_alerts";
import Sugestions from "./sugestions";
import WeatherSettings from "./weather_settings";
import WeatherHistory from "./weather_history";
import { useNavigate } from "react-router-dom";

export function WeatherAssistant() {
  const [screen, setScreen] = useState("welcome");
  const navigate = useNavigate();
  useEffect(() => {
    const isLogged = localStorage.getItem("is_logged") === "true";
    if (!isLogged) {
      navigate("/auth/sign-in");

    }
  }
    , []);
  const menuOptions = [
    { 
      id: "current", 
      label: "Clima Actual", 
      icon: <Sun className="w-6 h-6" />, 
      response: <CurrentWeather/>
    },
    { 
      id: "forecast", 
      label: "Pronóstico 3 días", 
      icon: <CloudRain className="w-6 h-6" />,
      response: <Forecast/>
    },
    { 
      id: "alerts", 
      label: "Alertas Meteorológicas", 
      icon: <AlertCircle className="w-6 h-6" />,
      response: <WeatherAlerts/> 
    },
    { 
      id: "suggestions", 
      label: "Sugerencias", 
      icon: <Sun className="w-6 h-6" />,
      response: <Sugestions/>
     },
     { 
      id: "history", 
      label: "Historico", 
      icon: <History className="w-6 h-6" />, 
      response: <WeatherHistory/>
    },
    { 
      id: "settings", 
      label: "Configuración", 
      icon: <Settings className="w-6 h-6" />,
      response: <WeatherSettings/>
    },
    
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-blue-700 text-white p-4">
      {screen === "welcome" && (
        <Card className="p-6 text-center max-w-md bg-white text-black rounded-2xl shadow-xl">
          <h1 className="text-2xl font-bold">WeatherAssistant</h1>
          <p className="mt-2">Tu asistente meteorológico en Cali</p>
          <Button onClick={() => setScreen("menu")} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white w-full">Comenzar</Button>
        </Card>
      )}

      {screen === "menu" && (
        <Card className="p-6 text-center max-w-md bg-white text-black rounded-2xl shadow-xl w-full">
          <h2 className="text-xl font-bold">Selecciona una opción</h2>
          <div className="mt-4 grid gap-3">
            {menuOptions.map((option) => (
              <Button key={option.id} onClick={() => setScreen(option.id)} className="flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl w-full">
                {option.icon} {option.label}
              </Button>
            ))}
          </div>
        </Card>
      )}

      {screen !== "welcome" && screen !== "menu" && (
        <Card className="p-6 text-center max-w-md bg-white text-black rounded-2xl shadow-xl w-full">
          <h2 className="text-xl font-bold">{menuOptions.find((o) => o.id === screen)?.label}</h2>
          <p className="mt-2">{menuOptions.find((o) => o.id === screen)?.response}</p>
          <Button onClick={() => setScreen("menu")} className="mt-4 flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white">
            <ArrowLeft className="w-5 h-5" /> Volver al Menú
          </Button>
        </Card>
      )}
    </div>
  );
}

export default WeatherAssistant;
