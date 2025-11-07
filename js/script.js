// === SIDEBAR ===
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const menuButton = document.getElementById('menuButton');
const closeSidebar = document.getElementById('closeSidebar');
const tabs = document.querySelectorAll('.tab');
const pageTitle = document.getElementById('pageTitle');

menuButton.addEventListener('click', openSidebar);
closeSidebar.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

// === SUBMENÚS ===
function toggleSubmenu(button) {
  const submenu = button.nextElementSibling;
  submenu.classList.toggle('active');
}

// === CAMBIO DE PESTAÑAS ===
function showTab(tabId) {
  // Ocultar todas las pestañas
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
  });

  // Mostrar la pestaña seleccionada
  const selectedTab = document.getElementById(tabId);
  if (selectedTab) {
    selectedTab.classList.add('active');
  }

  // Cambiar el título superior
  const pageTitle = document.getElementById('pageTitle');
  const button = document.querySelector([onclick="showTab('${tabId}')"]);
  if (button && pageTitle) {
    pageTitle.textContent = button.textContent;
  }

  // Cerrar menú lateral en pantallas pequeñas
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
}