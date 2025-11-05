// netlify/functions/get_banca.js
const fetch = require('node-fetch');

exports.handler = async () => {
  try {
    const supaUrl = ${process.env.SUPABASE_URL}/rest/v1/Banca?select=*;
    const res = await fetch(supaUrl, {
      headers: {
        'apikey': process.env.SUPABASE_KEY,
        'Authorization': Bearer ${process.env.SUPABASE_KEY}
      }
    });
    const data = await res.json();
    if (!res.ok) return { statusCode: 500, body: JSON.stringify({ error: data }) };
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};