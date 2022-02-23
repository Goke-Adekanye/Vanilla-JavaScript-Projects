const sidebar = document.querySelector('.sidebar');
const sideToggle = document.querySelector('.sidebar-toggle');
const closeBtn = document.querySelector('.close-btn');

sideToggle.addEventListener('click', () => {
  sidebar.classList.toggle('show-sidebar');
});

closeBtn.addEventListener('click', () => {
  sidebar.classList.remove('show-sidebar');
});
