document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const tipo = document.body.dataset.tipo; // "Depositar" o "Retirar"
  const tipoField = document.getElementById("tipo");
  tipoField.value = tipo;

  const valorField = document.getElementById("valorUSDC");

  // Formato numérico ₮ con 6 decimales
  valorField.addEventListener("input", () => {
    let val = valorField.value.replace(/[^\d.]/g, "");
    if (val) {
      val = parseFloat(val).toFixed(6);
      valorField.value = ${val} ₮;
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const record = {
      id: "IDBAN" + Date.now(),
      fecha: document.getElementById("fecha").value,
      tipo: tipoField.value,
      medio: document.getElementById("medio").value,
      origen: document.getElementById("origen").value,
      destino: document.getElementById("destino").value,
      cantidad: document.getElementById("cantidad").value,
      activo: document.getElementById("activo").value,
      valorUSDC: document.getElementById("valorUSDC").value.replace(" ₮", ""),
      notas: document.getElementById("notas").value,
    };

    try {
      const res = await fetch("/.netlify/functions/save_banca", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Error al guardar:", data);
        alert("❌ Error al guardar en la base de datos");
        return;
      }

      alert(✅ Registro ${tipo} guardado correctamente en la base de datos);
      form.reset();
      valorField.value = "";
    } catch (err) {
      console.error("Error:", err);
      alert("⚠ Error de conexión con el servidor");
    }
  });
});
