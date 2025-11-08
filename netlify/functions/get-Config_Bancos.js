// LLAMADA NEON  Config_Bancos

import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function handler() {
  try {
    const rows = await sql`SELECT id, nombre FROM "Config_Bancos" ORDER BY nombre`;
    return {
      statusCode: 200,
      body: JSON.stringify(rows),
    };
  } catch (err) {
    console.error("Error en get-Config_Bancos:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}