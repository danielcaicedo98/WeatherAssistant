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

      {/* <section>
        <h2 className="text-2xl font-semibold mb-2">📍 Consulta por Zonas de Cali</h2>
        <p>
          Permite conocer el clima en sectores o barrios específicos de Cali. Útil si te mueves por distintas zonas. Puedes escribir el nombre del barrio y ver el clima local exacto en esa área.
        </p>
      </section>
*/}
{/*  
      <section>
        <h2 className="text-2xl font-semibold mb-2">⭐ Registro de Preferencias del Usuario (Opcional)</h2>
        <p>
          Guarda las preferencias del usuario, como el tipo de alertas que quiere recibir o sus zonas favoritas. Esto permite una experiencia más personalizada en futuras visitas. Se activa automáticamente al iniciar sesión.
        </p>
      </section> */}

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

      {/* <section>
        <h2 className="text-2xl font-semibold mb-2">🔐 Inicio de Sesión con Firebase</h2>
        <p>
          Permite al usuario iniciar sesión con su cuenta (Google, email, etc.). Al ingresar, puede acceder a sus configuraciones, zonas favoritas y preferencias personalizadas guardadas previamente.
        </p>
      </section> */}
    </div>
  );
};

export default UserManual;
