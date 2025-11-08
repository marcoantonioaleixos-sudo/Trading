// LLAMADA NEON  Config_Bancos

import { neon } from "@netlify/neon";

const sql = neon();

export async function handler() {
  try {
    const result = await sql`SELECT nombre FROM "Config_Bancos" ORDER BY nombre`;
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (err) {
    console.error("Error en get-Config_Bancos:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}