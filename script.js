// ==== TOGGLE SIDEBAR ====
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const menuButton = document.getElementById('menuButton');
const closeSidebar = document.getElementById('closeSidebar');

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

// ==== SUBMENÚS ====
function toggleSubmenu(button) {
  const submenu = button.nextElementSibling;
  submenu.classList.toggle('active');
}

// ==== CAMBIO DE PESTAÑAs ====
function showTab(tabId) {
  // Oculta todas las secciones
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
  });

  // Muestra la sección seleccionada
  const activeTab = document.getElementById(tabId);
  if (activeTab) {
    activeTab.classList.add('active');
  }

  // Cambia el título superior
  const titleElement = activeTab.querySelector('h2');
  if (titleElement) {
    document.getElementById('pageTitle').textContent = titleElement.textContent;
  }

  // Cierra el menú si estás en móvil
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
}

// ==== CAMBIAR SECCIÓN ====
function switchSection() {
  alert('🔁 En el futuro aquí cambiarás entre Trading e Inversión Pasiva.');
}