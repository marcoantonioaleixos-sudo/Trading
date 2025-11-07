// /netlify/functions/get-config.js

import { neon } from '@neondatabase/serverless';

export async function handler() {
  const sql = neon(process.env.DATABASE_URL);

  try {

    // === Bancos ===
    
    const bancos = await sql`
      SELECT id, nombre, imagen
      FROM Config_Bancos
      ORDER BY nombre ASC;
    `;

    // === Formas de pago ===
    
    const formasPago = await sql`
      SELECT id, tipo
      FROM Config_FormasPago
      ORDER BY tipo ASC;
    `;

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bancos, formasPago }),
    };
  } catch (error) {
    console.error("Error cargando configuración:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}