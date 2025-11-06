// netlify/functions/save_banca.js
import { Client } from 'pg';

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const body = JSON.parse(event.body);

  const client = new Client({
    connectionString: process.env.DATABASE_URL, // Netlify crea esto al conectar Neon
  });

  try {
    await client.connect();

    const query = `
      INSERT INTO banca 
      (idbanca, fecha, tipo, medio, origen, destino, cantidad, activo, valorusdc, notas)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;
    `;

    const values = [
      body.id || 'IDBAN' + Date.now(),
      body.fecha,
      body.tipo,
      body.medio,
      body.origen,
      body.destino
