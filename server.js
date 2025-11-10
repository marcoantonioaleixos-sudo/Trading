import express from "express";
import bodyParser from "body-parser";
import 'dotenv/config';
import { neon } from "@neondatabase/serverless";

console.log('DB URL;',
  process.env.DATABASE_URL? 'OK' : 'MISSING');


const app = express();
const sql = neon(process.env.DATABASE_URL);

app.use(bodyParser.json());

// Ruta que simula tu función Netlify
app.post("/.netlify/functions/add-movimientos", async (req, res) => {
  try {
    const { origen, medio, destino, cantidad, activo, valorUSDC } = req.body;

    console.log("📥 Datos recibidos:", req.body);

    const result = await sql`
      INSERT INTO "Movimientos" (origen, medio, destino, cantidad, activo, valorUSDC, fecha)
      VALUES (${origen}, ${medio}, ${destino}, ${cantidad}, ${activo}, ${valorUSDC}, NOW())
      RETURNING *;
    `;

    console.log("✅ Movimiento insertado:", result[0]);
    res.status(200).json(result[0]);
  } catch (error) {
    console.error("❌ Error en add-movimientos:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(8888, () => console.log("🚀 Servidor local en http://localhost:8888"))