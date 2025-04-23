import React from "react";

const UserManual = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-xl rounded-2xl space-y-6">
      <h1 className="text-3xl font-bold text-center mb-4">📘 Manual de Usuario - App del Clima Cali</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🚀 Instalación de la Aplicación</h2>
        <p className="text-base">
          Para instalar la aplicación, sigue estos pasos:
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>Clona el repositorio: <code>git clone https://github.com/danielcaicedo98/WeatherAssistant</code></li>
          <li>Ingresa al proyecto: <code>cd WeatherAssistant</code></li>
          <li>Instala dependencias: <code>npm install</code></li>
          <li>Inicia la app en desarrollo: <code>npm run dev</code></li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🎙️ Asistente Inteligente por Voz</h2>
        <img src="https://firebasestorage.googleapis.com/v0/b/ecstorage-72e4f.appspot.com/o/CM%2Fhomewa.png?alt=media&token=ae4f3722-6b28-473a-b695-ba1380e52cb8" alt="imagen" />
        <p>
          La aplicación cuenta con un asistente por voz que permite interactuar con el sistema mediante comandos hablados. Puedes:
        </p>
        <ul className="list-disc list-inside ml-4 mt-2">
          <li>Consultar el clima actual diciendo <strong>"clima actual"</strong></li>
          <li>Pedir el pronóstico del día siguiente con <strong>"pronóstico para mañana"</strong></li>
          <li>Navegar entre secciones como <strong>"ir al inicio"</strong></li>
          <li>Navegar al asistente interactivo <strong>"abrir asistente"</strong></li>
          <li>Para abrir el menú de atydas <strong>"abrir ayuda"</strong></li>
          <li>Escuchar un resumen generado con inteligencia artificial de la situación climática.</li>
        </ul>
        <p className="mt-2">
          Este asistente usa reconocimiento de voz y síntesis de habla para responderte de forma natural. Puedes activarlo tocando el botón de micrófono verde.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">☀️ Consulta del Clima Actual</h2>
        <p>
          Muestra en tiempo real el clima actual en Cali. Esta funcionalidad permite saber si hace sol, está nublado o llueve, facilitando la decisión sobre qué ropa usar. Solo debes abrir la aplicación y verás una tarjeta con el estado del clima actualizado.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">📅 Pronóstico del Clima</h2>
        <p>
          Muestra el pronóstico del clima para los próximos tres días o para el día siguiente. Útil para planificar actividades al aire libre. Se accede desde la sección “Pronóstico” y muestra temperaturas máximas, mínimas y condiciones esperadas por día.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">⚠️ Alertas Meteorológicas</h2>
        <p>
          Notifica al usuario sobre eventos climáticos extremos como granizo, tormentas eléctricas o fuertes lluvias. Las alertas aparecen automáticamente en pantalla y se puede activar el envío por notificaciones si el usuario lo permite.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">👕 Sugerencias Basadas en el Clima</h2>
        <p>
          Brinda recomendaciones inteligentes usando IA. Por ejemplo, si está lloviendo, la app podría sugerir: “¡Abrigate! está lloviendo”. Estas sugerencias aparecen junto al reporte del clima del día y ayudan a tomar mejores decisiones al vestirse o salir.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-2">📊 Consulta Histórica del Clima (últimos 7 días)</h2>
        <p>
          Muestra datos del clima de días pasados, hasta una semana atrás. Esta función es ideal para comparar patrones climáticos o para consultar cómo estuvo el clima en una fecha específica.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🔔 Notificaciones Automáticas</h2>
        <p>
          Envia alertas automáticas al usuario si se detectan condiciones críticas, como una temperatura muy baja o alta probabilidad de lluvia. Aparecen en tiempo real si tienes las notificaciones activadas en la app.
        </p>
      </section>
    </div>
  );
};

export default UserManual;
