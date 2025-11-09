// /netlify/functions/get-Config.js

// LLAMADA NEON  Config_TABLAS

import { neon } from "@neondatabase/serverless";

export async function handler(event, context) {
  try {
    const db = neon(process.env.NETLIFY_DATABASE_URL);

    // Ejecutamos las tres consultas en paralelo

    const [bancos, formasPago, criptos] = await Promise.all([
      db`SELECT nombre FROM Bancos`,
      db`SELECT tipo FROM FormasPago`,
      db`SELECT ticker FROM Criptos`
    ]);

    // Devolvemos todo junto
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        bancos,
        formasPago,
        criptos
      })
    };
  } catch (error) {
    console.error("❌ Error en get-Config:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Error al obtener configuración",
        detalle: error.message
      })
    };
  }
}