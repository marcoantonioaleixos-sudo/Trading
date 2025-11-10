
// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 8888;

// 🟢 Simular endpoint Netlify: /netlify/functions/get-config
app.all("/.netlify/functions/get-config", async (req, res) => {
    const { handler } = await import('./netlify/functions/get-config.js');
  return handler(req, res);
});

// 🟢 Simular endpoint Netlify: /netlify/functions/add-movimientos
app.all("/.netlify/functions/add-movimientos", async (req, res) => {
  const { handler } = await import('/netlify/functions/add-movimientos.js');
  return handler(req, res);
});

// 🟢 Servir tu index.html
app.get("/", (req, res) => {
  const filePath = path.resolve("./index.html");
  res.sendFile(filePath);
});

app.listen(PORT, () => {
  console.log(' ✅ Servidor local corriendo en http://localhost:${PORT}');
});