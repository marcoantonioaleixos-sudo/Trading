// === movimientos.js ===

// --- Cargar datos de Neon ---

async function cargarSelects() {
  try {
    const response = await fetch("/.netlify/functions/get-Config");
    if (!response.ok) throw new Error("Error al cargar configuración");
    const data = await response.json();

    // Selects del DOM

    const selBanco = document.getElementById("selBanco");
    const selFormaPago = document.getElementById("selFormaPago");
    const selCripto = document.getElementById("selCripto");

    // Limpia y carga opciones

    const rellenarSelect = (select, lista, valueKey, textKey) => {
      select.innerHTML = '<option value="">-- Selecciona --</option>';
      lista.forEach((item) => {
        const opt = document.createElement("option");
        opt.value = item[valueKey];
        opt.textContent = item[textKey];
        select.appendChild(opt);
      });
    };

    rellenarSelect(selBanco, data.bancos, "nombre");
    rellenarSelect(selFormaPago, data.formaPagos, "medio");
    rellenarSelect(selCripto, data.criptos, "ticker",);

    console.log("✅ Selects cargados correctamente");
  } catch (error) {
    console.error("❌ Error al cargar selects:", error);
  }
}

document.addEventListener("DOMContentLoaded", cargarSelects);