const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const menuButton = document.getElementById('menuButton');
const closeSidebar = document.getElementById('closeSidebar');
const tabs = document.querySelectorAll('.tab');
const pageTitle = document.getElementById('pageTitle');

menuButton.addEventListener('click', openSidebar);
closeSidebar.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

function openSidebar() {
  sidebar.classList.add('open');
  overlay.classList.add('show');
}

function closeMenu() {
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
}

function toggleSubmenu(button) {
  const submenu = button.parentElement;
  submenu.classList.toggle('open');
}

function showTab(id) {
  tabs.forEach(tab => tab.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  pageTitle.textContent = document.getElementById(id).querySelector('h2').textContent;
  closeMenu();
}

function switchSection() {
  alert('🔁 Próximamente: Inversión Pasiva');
}

// Swipe open gesture
let startX = 0;
document.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});
document.addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  if (startX < 30 && endX - startX > 50) {
    openSidebar();
  }
});
