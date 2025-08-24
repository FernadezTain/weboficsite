// Переключение темы
document.getElementById('theme-toggle-btn').addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  document.body.classList.toggle('light-theme');
});

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

// Нижнее меню – переключение секций
const menuButtons = document.querySelectorAll('.bottom-menu .menu-btn');
const sections = document.querySelectorAll('.menu-section');

menuButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    menuButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    sections.forEach(sec => sec.classList.remove('visible'));

    const sectionId = btn.dataset.section;
    const section = document.getElementById(sectionId);
    section.classList.add('visible');

    // Запускаем анимацию для Главной секции
    if(sectionId === 'home') {
      animateHomeSection();
    }

    scrollToSection(sectionId);
  });
});

// Функция плавной прокрутки к секции
function scrollToSection(section) {
  let yOffset = -20;
  let element;

  if(section === 'home') element = document.getElementById('home');
  else if(section === 'news') element = document.getElementById('news');
  else if(section === 'tech') element = document.getElementById('tech');

  if(element) {
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

// Функция анимации элементов на главной
function animateHomeSection() {
  const section = document.getElementById('home');
  const textElements = section.querySelectorAll('h1, p');
  const telegramBtn = document.getElementById('telegram-button');

  textElements.forEach((el, i) => {
    el.style.animation = 'none';
    void el.offsetWidth; // сброс анимации
    el.style.animation = `slideTextUp 0.6s ease-out forwards ${0.1 + i*0.1}s`;
  });

  telegramBtn.style.animation = 'none';
  void telegramBtn.offsetWidth;
  telegramBtn.style.animation = 'slideButtonUpHome 0.6s ease-out forwards 0.3s';
}

// ⬇️ Запуск анимации при загрузке сайта
window.addEventListener('load', () => {
  animateHomeSection();
});
