import { Client } from 'pg';

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Método no permitido' };
  }

  try {
    const data = JSON.parse(event.body);

    // Conexión a tu base de datos Neon
    const client = new Client({
      connectionString: process.env.DATABASE_URL, // está en tus variables de entorno de Netlify
      ssl: { rejectUnauthorized: false },
    });

    await client.connect();

    const query = `
      INSERT INTO banca (idbanca, fecha, tipo, medio, origen, destino, cantidad, activo, valorusdc, notas)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;
    `;

    const values = [
      data.id || 'IDBAN' + Date.now(),
      data.fecha,
      data.tipo,
      data.medio,
      data.origen,
      data.destino,
      data.cantidad,
      data.activo,
      data.valorusdc,
      data.notas || '',
    ];

    const result = await client.query(query, values);
    await client.end();

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        inserted: result.rows[0],
      }),
    };
  } catch (error) {
    console.error('❌ Error en save_banca:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}