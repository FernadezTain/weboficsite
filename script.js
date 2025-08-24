// ----------------------
// Переключение темы
document.getElementById('theme-toggle-btn').addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  document.body.classList.toggle('light-theme');
});

// ----------------------
// Модальное окно
const popup = document.getElementById('restore-popup');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('close-popup');
const restoreBtn = document.getElementById('restore-account-btn');

function showPopup() {
  popup.classList.remove('hide');
  popup.classList.add('show');
  overlay.classList.remove('hide');
  overlay.classList.add('show');
  popup.style.display = 'block';
  overlay.style.display = 'block';
}

function hidePopup() {
  popup.classList.remove('show');
  popup.classList.add('hide');
  overlay.classList.remove('show');
  overlay.classList.add('hide');

  popup.addEventListener('animationend', () => {
    if (popup.classList.contains('hide')) popup.style.display = 'none';
  }, { once: true });

  setTimeout(() => {
    if (overlay.classList.contains('hide')) overlay.style.display = 'none';
  }, 300);
}

restoreBtn.addEventListener('click', e => {
  e.preventDefault();
  showPopup();
});

closeBtn.addEventListener('click', hidePopup);
overlay.addEventListener('click', hidePopup);

// ----------------------
// Нижнее меню – переключение секций
const menuButtons = document.querySelectorAll('.bottom-menu .menu-btn');
const sections = document.querySelectorAll('.menu-section');

menuButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // убираем актив с всех кнопок
    menuButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // скрываем все секции
    sections.forEach(sec => sec.classList.remove('visible'));

    // показываем выбранную секцию
    const sectionId = btn.dataset.section;
    document.getElementById(sectionId).classList.add('visible');

    // плавная прокрутка к секции
    scrollToSection(sectionId);
  });
});

// ----------------------
// Функция плавной прокрутки к секции
function scrollToSection(section) {
  let yOffset = -20; // смещение для меню
  let element;

  if(section === 'home') element = document.querySelector('.content');
  else if(section === 'news') element = document.getElementById('update-list');
  else if(section === 'tech') element = document.querySelector('.faq');

  if(element) {
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}
