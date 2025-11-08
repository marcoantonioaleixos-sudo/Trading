// === movimientos.js ===

// --- Cargar datos de Neon ---

async function fetchData(tabla) {
  try {
    const response = await fetch('/netlify/functions/get-${tabla}');
    if (!response.ok) throw new Error("Error cargando ${tabla}");
    return await response.json();
  } catch (error) {
    console.error("Error cargando ${tabla}:", error);
    return [];
  }
}


// --- Cargar selects ---

async function cargarSelects() {
  const bancos = await fetchData("Config_Bancos");
  const medios = await fetchData("Config_FormaPago");
  const activos = await fetchData("Criptos");

  const selectOrigen = document.getElementById("origen");
  const selectMedio = document.getElementById("medio");
  const selectDestino = document.getElementById("destino");
  const selectActivo = document.getElementById("activo");

  if (!selectOrigen || !selectMedio || !selectDestino || !selectActivo) {
    console.error("❌ No se encontraron los selects en el HTML");
    return;
  }

  bancos.forEach(banco => {
    const optionO = document.createElement("option");
    optionO.value = banco.nombre;
    optionO.textContent = banco.nombre;
    selectOrigen.appendChild(optionO);

    const optionD = document.createElement("option");
    optionD.value = banco.nombre;
    optionD.textContent = banco.nombre;
    selectDestino.appendChild(optionD);
  });

  medios.forEach(m => {
    const option = document.createElement("option");
    option.value = m.tipo;
    option.textContent = m.tipo;
    selectMedio.appendChild(option);
  });

  activos.forEach(a => {
    const option = document.createElement("option");
    option.value = a.ticker;
    option.textContent = '${a.ticker} (${a.nombre})';
    selectActivo.appendChild(option);
  });
}


// --- Establecer fecha actual ---

function setTodayDate() {
  const inputFecha = document.getElementById("fecha");
  if (inputFecha) {
    const hoy = new Date().toISOString().split("T")[0];
    inputFecha.value = hoy;
  }
}


// --- Guardar movimiento ---

async function guardarMovimiento(e) {
  e.preventDefault();

  const movimiento = {
    fecha: document.getElementById("fecha").value,
    origen: document.getElementById("origen").value,
    medio: document.getElementById("medio").value,
    destino: document.getElementById("destino").value,
    cantidad: document.getElementById("cantidad").value,
    activo: document.getElementById("activo").value,
    valor_usdc: document.getElementById("valorUSDC").value,
    notas: document.getElementById("notas").value
  };

  try {
    const response = await fetch("/netlify/functions/add-movimiento.js", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movimiento)
    });

    if (!response.ok) throw new Error("Error al guardar movimiento");

    mostrarConfirmacion("✅ Movimiento guardado correctamente");

    document.getElementById("formMovimientos").reset();
    setTodayDate();

  } catch (error) {
    console.error("❌ Error:", error);
    mostrarConfirmacion("⚠ Error al guardar el movimiento", true);
  }
}


// --- Mostrar mensaje de confirmación ---

function mostrarConfirmacion(mensaje, esError = false) {
  let msg = document.getElementById("mensajeConfirmacion");
  if (!msg) {
    msg = document.createElement("div");
    msg.id = "mensajeConfirmacion";
    msg.style.position = "fixed";
    msg.style.top = "20px";
    msg.style.right = "20px";
    msg.style.padding = "12px 20px";
    msg.style.borderRadius = "10px";
    msg.style.boxShadow = "0 0 10px rgba(0,0,0,0.2)";
    msg.style.zIndex = "9999";
    msg.style.color = "white";
    document.body.appendChild(msg);
  }
  msg.textContent = mensaje;
  msg.style.background = esError ? "#e74c3c" : "#2ecc71";
  msg.style.opacity = "1";

  setTimeout(() => {
    msg.style.transition = "opacity 0.5s";
    msg.style.opacity = "0";
  }, 2000);
}


// --- Cancelar y volver al menú principal ---

function cancelarMovimiento() {
  window.location.href = "index.html"; // o la ruta del menú principal
}

// --- Inicializar ---
document.addEventListener("DOMContentLoaded", () => {
  cargarSelects();
  setTodayDate();

  const form = document.getElementById("formMovimientos");
  if (form) form.addEventListener("submit", guardarMovimiento);

  const btnCancelar = document.getElementById("cancelarMovimiento");
  if (btnCancelar) btnCancelar.addEventListener("click", cancelarMovimiento);
});