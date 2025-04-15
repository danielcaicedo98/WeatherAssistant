export const useTextToSpeech = () => {
  const speak = (text, lang = "es-ES") => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 1; // velocidad normal
      utterance.pitch = 1; // tono normal
      window.speechSynthesis.cancel(); // detener cualquier lectura anterior
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("Síntesis de voz no soportada en este navegador.");
    }
  };

  return { speak };
};