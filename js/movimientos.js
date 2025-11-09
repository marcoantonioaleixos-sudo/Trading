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

    // Verificar que existan los elementos

    if (!selOrigen || !selDestino || !selMedio || !selActivo) {
      console.error('❌ No se encontraron uno o varios selects en el HTML');
      return;
    }

    // Llamada al endpoint que devuelve la configuración unificada

    const res = await fetch('/netlify/functions/get-Config'); // ajusta ruta si hace falta
    if (!res.ok) throw new Error('Error cargando configuración');

    const data = await res.json();
    // Esperamos que data tenga: { bancos: [...], criptos: [...], formasPago: [...] }
    // Rellenamos selects:
    rellenarSelect(selOrigen,  data.bancos,    'nombre', 'nombre');   // value/text -> nombre
    rellenarSelect(selDestino, data.bancos,    'nombre', 'nombre');   // mismo banco -> destino
    rellenarSelect(selMedio,   data.formasPago,'medio',  'medio');     // value/text -> medio
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