//  LLAMADA NEON Config_FormaPago

import { neon } from "@netlify/neon";

const sql = neon();

export async function handler() {
  try {
    const rows = await sql`SELECT id, nombre FROM "Config_FormaPago" ORDER BY nombre`;
    return {
      statusCode: 200,
      body: JSON.stringify(rows),
    };
  } catch (err) {
    console.error("Error en get-Config_FormaPago:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}