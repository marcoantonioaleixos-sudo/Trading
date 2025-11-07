// === CARGAR CONFIGURACIÓN DESDE NEON ===

async function cargarConfiguracion() {
  try {
    const response = await fetch('/.netlify/functions/get-config');
    if (!response.ok) throw new Error('Error al obtener configuración');
    const data = await response.json();

    const bancos = data.bancos || [];
    const formasPago = data.formasPago || [];

    const selectOrigen = document.getElementById('origen');
    const selectDestino = document.getElementById('destino');
    const selectMedio = document.getElementById('medio');

    if (!selectOrigen || !selectDestino || !selectMedio) {
      console.warn('Faltan selects en el formulario.');
      return;
    }

    // Limpia los selects
    
    const limpiar = (sel, texto) => sel.innerHTML = <option value="">${texto}</option>;
    limpiar(selectOrigen, 'Seleccione banco origen');
    limpiar(selectDestino, 'Seleccione banco destino');
    limpiar(selectMedio, 'Seleccione forma de pago');

    // Poblar bancos

    bancos.forEach(b => {
      const opt1 = document.createElement('option');
      opt1.value = b.id;
      opt1.textContent = b.nombre;
      selectOrigen.appendChild(opt1);

      const opt2 = document.createElement('option');
      opt2.value = b.id;
      opt2.textContent = b.nombre;
      selectDestino.appendChild(opt2);
    });

    // Poblar formas de pago
    
    formasPago.forEach(fp => {
      const opt = document.createElement('option');
      opt.value = fp.id;
      opt.textContent = fp.tipo;
      selectMedio.appendChild(opt);
    });

  } catch (err) {
    console.error('Error cargando configuración:', err);
  }
}

document.addEventListener('DOMContentLoaded', cargarConfiguracion);