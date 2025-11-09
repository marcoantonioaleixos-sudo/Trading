// === movimientos.js ===

// --- Cargar datos de Neon ---

async function cargarSelects() {
  try {
    const response = await fetch("/.netlify/functions/get-Config");
    if (!response.ok) throw new Error("Error al cargar configuración");
    const data = await response.json();

    // Selects del DOM

    const selBancos = document.getElementById("selOrigen");
    const selBancos = document.getElementById("selDestino");
    const selFormaspago = document.getElementById("selMedio");
    const selCriptos = document.getElementById("selActivo");

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

    rellenarSelect(selOrigen, data.bancos, "id", "nombre");
    rellenarSelect(selDestino, data.bancos, "id", "nombre");
    rellenarSelect(selMedio, data.formasPago, "id", "medio");
    rellenarSelect(selActivo, data.criptos, "id", "ticker",);

    console.log("✅ Selects cargados correctamente");
  } catch (error) {
    console.error("❌ Error al cargar selects:", error);
  }
}

document.addEventListener("DOMContentLoaded", cargarSelects);