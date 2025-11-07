document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('depositForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Recogemos los valores directamente como texto
    
    const data = {
      fecha: document.getElementById('fecha').value,
      tipo: document.getElementById('tipo').value,
      origen: document.getElementById('origen').value,     // nombre del banco
      destino: document.getElementById('destino').value,   // nombre del banco
      medio: document.getElementById('medio').value,       // tipo de medio (Transferencia, Bizum, etc.)
      cantidad: parseFloat(document.getElementById('cantidad').value),
      activo: document.getElementById('activo').value,     // BTC, USDT, etc.
      valorUSDC: parseFloat(document.getElementById('valorUSDC').value || 0),
      notas: document.getElementById('notas').value.trim(),
    };

    try {
      const res = await fetch('/.netlify/functions/save-movimiento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        mostrarConfirmacion("✅ Movimiento guardado correctamente");
        form.reset();
      } else {
        mostrarConfirmacion("❌ Error al guardar el movimiento");
      }

    } catch (err) {
      console.error(err);
      mostrarConfirmacion("⚠ No se pudo conectar al servidor");
    }
  });
});


// === Animación / mensaje temporal ===

function mostrarConfirmacion(mensaje) {
  const msg = document.createElement('div');
  msg.textContent = mensaje;
  msg.className = 'mensaje-confirmacion';
  document.body.appendChild(msg);

  setTimeout(() => msg.classList.add('visible'), 50);   // aparece suavemente
  setTimeout(() => msg.classList.remove('visible'), 2500); // desaparece
  setTimeout(() => msg.remove(), 3000);
}