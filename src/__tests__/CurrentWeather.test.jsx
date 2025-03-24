import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import axios from "axios";
import CurrentWeather from "@/pages/dashboard/current_weather";

// Mockeamos axios para evitar llamadas reales a la API y controlar las respuestas en las pruebas
vi.mock("axios");

describe("CurrentWeather Component", () => {
  // Prueba 1: Verifica que el componente muestra el mensaje de "Cargando clima..." mientras se obtienen los datos
  it("muestra el mensaje de 'Cargando clima...'", () => {
    render(<CurrentWeather />);
    expect(screen.getByText("Cargando clima...")).toBeInTheDocument();
  });

  // Prueba 2: Verifica que el componente muestra un mensaje de error cuando la API falla
  it("muestra un mensaje de error si la API falla", async () => {
    // Simulamos un error en la petición de axios
    axios.get.mockRejectedValue(new Error("Error en la API"));
    
    render(<CurrentWeather />);
    
    // Esperamos a que el mensaje de error aparezca en la pantalla
    await waitFor(() => {
      expect(screen.getByText("No se pudo obtener el clima. Inténtalo de nuevo más tarde.")).toBeInTheDocument();
    });
  });

  // Prueba 3: Verifica que el componente muestra los datos del clima correctamente cuando la API responde exitosamente
  it("muestra los datos del clima cuando la API responde correctamente", async () => {
    // Simulamos una respuesta exitosa de la API con datos de clima ficticios
    const mockData = {
      data: {
        current: {
          temp_c: 25,
          feelslike_c: 27,
          humidity: 60,
          wind_kph: 15,
          wind_dir: "N",
          pressure_mb: 1013,
          uv: 5,
          condition: {
            text: "Soleado",
            icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
          },
        },
      },
    };

    // Configuramos axios para devolver la respuesta simulada
    axios.get.mockResolvedValue(mockData);

    render(<CurrentWeather />);

    // Esperamos a que los datos del clima se rendericen correctamente en la pantalla
    await waitFor(() => {
      expect(screen.getByText("Cali")).toBeInTheDocument();
      expect(screen.getByText("Soleado")).toBeInTheDocument();
      expect(screen.getByText("25°C")).toBeInTheDocument();
      expect(screen.getByText("Sensación térmica: 27°C")).toBeInTheDocument();
      expect(screen.getByText("Humedad: 60%")).toBeInTheDocument();
      expect(screen.getByText("Viento: 15 km/h (N)")).toBeInTheDocument();
      expect(screen.getByText("Presión: 1013 mb")).toBeInTheDocument();
      expect(screen.getByText("Índice UV: 5")).toBeInTheDocument();
    });
  });
});
