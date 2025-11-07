async function cargarMovimientos() {
  const res = await fetch("/.netlify/functions/get-movimientos");
  const movimientos = await res.json();

  const tabla = document.getElementById("tablaMovimientos");
  tabla.innerHTML = "";

  movimientos.forEach(m => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${m.fecha}</td>
      <td>${m.tipo}</td>
      <td>${m.origen}</td>
      <td>${m.destino}</td>
      <td>${m.medio}</td>
      <td>${m.monto}</td>
      <td>${m.nota || ""}</td>
    `;
    tabla.appendChild(fila);
  });
}

document.addEventListener("DOMContentLoaded", cargarMovimientos);