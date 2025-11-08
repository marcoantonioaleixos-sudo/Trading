// LLAMADA NEON CRIPTOS

import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.NETLIFY.DATABASE_URL);

export async function handler() {
  try {
    const rows = await sql`SELECT id, simbolo, nombre FROM "Criptos" ORDER BY nombre`;
    return {
      statusCode: 200,
      body: JSON.stringify(rows),
    };
  } catch (err) {
    console.error("Error en get-Criptos:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}