// === movimientos.js ===

// --- Cargar datos de Neon ---

async function cargarSelects() {
  try {
    const response = await fetch("/.netlify/functions/get-Config");
    if (!response.ok) throw new Error("Error al cargar configuración");
    const data = await response.json();

    // Selects del DOM

    const selBancos = document.getElementById("selbancos");
    const selFormasPago = document.getElementById("selformasPago");
    const selCriptos = document.getElementById("selcriptos");

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

    rellenarSelect(selBancos, data.bancos, "nombre");
    rellenarSelect(selFormasPago, data.formasPagos, "medio");
    rellenarSelect(selCriptos, data.criptos, "ticker",);

    console.log("✅ Selects cargados correctamente");
  } catch (error) {
    console.error("❌ Error al cargar selects:", error);
  }
}

document.addEventListener("DOMContentLoaded", cargarSelects);