// src/__tests__/weatherService.test.jsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { getCurrentWeather, getWeatherForecast, getWeatherAlerts } from "@/data/weatherService";

// Mock global fetch
global.fetch = vi.fn();

describe("weatherService", () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    describe("getCurrentWeather", () => {
        it("debería devolver datos meteorológicos actuales correctamente", async () => {
            const mockResponse = {
                ok: true,
                json: () => Promise.resolve({
                    current: {
                        temp_c: 25,
                        condition: {
                            text: "Parcialmente nublado",
                            code: 1003,
                            icon: "//cdn.weatherapi.com/weather/64x64/day/116.png"
                        },
                        feelslike_c: 26,
                        humidity: 65,
                        wind_kph: 12,
                        wind_dir: "NE",
                        pressure_mb: 1012,
                        uv: 5
                    }
                })
            };

            fetch.mockResolvedValue(mockResponse);

            const result = await getCurrentWeather();

            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith(
                "https://api.weatherapi.com/v1/current.json?key=15d4466459384ee996c03456251103&q=Cali&lang=es"
            );
            expect(result).toEqual({
                temperature: 25,
                condition: "Parcialmente nublado",
                condition_code: 1003,
                icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
                feelslike_c: 26,
                humidity: 65,
                wind_speed: 12,
                wind_dir: "NE",
                pressure_mb: 1012,
                uv: 5
            });
        });

        it("debería manejar errores de la API", async () => {
            fetch.mockRejectedValue(new Error("Network error"));

            const result = await getCurrentWeather();

            expect(result).toEqual({});
        });
    });

    describe("getWeatherForecast", () => {
        it("debería devolver el pronóstico correctamente", async () => {
            const mockResponse = {
                ok: true,
                json: () => Promise.resolve({
                    forecast: {
                        forecastday: [
                            {}, // Día actual (no usado)
                            {
                                day: {
                                    condition: {
                                        text: "Lluvia moderada",
                                        icon: "//cdn.weatherapi.com/weather/64x64/day/302.png"
                                    },
                                    maxtemp_c: 28,
                                    mintemp_c: 22
                                }
                            }
                        ]
                    }
                })
            };

            fetch.mockResolvedValue(mockResponse);

            const result = await getWeatherForecast();

            expect(result).toEqual({
                summary: "Lluvia moderada",
                max_temp: 28,
                min_temp: 22,
                icon: "//cdn.weatherapi.com/weather/64x64/day/302.png"
            });
        });

        it("debería manejar errores del pronóstico", async () => {
            fetch.mockRejectedValue(new Error("Forecast error"));

            const result = await getWeatherForecast();

            expect(result).toEqual({});
        });
    });

    describe("getWeatherAlerts", () => {
        it("debería devolver alertas cuando existen", async () => {
            const mockResponse = {
                ok: true,
                json: () => Promise.resolve({
                    alerts: {
                        alert: [
                            { headline: "Alerta por lluvias intensas" },
                            { headline: "Alerta por vientos fuertes" }
                        ]
                    }
                })
            };

            fetch.mockResolvedValue(mockResponse);

            const result = await getWeatherAlerts();

            expect(result).toEqual({
                count: 2,
                details: "Alerta por lluvias intensas, Alerta por vientos fuertes"
            });
        });

        it("debería indicar cuando no hay alertas", async () => {
            const mockResponse = {
                ok: true,
                json: () => Promise.resolve({
                    alerts: {
                        alert: []
                    }
                })
            };

            fetch.mockResolvedValue(mockResponse);

            const result = await getWeatherAlerts();

            expect(result).toEqual({
                count: 0,
                details: "Sin alertas"
            });
        });

        it("debería manejar errores de alertas", async () => {
            fetch.mockRejectedValue(new Error("Alerts error"));

            const result = await getWeatherAlerts();

            expect(result).toEqual({
                count: 0,
                details: "No disponible"
            });
        });
    });
});
