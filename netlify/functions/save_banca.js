// netlify/functions/save_banca.js
import { Pool } from "@neondatabase/serverless";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const body = JSON.parse(event.body);

    // Generar ID si no viene dado
    const id = body.id || "IDBAN" + Date.now();

    const query = `
      INSERT INTO banca (idbanca, fecha, tipo, medio, origen, destino, cantidad, activo, valorusdc, notas)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;
    `;

    const values = [
      id,
      body.fecha,
      body.tipo,
      body.medio || null,
      body.origen || null,
      body.destino || null,
      body.cantidad || 0,
      body.activo || null,
      body.valorUSDC || 0,
      body.notas || null,
    ];

    const result = await pool.query(query, values);
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data: result.rows[0] }),
    };
  } catch (err) {
    console.error("❌ Error en save_banca:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}