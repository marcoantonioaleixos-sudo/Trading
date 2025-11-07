// script.js
document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const openBtn = document.getElementById("menuButton");
  const closeBtn = document.getElementById("closeSidebar");

  // Seguridad: solo añade event listeners si existen los elementos
  if (openBtn && sidebar && overlay) {
    openBtn.addEventListener("click", () => {
      sidebar.classList.add("active");
      overlay.classList.add("show");
    });
  }

  if (closeBtn && sidebar && overlay) {
    closeBtn.addEventListener("click", () => {
      sidebar.classList.remove("active");
      overlay.classList.remove("show");
    });
  }

  if (overlay && sidebar) {
    overlay.addEventListener("click", () => {
      sidebar.classList.remove("active");
      overlay.classList.remove("show");
    });
  }

  // Delegación para submenús: funciona incluso si hay muchos
  document.addEventListener("click", (e) => {
    // si el botón tiene la clase has-sub, usamos ese botón
    const btn = e.target.closest(".has-sub");
    if (btn) {
      // evita que el botón recargue/navegue si es <button>
      e.preventDefault();
      const content = btn.nextElementSibling;
      if (!content) return;
      // cerrar otros submenus opcional:
      // document.querySelectorAll('.submenu-content.active').forEach(x => { if (x !== content) x.classList.remove('active');});
      content.classList.toggle("active");
    }
  });

  // Función global para compatibilidad con HTML inline onclick="showTab('id')"
  window.showTab = function (tabId) {
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
    const tab = document.getElementById(tabId);
    if (tab) {
      tab.classList.add("active");
      const title = tab.querySelector("h2");
      if (title && document.getElementById("pageTitle")) {
        document.getElementById("pageTitle").textContent = title.textContent;
      }
    }
    // cerrar menú en móvil al navegar
    if (sidebar && overlay) {
      sidebar.classList.remove("active");
      overlay.classList.remove("show");
    }
  };
});