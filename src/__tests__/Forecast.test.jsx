import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import axios from "axios";
import Forecast from "@/pages/dashboard/forecast"; // Importamos el componente a probar

// Mockeamos axios para controlar las respuestas de la API
vi.mock("axios");

describe("Forecast Component", () => {
  // 🧪 Prueba: Verifica que se muestra un mensaje de error si la API falla
  it("muestra un mensaje de error si la API falla", async () => {
    // Simulamos un error en la petición a la API
    axios.get.mockRejectedValue(new Error("Error en la API"));

    render(<Forecast />); // Renderizamos el componente

    // Esperamos y verificamos que el mensaje de error aparezca en la pantalla
    await waitFor(() => {
      expect(screen.getByText("Error al obtener el pronóstico del clima.")).toBeInTheDocument();
    });
  });

  // 🧪 Prueba: Verifica que el pronóstico del clima se muestra correctamente si la API responde bien
  it("muestra el pronóstico del clima cuando la API responde correctamente", async () => {
    // Simulamos la respuesta exitosa de la API con datos de prueba
    const mockData = {
      data: {
        forecast: {
          forecastday: [
            {
              date: "2024-03-24",
              day: {
                maxtemp_c: 30,
                mintemp_c: 20,
                daily_chance_of_rain: 50,
                condition: {
                  text: "Parcialmente nublado",
                  icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
                },
              },
            },
            {
              date: "2024-03-25",
              day: {
                maxtemp_c: 28,
                mintemp_c: 19,
                daily_chance_of_rain: 60,
                condition: {
                  text: "Lluvia ligera",
                  icon: "//cdn.weatherapi.com/weather/64x64/day/296.png",
                },
              },
            },
          ],
        },
      },
    };

    axios.get.mockResolvedValue(mockData); // Mockeamos la API para que devuelva la respuesta simulada

    render(<Forecast />); // Renderizamos el componente

    // Esperamos y verificamos que la información del pronóstico aparezca correctamente
    await waitFor(() => {
      expect(screen.getByText("Pronóstico del Clima en Cali")).toBeInTheDocument();
      expect(screen.getByText("2024-03-24")).toBeInTheDocument();
      expect(screen.getByText("Parcialmente nublado")).toBeInTheDocument();
      expect(screen.getByText("Temperatura Máxima: 30°C")).toBeInTheDocument();
      expect(screen.getByText("Temperatura Mínima: 20°C")).toBeInTheDocument();
      expect(screen.getByText("Probabilidad de Lluvia: 50%")).toBeInTheDocument();

      expect(screen.getByText("2024-03-25")).toBeInTheDocument();
      expect(screen.getByText("Lluvia ligera")).toBeInTheDocument();
      expect(screen.getByText("Temperatura Máxima: 28°C")).toBeInTheDocument();
      expect(screen.getByText("Temperatura Mínima: 19°C")).toBeInTheDocument();
      expect(screen.getByText("Probabilidad de Lluvia: 60%")).toBeInTheDocument();
    });
  }); 
  
});
