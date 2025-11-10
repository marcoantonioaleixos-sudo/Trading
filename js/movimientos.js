// movimientos.js

// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
  cargarSelects();
  configurarFormulario();
});

// =============================
// CARGAR LOS SELECTS DESDE EL BACKEND
// =============================
async function cargarSelects() {
  try {
    const selOrigen = document.getElementById('origen');
    const selDestino = document.getElementById('destino');
    const selMedio = document.getElementById('medio');

    const response = await fetch('/api/datos-selects'); // 👈 Endpoint backend
    const data = await response.json();

    // Rellenar select de origen
    data.origenes.forEach(o => {
      const option = document.createElement('option');
      option.value = o.id;
      option.textContent = o.nombre;
      selOrigen.appendChild(option);
    });

    // Rellenar select de destino
    data.destinos.forEach(d => {
      const option = document.createElement('option');
      option.value = d.id;
      option.textContent = d.nombre;
      selDestino.appendChild(option);
    });

    // Rellenar select de medio
    data.medios.forEach(m => {
      const option = document.createElement('option');
      option.value = m.id;
      option.textContent = m.nombre;
      selMedio.appendChild(option);
    });

  } catch (error) {
    console.error('❌ Error cargando selects:', error);
  }
}

// =============================
// CONFIGURAR EL FORMULARIO PARA ENVIAR EL MOVIMIENTO
// =============================
function configurarFormulario() {
  const form = document.getElementById('formMovimiento');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Obtener datos del formulario
    const movimiento = {
      fecha: document.getElementById('fecha').value,
      origen: document.getElementById('origen').value,
      destino: document.getElementById('destino').value,
      medio: document.getElementById('medio').value,
      cantidad: parseFloat(document.getElementById('cantidad').value),
      valorUSDC: parseFloat(document.getElementById('valorUSDC').value),
      descripcion: document.getElementById('descripcion').value
    };

    // Enviar al backend
    try {
      const response = await fetch('/api/movimientos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movimiento)
      });

      const data = await response.json();

      if (response.ok) {
        alert('✅ Movimiento guardado correctamente');
        form.reset();
      } else {
        alert('⚠ Error al guardar: ' + (data.message || 'Desconocido'));
      }
    } catch (error) {
      console.error('❌ Error al guardar movimiento:', error);
      alert('❌ No se pudo conectar con el servidor');
    }
  });
}