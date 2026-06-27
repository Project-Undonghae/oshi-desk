const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const toast = document.querySelector('.toast');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.textContent = isOpen ? '×' : '☰';
  });

  document.querySelectorAll('.nav a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.textContent = '☰';
    });
  });
}

const PLATFORM_LABEL = {
  win: 'Windows',
  mac_arm64: 'macOS (Apple Silicon)',
  mac_x64: 'macOS (Intel)',
};

const CHARACTER_LABEL = {
  hebi: '헤비냥',
  isha: '이샤롱',
};

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(window.toastTimer);
  window.toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2400);
}

function setDownloadButtonState(button, enabled, label) {
  button.disabled = !enabled;
  button.setAttribute('aria-disabled', String(!enabled));
  if (label) button.setAttribute('title', label);
  else button.removeAttribute('title');
}

async function initDownloads() {
  const buttons = document.querySelectorAll('.download-btn[data-character][data-platform]');
  let manifest;

  try {
    const response = await fetch('downloads/index.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('manifest unavailable');
    manifest = await response.json();
  } catch {
    buttons.forEach((button) => setDownloadButtonState(button, false, '다운로드 정보를 불러올 수 없습니다'));
    return;
  }

  buttons.forEach((button) => {
    const character = button.dataset.character;
    const platform = button.dataset.platform;
    const url = manifest.files?.[character]?.[platform]?.trim();
    const name = `${CHARACTER_LABEL[character] || character} ${PLATFORM_LABEL[platform] || platform}`;

    if (!url) {
      setDownloadButtonState(button, false, `${name} — 준비 중`);
      button.addEventListener('click', () => showToast(`${name} 다운로드는 준비 중입니다.`));
      return;
    }

    setDownloadButtonState(button, true);
    button.addEventListener('click', () => {
      if (typeof gtag === 'function') {
        gtag('event', 'download_click', {
          character,
          platform,
          character_label: CHARACTER_LABEL[character] || character,
          platform_label: PLATFORM_LABEL[platform] || platform,
          item_name: name,
          file_url: url,
        });
      }
      window.location.href = url;
    });
  });
}

initDownloads();

function initTheme() {
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const STORAGE_KEY = 'oshi-desk-theme';

  function isDark() {
    return root.classList.contains('dark');
  }

  function applyTheme(dark) {
    root.classList.toggle('dark', dark);
    root.classList.toggle('light', !dark);
    if (btn) {
      btn.setAttribute('aria-label', dark ? '라이트모드로 전환' : '다크모드로 전환');
      btn.setAttribute('title', dark ? '다크 모드' : '라이트 모드');
    }
  }

  applyTheme(isDark());

  if (btn) {
    btn.addEventListener('click', () => {
      const next = !isDark();
      applyTheme(next);
      try {
        localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light');
      } catch (_) {}
    });
  }
}

initTheme();

const revealElements = document.querySelectorAll('.reveal');
revealElements.forEach((element) => element.classList.add('reveal-ready'));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('visible'));
}
