document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const openBtn = document.getElementById("menuButton");
  const closeBtn = document.getElementById("closeSidebar");

  // --- Abrir menú lateral ---
  openBtn.addEventListener("click", () => {
    sidebar.classList.add("open");
    overlay.classList.add("show");
  });

  // --- Cerrar menú lateral ---
  closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
  });

  // --- Cerrar al hacer clic fuera ---
  overlay.addEventListener("click", () => {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
  });

  // --- Submenús desplegables ---
  window.toggleSubmenu = (btn) => {
    const content = btn.nextElementSibling;
    content.classList.toggle("show");
  };

  // --- Cambiar pestaña visible ---
  window.showTab = (tabId) => {
    document.querySelectorAll(".tab").forEach((tab) => tab.classList.remove("active"));
    const tabToShow = document.getElementById(tabId);
    if (tabToShow) {
      tabToShow.classList.add("active");
      document.getElementById("pageTitle").textContent = tabToShow.querySelector("h2").textContent;
    }

    // Cierra el menú al cambiar de pestaña (modo móvil)
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
};

// === SUBMENÚS ===
function toggleSubmenu(button) {
  const submenu = button.nextElementSibling;
  submenu.classList.toggle("active");
}
});