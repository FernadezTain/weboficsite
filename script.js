// === Переключение темы ===
const themeBtn = document.getElementById('theme-toggle-btn');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  document.body.classList.toggle('light-theme');
});

// === Нижнее меню ===
const menuButtons = document.querySelectorAll('.bottom-menu .menu-btn');
const sections = document.querySelectorAll('.menu-section');

menuButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Активная кнопка
    menuButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Показываем секцию
    sections.forEach(sec => {
      sec.classList.remove('visible');
      if(sec.id === btn.dataset.section) {
        sec.classList.add('visible');
      }
    });

    // Анимация для home
    if(btn.dataset.section === 'home') animateHomeSection();
  });
});

// === Анимация Home ===
function animateHomeSection() {
  const home = document.getElementById('home');
  const textEls = home.querySelectorAll('h1, p');
  const telegramBtn = document.getElementById('telegram-button');

  textEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    setTimeout(() => {
      el.style.transition = 'all 0.6s ease-out';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, i * 150);
  });

  telegramBtn.style.opacity = '0';
  telegramBtn.style.transform = 'translateY(30px)';
  setTimeout(() => {
    telegramBtn.style.transition = 'all 0.6s ease-out';
    telegramBtn.style.opacity = '1';
    telegramBtn.style.transform = 'translateY(0)';
  }, 300);
}

// === Запуск анимации при загрузке страницы ===
window.addEventListener('load', () => animateHomeSection());
