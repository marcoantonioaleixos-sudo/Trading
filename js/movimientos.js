// movimientos.js

// Esperar a que el DOM esté cargado

document.addEventListener('DOMContentLoaded', cargarSelects);

async function cargarSelects() {
  try {
    // Obtener elementos del formulario (IDs del HTML)
    const selOrigen   = document.getElementById('origen');
    const selDestino  = document.getElementById('destino');
    const selMedio    = document.getElementById('medio');
    const selActivo   = document.getElementById('activo');

    console.log("Selects cargados:");
    console.log("Origen:", selOrigen);
    console.log("Destino:", selDestino);
    console.log("Medio:", selMedio);
    console.log("Activo:", selActivo);

    // Verificar que existan los elementos

    if (!selOrigen || !selDestino || !selMedio || !selActivo) {
      console.error('❌ No se encontraron uno o varios selects en el HTML');
      return;
    }


    // Llamada al endpoint que devuelve la configuración unificada

    const res = await fetch('/.netlify/functions/get-config'); // ajusta ruta si hace falta
    if (!res.ok) throw new Error('Error cargando configuración');

    const data = await res.json();
    // Esperamos que data tenga: { bancos: [...], criptos: [...], formaspago: [...] }
    // Rellenamos selects:
    rellenarSelect(selOrigen,  data.bancos,    'nombre', 'nombre');   // value/text -> nombre
    rellenarSelect(selDestino, data.bancos,    'nombre', 'nombre');   // mismo bancos -> destino
    rellenarSelect(selMedio,   data.formaspago, 'id',  'medio');     // value/text -> medio
    rellenarSelect(selActivo,  data.criptos,   'ticker', 'ticker');   // value/text -> ticker

    console.log('✅ Selects cargados correctamente');
  } catch (error) {
    console.error('❌ Error al cargar selects:', error);
  }
}

/**
 * Rellenar un <select> con una lista de objetos.
 * select: elemento DOM select
 * lista: array de objetos
 * valueKey: propiedad del objeto para option.value
 * textKey:  propiedad del objeto para option.textContent
 */
function rellenarSelect(select, lista = [], valueKey = 'value', textKey = 'label') {
  // Limpia y añade opción por defecto
  select.innerHTML = '<option value="">-- Seleccione --</option>';

  if (!Array.isArray(lista)) return;

  lista.forEach(item => {
    const opt = document.createElement('option');
    // Protege si la propiedad no existe
    opt.value = item[valueKey] ?? '';
    opt.textContent = item[textKey] ?? item[valueKey] ?? '';
    select.appendChild(opt);
  });
}

// --- Establecer fecha actual ---
async function fetchData ($tabla){
  try {
    const response =  await fetch("/.netlify/functions/get-config");

    if (!response.ok) throw new Error("Error cargando tabla");
    return await response.json();
  } catch (error) {
    console.error("Error cargando ($tabla):", error);
    return [];
  }
}

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

  const cantidadInput =
  document.getElementById("cantidad").value;
  const cantidad = parseFloat(cantidadInput); // limpia ceros

  const valorUSDCInput =
  document.getElementById("valorUSDC").value;
  const valorUSDC = parseFloat(valorUSDCInput); // limpia ceros


  const movimiento = {
    fecha: document.getElementById("fecha").value,
    origen: document.getElementById("origen").value,
    medio: document.getElementById("medio").value,
    destino: document.getElementById("destino").value,
    cantidad: document.getElementById("cantidad").value,
    activo: document.getElementById("activo").value,
    valorUSDC: document.getElementById("valorUSDC").value,
    notas: document.getElementById("notas").value
  };

  try {
    const response = await fetch("/.netlify/functions/add-movimientos", {
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

