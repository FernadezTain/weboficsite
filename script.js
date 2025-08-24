// Переключение темы
document.getElementById('theme-toggle-btn').addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  document.body.classList.toggle('light-theme');
});

// Показ/скрытие секций
document.getElementById('toggle-commands').addEventListener('click', () => {
  document.getElementById('commands-list').classList.toggle('visible');
});

document.getElementById('toggle-update').addEventListener('click', () => {
  document.getElementById('update-list').classList.toggle('visible');
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
