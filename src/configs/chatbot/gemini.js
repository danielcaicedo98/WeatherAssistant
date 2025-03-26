import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyBU2J0qovGFAOBrDGkqiNlLg5JJ9Rbd5wk" });

async function generarRespuesta(prompt) {
  /**
   * Genera una respuesta en texto utilizando la API de Gemini de Google AI Studio.
   *
   * @param {string} prompt - El prompt o instrucción para el modelo.
   * @returns {Promise<string>} - La respuesta generada por el modelo.
   */
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  return response.text;
}

export async function responderConsultaClima(promptUsuario, contextoClima) {
  /**
   * Responde a consultas sobre el clima proporcionando sugerencias de vestimenta o consejos diarios.
   *
   * @param {string} promptUsuario - La consulta original del usuario.
   * @param {string} contextoClima - Información actual sobre el clima.
   * @returns {Promise<string>} - Respuesta personalizada con sugerencias o consejos basados en el clima.
   */
  const promptBase =
  "contesta en texto plano. NO md, html o otra cosa. "+
    "Eres un asistente especializado en ofrecer sugerencias de vestimenta y consejos prácticos " +
    "para el día a día basados en el clima actual. Solo debes responder consultas relacionadas " +
    "con el clima y proporcionar recomendaciones útiles."+
    "en el la data del clima que te voy a dar encuentras un time con varias fechas. la fecha mas alta es el dia de hoy por si quieres responder sugerencias mencionando la fecha";

  const promptCompleto = `${promptBase}\n\nContexto del clima: ${contextoClima}\n\nConsulta del usuario: ${promptUsuario}`;

  return await generarRespuesta(promptCompleto);
}

