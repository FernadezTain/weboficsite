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
  overlay.style.pointerEvents = 'auto';
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
    if (overlay.classList.contains('hide')) {
      overlay.style.display = 'none';
      overlay.style.pointerEvents = 'none';
    }
  }, 300);
}

restoreBtn.addEventListener('click', e => { e.preventDefault(); showPopup(); });
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

    if(sectionId === 'home') animateHomeSection();
    scrollToSection(sectionId);
  });
});

// Плавная прокрутка
function scrollToSection(section) {
  let yOffset = -20;
  let element = document.getElementById(section);
  if(element) {
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

// Анимация главной секции
function animateHomeSection() {
  const section = document.getElementById('home');
  const textElements = section.querySelectorAll('h1, p');
  const telegramBtn = document.getElementById('telegram-button');

  textElements.forEach((el, i) => {
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = `slideTextUp 0.6s ease-out forwards ${0.1 + i*0.1}s`;
    el.style.pointerEvents = 'auto';
  });

  telegramBtn.style.animation = 'none';
  void telegramBtn.offsetWidth;
  telegramBtn.style.animation = 'slideButtonUpHome 0.6s ease-out forwards 0.3s';
  telegramBtn.addEventListener('animationend', () => {
    telegramBtn.style.opacity = '1';
    telegramBtn.style.pointerEvents = 'auto';
  }, { once: true });
}

// Запуск анимации при загрузке
window.addEventListener('load', () => {
  animateHomeSection();
});
