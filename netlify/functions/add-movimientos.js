// ADD MOVIMIENTOS

import { neon } from "@netlify/neon";

const sql = neon();

export async function handler(event) {
  try {
    const data = JSON.parse(event.body);
    const { origen, medio, destino, cantidad, activo } = data;

    const result = await sql`
      INSERT INTO "Movimientos" (origen, medio, destino, cantidad, activo, fecha)
      VALUES (${origen}, ${medio}, ${destino}, ${cantidad}, ${activo}, NOW())
      RETURNING *;
    `;

    return {
      statusCode: 200,
      body: JSON.stringify(result[0]),
    };
  } catch (err) {
    console.error("Error en add-movimientos:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}