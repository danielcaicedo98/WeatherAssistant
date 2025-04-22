import { useEffect, useRef } from "react";

export const useSpeechRecognition = ({ onResult, lang = "es-ES" }) => {
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      console.warn("Speech recognition no es compatible con este navegador.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = lang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Error de reconocimiento de voz:", event.error);
    };

    recognitionRef.current = recognition;
  }, [onResult, lang]);

  const startListening = () => {
    recognitionRef.current?.start();
  };

  return { startListening };
};