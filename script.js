const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const toast = document.querySelector('.toast');

function tr(key, vars) {
  const lang = window.OshiI18n?.getLang?.() || 'ko';
  return window.OshiI18n?.t?.(lang, key, vars) ?? key;
}

function updateLangBadge() {
  const badge = document.querySelector('.lang-current');
  if (!badge) return;
  const lang = window.OshiI18n?.getLang?.() || 'ko';
  const labels = { ko: 'KO', en: 'EN', ja: 'JA', 'zh-TW': 'ZH' };
  badge.textContent = labels[lang] || 'KO';
}

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.textContent = isOpen ? '×' : '☰';
    menuButton.setAttribute('aria-label', tr(isOpen ? 'menu.close' : 'menu.open'));
  });

  document.querySelectorAll('.nav a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.textContent = '☰';
      menuButton.setAttribute('aria-label', tr('menu.open'));
    });
  });
}

const PLATFORM_KEYS = {
  win: 'platform.win',
  mac_arm64: 'platform.mac_arm64',
  mac_x64: 'platform.mac_x64',
};

const CHARACTER_KEYS = {
  hebi: 'characters.hebi',
  isha: 'characters.isha',
};

function getCharacterLabel(character) {
  return tr(CHARACTER_KEYS[character] || character);
}

function getPlatformLabel(platform) {
  return tr(PLATFORM_KEYS[platform] || platform);
}

function getDownloadName(character, platform) {
  return `${getCharacterLabel(character)} ${getPlatformLabel(platform)}`;
}

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

function getFileDetails(url) {
  try {
    const pathname = new URL(url, window.location.href).pathname;
    const fileName = decodeURIComponent(pathname.split('/').pop() || '');
    const fileExtension = fileName.includes('.') ? fileName.split('.').pop().toLowerCase() : '';
    return { fileName, fileExtension };
  } catch (_) {
    return { fileName: '', fileExtension: '' };
  }
}

function trackDownloadAndNavigate(url, params) {
  let navigating = false;
  const navigate = () => {
    if (navigating) return;
    navigating = true;
    window.location.href = url;
  };

  if (typeof gtag !== 'function') {
    navigate();
    return;
  }

  const { fileName, fileExtension } = getFileDetails(url);
  const eventParams = {
    ...params,
    file_name: fileName,
    file_extension: fileExtension,
    link_url: url,
    transport_type: 'beacon',
    event_callback: navigate,
    event_timeout: 1000,
  };

  window.setTimeout(navigate, 1200);
  gtag('event', 'download_click', eventParams);
}

const downloadBindings = [];

function bindDownloadButton(button, manifest) {
  const character = button.dataset.character;
  const platform = button.dataset.platform;
  const url = manifest.files?.[character]?.[platform]?.trim();
  const name = getDownloadName(character, platform);

  const old = downloadBindings.find((b) => b.button === button);
  if (old?.handler) button.removeEventListener('click', old.handler);

  if (!url) {
    setDownloadButtonState(button, false, tr('download.preparing', { name }));
    const handler = () => showToast(tr('download.preparingToast', { name }));
    button.addEventListener('click', handler);
    downloadBindings.push({ button, handler });
    return;
  }

  setDownloadButtonState(button, true);
  const handler = () => {
    trackDownloadAndNavigate(url, {
      character,
      platform,
      character_label: getCharacterLabel(character),
      platform_label: getPlatformLabel(platform),
      item_name: name,
      file_url: url,
    });
  };
  button.addEventListener('click', handler);
  downloadBindings.push({ button, handler });
}

async function initDownloads() {
  const buttons = document.querySelectorAll('.download-btn[data-character][data-platform]');
  let manifest;

  try {
    const response = await fetch('downloads/index.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('manifest unavailable');
    manifest = await response.json();
  } catch {
    buttons.forEach((button) => setDownloadButtonState(button, false, tr('download.manifestError')));
    return;
  }

  downloadBindings.length = 0;
  buttons.forEach((button) => bindDownloadButton(button, manifest));
}

initDownloads();

window.addEventListener('languagechange', () => {
  updateLangBadge();
  initDownloads();
  refreshThemeLabels();
  if (menuButton) {
    const isOpen = nav?.classList.contains('open');
    menuButton.setAttribute('aria-label', tr(isOpen ? 'menu.close' : 'menu.open'));
  }
});

function initTheme() {
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const STORAGE_KEY = 'oshi-desk-theme';

  function isDark() {
    return root.classList.contains('dark');
  }

  window.refreshThemeLabels = function refreshThemeLabels() {
    const dark = isDark();
    if (btn) {
      btn.setAttribute('aria-label', tr(dark ? 'theme.toLight' : 'theme.toDark'));
      btn.setAttribute('title', tr(dark ? 'theme.dark' : 'theme.light'));
    }
  };

  function applyTheme(dark) {
    root.classList.toggle('dark', dark);
    root.classList.toggle('light', !dark);
    window.refreshThemeLabels();
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
updateLangBadge();

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
