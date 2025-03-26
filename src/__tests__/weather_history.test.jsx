import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import WeatherData from "@/pages/dashboard/weather_history";

// Mockeamos fetch para evitar llamadas reales a la API y simular respuestas
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ forecast: { forecastday: [] } }), // Retorno vacío por defecto
  })
);

describe("WeatherData Component", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("muestra el mensaje de 'Cargando datos del clima...' al iniciar", () => {
    render(<WeatherData />);
    expect(screen.getByText("Cargando datos del clima...")).toBeInTheDocument();
  });

  it("muestra un mensaje de error si la API falla", async () => {
    fetch.mockImplementation(() => Promise.reject(new Error("Error en la API")));

    render(<WeatherData />);

    await waitFor(() => {
      expect(screen.getByText(/Error: Error en la API/i)).toBeInTheDocument();
    });
  });
});
