
menuButton.addEventListener('click', () => {
  sidebar.classList.add('open');
  overlay.classList.add('active');
});

closeSidebar.addEventListener('click', () => {
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
});

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