// === Переключение темы ===
const themeBtn = document.getElementById('theme-toggle-btn');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  document.body.classList.toggle('light-theme');
});

// === Модальное окно ===
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

const menuButtons = document.querySelectorAll('.bottom-menu .menu-btn');
const sections = document.querySelectorAll('.menu-section');

menuButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Обновляем активную кнопку
    menuButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Показываем нужную секцию и скрываем остальные
    sections.forEach(sec => {
      if(sec.id === btn.dataset.section){
        sec.classList.add('visible');
      } else {
        sec.classList.remove('visible');
      }
    });

    // Анимация главной секции
    if(btn.dataset.section === 'home') animateHomeSection();

    // Скролл к секции
    scrollToSection(btn.dataset.section);
  });
});

// === Плавная прокрутка к секции ===
function scrollToSection(sectionId) {
  const yOffset = -20;
  const element = document.getElementById(sectionId);
  if(element) {
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

// === Анимация Главной секции ===
function animateHomeSection() {
  const section = document.getElementById('home');
  const textElements = section.querySelectorAll('h1, p');
  const telegramBtn = document.getElementById('telegram-button');

  // Анимация текста
  textElements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    setTimeout(() => {
      el.style.transition = 'all 0.6s ease-out';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, i * 100);
  });

  // Анимация кнопки Telegram
  telegramBtn.style.opacity = '0';
  telegramBtn.style.transform = 'translateY(30px)';
  setTimeout(() => {
    telegramBtn.style.transition = 'all 0.6s ease-out';
    telegramBtn.style.opacity = '1';
    telegramBtn.style.transform = 'translateY(0)';
  }, 300);
}

// === Запуск анимации при загрузке страницы ===
window.addEventListener('load', () => {
  animateHomeSection();
});
