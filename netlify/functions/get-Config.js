// LLAMADA NEON  Config_TABLAS

// /netlify/functions/get-Config.js
import { neon } from "@neondatabase/serverless";
import { neon } from "@netlify/neon";

export async function handler() {
  try {
    const sql = neon(process.env.NETLIFY_DATABASE_URL);

    // Consultas paralelas
    const [Bancos, FormasPago, Criptos] = await Promise.all([
      sql`SELECT nombre FROM Bancos ORDER BY nombre;`,
      sql`SELECT medio FROM FormasPago ORDER BY medio;`,
      sql`SELECT ticker,  FROM Criptos ORDER BY ticker;`,
    ]);

    return {
      statusCode: 200,
      body: JSON.stringify({
        Bancos,
        FormasPago,
        Criptos,
      }),
    };
  } catch (error) {
    console.error("❌ Error en get-Config:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}