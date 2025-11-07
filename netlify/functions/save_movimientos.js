// /netlify/functions/save-movimiento.js

import { neon } from '@neondatabase/serverless';

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    const body = JSON.parse(event.body);

    await sql`
      INSERT INTO Movimientos (
        fecha,
        tipo,
        origen,
        destino,
        medio,
        cantidad,
        activo,
        valorUSDC,
        notas
      )
      VALUES (
        ${body.fecha},
        ${body.tipo},
        ${body.origen},
        ${body.destino},
        ${body.medio},
        ${body.cantidad},
        ${body.activo},
        ${body.valorUSDC},
        ${body.notas}
      );
    `;

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error('❌ Error al guardar movimiento:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}