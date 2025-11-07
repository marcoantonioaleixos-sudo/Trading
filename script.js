// === ABRIR / CERRAR SIDEBAR ===
const menuButton = document.getElementById("menuButton");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const closeSidebar = document.getElementById("closeSidebar");

if (menuButton && sidebar && overlay && closeSidebar) {
  menuButton.addEventListener("click", () => {
    sidebar.classList.add("active");
    overlay.classList.add("active");
  });

  closeSidebar.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  });

  overlay.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  });
}

// === SUBMENÚS ===
function toggleSubmenu(button) {
  const submenu = button.nextElementSibling;
  submenu.classList.toggle("active");
}