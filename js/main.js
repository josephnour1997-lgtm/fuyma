/* =========================================
   FUYMA - Main JavaScript
   ========================================= */

// ===== NAVBAR =====
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navItems = document.querySelectorAll('.nav-item');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

navToggle?.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navMenu.classList.toggle('open');
});

// Mobile dropdown toggles
navItems.forEach(item => {
  const link = item.querySelector('.nav-link');
  const dropdown = item.querySelector('.nav-dropdown');
  if (dropdown && link) {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        item.classList.toggle('open');
      }
    });
  }
});

// Close mobile menu when a dropdown link is clicked
document.querySelectorAll('.nav-dropdown-inner a').forEach(a => {
  a.addEventListener('click', () => {
    navMenu?.classList.remove('open');
    navToggle?.classList.remove('open');
    navItems.forEach(i => i.classList.remove('open'));
  });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    navMenu?.classList.remove('open');
    navToggle?.classList.remove('open');
    navItems.forEach(i => i.classList.remove('open'));
  }
});

// ===== ACTIVE NAV LINK =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link[href]').forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});

// ===== TABS =====
function activateTab(tabId) {
  const targetContent = document.getElementById(tabId);
  const targetBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
  if (!targetContent || !targetBtn) return false;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  targetBtn.classList.add('active');
  targetContent.classList.add('active');
  return true;
}

document.querySelectorAll('.tabs').forEach(tabGroup => {
  tabGroup.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => activateTab(btn.dataset.tab));
  });
});

// Activate tab from URL hash on load and on same-page hash navigation
const hashTab = window.location.hash.slice(1);
if (hashTab) activateTab(hashTab);

window.addEventListener('hashchange', () => {
  const tab = window.location.hash.slice(1);
  if (tab) activateTab(tab);
});

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('.btn-primary');
  const original = btn.textContent;
  btn.textContent = '✓ Message Sent';
  btn.style.background = '#22c55e';
  setTimeout(() => {
    btn.textContent = original;
    btn.style.background = '';
    contactForm.reset();
  }, 3000);
});

// ===== GOOGLE TRANSLATE INIT =====
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    includedLanguages: 'en,es,fr,de,it',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
    autoDisplay: false
  }, 'google_translate_element');
}

// ===== LANGUAGE SELECTOR =====
// Uses Google Translate's cookie mechanism — most reliable cross-browser approach.
// Setting the googtrans cookie then reloading causes GT to auto-translate on load.

function getLangFromCookie() {
  const m = document.cookie.match(/googtrans=\/en\/([a-z]+)/);
  return m ? m[1] : 'en';
}

function setTranslateCookie(lang) {
  const domain = window.location.hostname;
  if (lang === 'en') {
    const past = 'Thu, 01 Jan 1970 00:00:00 UTC';
    document.cookie = `googtrans=; expires=${past}; path=/`;
    document.cookie = `googtrans=; expires=${past}; path=/; domain=${domain}`;
    document.cookie = `googtrans=; expires=${past}; path=/; domain=.${domain}`;
  } else {
    document.cookie = `googtrans=/en/${lang}; path=/`;
    document.cookie = `googtrans=/en/${lang}; path=/; domain=${domain}`;
    document.cookie = `googtrans=/en/${lang}; path=/; domain=.${domain}`;
  }
}

// Restore UI to match active cookie on page load
(function syncLangUI() {
  const activeLang = getLangFromCookie();
  if (activeLang === 'en') return;
  const opt = document.querySelector(`.lang-option[data-lang="${activeLang}"]`);
  if (!opt) return;
  document.querySelectorAll('.lang-option').forEach(b => b.classList.remove('active'));
  opt.classList.add('active');
  document.getElementById('currentFlag').textContent = opt.dataset.flag;
  document.getElementById('currentCode').textContent = opt.dataset.code;
})();

const langSelector = document.getElementById('langSelector');
const langBtn = document.getElementById('langBtn');

langBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  langSelector.classList.toggle('open');
});

document.addEventListener('click', (e) => {
  if (langSelector && !langSelector.contains(e.target)) {
    langSelector.classList.remove('open');
  }
});

document.querySelectorAll('.lang-option').forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.dataset.lang;
    langSelector.classList.remove('open');
    if (lang === getLangFromCookie()) return; // already active, no reload needed
    setTranslateCookie(lang);
    window.location.reload();
  });
});

// ===== SMOOTH ANCHOR SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
