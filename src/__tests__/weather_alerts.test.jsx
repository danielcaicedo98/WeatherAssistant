import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import WeatherAlerts from "@/pages/dashboard/weather_alerts";

// Mockeamos fetch para evitar llamadas reales a la API
global.fetch = vi.fn();

describe("WeatherAlerts Component", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("muestra el mensaje de 'No hay alertas climáticas en este momento.' cuando no hay alertas", async () => {
    const mockData = {
      forecast: {
        forecastday: [{ day: { maxtemp_c: 25, mintemp_c: 15, totalprecip_mm: 5 } }],
      },
    };
    
    fetch.mockResolvedValue({ json: () => Promise.resolve(mockData) });

    render(<WeatherAlerts />);

    await waitFor(() => {
      expect(screen.getByText("No hay alertas climáticas en este momento.")).toBeInTheDocument();
    });
  });

  it("muestra alerta de calor extremo cuando la temperatura es mayor o igual a 35°C", async () => {
    const mockData = {
      forecast: {
        forecastday: [{ day: { maxtemp_c: 36, mintemp_c: 20, totalprecip_mm: 5 } }],
      },
    };

    fetch.mockResolvedValue({ json: () => Promise.resolve(mockData) });

    render(<WeatherAlerts />);

    await waitFor(() => {
      expect(screen.getByText(/⚠️ Alerta de calor extremo en Cali/i)).toBeInTheDocument();
    });
  });

  it("muestra alerta de frío extremo cuando la temperatura es menor o igual a 5°C", async () => {
    const mockData = {
      forecast: {
        forecastday: [{ day: { maxtemp_c: 10, mintemp_c: 4, totalprecip_mm: 5 } }],
      },
    };

    fetch.mockResolvedValue({ json: () => Promise.resolve(mockData) });

    render(<WeatherAlerts />);

    await waitFor(() => {
      expect(screen.getByText(/⚠️ Alerta de frío extremo en Cali/i)).toBeInTheDocument();
    });
  });

  it("muestra alerta de fuertes lluvias cuando la precipitación es mayor o igual a 20mm", async () => {
    const mockData = {
      forecast: {
        forecastday: [{ day: { maxtemp_c: 28, mintemp_c: 18, totalprecip_mm: 25 } }],
      },
    };

    fetch.mockResolvedValue({ json: () => Promise.resolve(mockData) });

    render(<WeatherAlerts />);

    await waitFor(() => {
      expect(screen.getByText(/⚠️ Alerta de fuertes lluvias en Cali/i)).toBeInTheDocument();
    });
  });
});