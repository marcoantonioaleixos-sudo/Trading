document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("movimientos-form");
  const tipo = document.body.dataset.tipo || "Depositar"; // Detecta tipo según la página
  const tipoField = document.getElementById("tipo");
  tipoField.value = tipo;

  // Muestra el tipo en pantalla si quieres
  const tipoLabel = document.getElementById("tipo-label");
  if (tipoLabel) tipoLabel.textContent = tipo;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const idban = document.getElementById("idban").value;
    const fecha = document.getElementById("fecha").value;
    const cantidad = parseFloat(document.getElementById("cantidad").value);

    if (!idban || !fecha || isNaN(cantidad)) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }

    // Llamada a tu función serverless (que guarda en Neon)
    try {
      const response = await fetch("/.netlify/functions/movimientos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idban, fecha, cantidad, tipo }),
      });

      // Mostrar mensaje de éxito
      const successMsg = document.createElement("div");
      successMsg.textContent =" ✅ Registro del ${tipo} enviado correctamente";
      successMsg.className = "success-msg";
      document.body.appendChild(successMsg);

      setTimeout(() => {
      successMsg.classList.add("fade-out");
      setTimeout(() => successMsg.remove(), 500);
      }, 2000);

      if (response.ok) {
        form.reset();
      } else {
        const error = await response.text();
        alert("Error al registrar: " + error);
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión con el servidor.");
    }
  });
});
