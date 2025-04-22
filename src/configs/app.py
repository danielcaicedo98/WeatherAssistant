from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from faster_whisper import WhisperModel
import tempfile

app = FastAPI()

# Permitir conexión desde el frontend local
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://weather-assistant-liart.vercel.app"
    ],  # cambia si usas otro puerto
    allow_methods=["*"],
    allow_headers=["*"],
)

# Carga el modelo Whisper
model = WhisperModel("base", compute_type="int8")


@app.post("/transcribe")
async def transcribe_audio(audio: UploadFile = File(...)):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as tmp:
        tmp.write(await audio.read())
        tmp_path = tmp.name

    # Forzar idioma español en la transcripción
    segments, _ = model.transcribe(tmp_path, language="es")

    # Combinar el texto de todos los segmentos
    text = "".join(segment.text for segment in segments)
    return {"text": text.strip()}
