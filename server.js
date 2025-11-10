import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

// Necesario para rutas absolutas correctas
const __filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

// Servir archivos estáticos (html, css, js, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Si no encuentra un archivo, devolver index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log("Servidor funcionando en http://localhost:${port}");
});