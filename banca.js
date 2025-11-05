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

  form.addEventListener("submit", (e) => {
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
      valorUSDC: valorField.value,
      notas: document.getElementById("notas").value,
    };

    // Guardar localmente
    const registros = JSON.parse(localStorage.getItem("banca_records") || "[]");
    registros.push(record);
    localStorage.setItem("banca_records", JSON.stringify(registros));

    alert(✅ Registro ${tipo} guardado correctamente);
    form.reset();
    valorField.value = "";
  });
});