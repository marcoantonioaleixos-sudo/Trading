// /netlify/functions/get-Config.js

// LLAMADA NEON  Config_TABLAS

export async function handler() {
  try {
    console.log("🔹 Iniciando conexión con Neon...");
    const db = neon(process.env.NETLIFY_DATABASE_URL);
    console.log("🔹 URL:", process.env.NETLIFY_DATABASE_URL);

    const [bancos, formasPago, criptos] = await Promise.all([
      db`SELECT nombre FROM bancos`,
      db`SELECT tipo FROM formasPago`,
      db`SELECT ticker FROM cripto`
    ]);

    console.log("✅ Datos cargados correctamente");

    return {
      statusCode: 200,
      body: JSON.stringify({ bancos, formasPago, criptos })
    };
  } catch (error) {
    console.error("❌ Error detallado en get-Config:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Error al obtener configuración",
        detalle: error.message,
        stack: error.stack
      })
    };
  }
}