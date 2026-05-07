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

// ===== I18N =====
const i18n = {
  lang: localStorage.getItem('fuyma-lang') || 'en',

  t(key) {
    const obj = FUYMA_TRANSLATIONS[this.lang] || FUYMA_TRANSLATIONS.en;
    return key.split('.').reduce((o, k) => (o != null ? o[k] : undefined), obj);
  },

  apply() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const v = this.t(el.dataset.i18n);
      if (v != null) el.textContent = v;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const v = this.t(el.dataset.i18nPlaceholder);
      if (v != null) el.placeholder = v;
    });
    // keep html lang attribute in sync
    document.documentElement.lang = this.lang;
  },

  setLang(code) {
    this.lang = code;
    localStorage.setItem('fuyma-lang', code);
    this.apply();
  }
};

// Sync language selector UI to stored language
(function syncLangUI() {
  const stored = i18n.lang;
  const opt = document.querySelector(`.lang-option[data-lang="${stored}"]`);
  if (!opt) return;
  document.querySelectorAll('.lang-option').forEach(b => b.classList.remove('active'));
  opt.classList.add('active');
  const flag = document.getElementById('currentFlag');
  const code = document.getElementById('currentCode');
  if (flag) flag.textContent = opt.dataset.flag;
  if (code) code.textContent = opt.dataset.code;
})();

const langSelector = document.getElementById('langSelector');
const langBtn = document.getElementById('langBtn');

langBtn?.addEventListener('click', e => {
  e.stopPropagation();
  langSelector.classList.toggle('open');
});

document.addEventListener('click', e => {
  if (langSelector && !langSelector.contains(e.target))
    langSelector.classList.remove('open');
});

document.querySelectorAll('.lang-option').forEach(btn => {
  btn.addEventListener('click', () => {
    langSelector.classList.remove('open');
    const flag = document.getElementById('currentFlag');
    const code = document.getElementById('currentCode');
    if (flag) flag.textContent = btn.dataset.flag;
    if (code) code.textContent = btn.dataset.code;
    document.querySelectorAll('.lang-option').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    i18n.setLang(btn.dataset.lang);
  });
});

// ===== SIMULATION STICKY IMAGE =====
const simSections = document.querySelectorAll('.sim-section');
const simImg = document.getElementById('simImg');
const simImgLabel = document.getElementById('simImgLabel');
const simImgSub = document.getElementById('simImgSub');
const simDots = document.querySelectorAll('.sim-progress-dot');

if (simSections.length && simImg) {
  const setSimImage = (section) => {
    const newSrc = section.dataset.img;
    const newLabel = section.dataset.label;
    const newSub = section.dataset.sub;
    const idx = section.dataset.idx;
    if (simImg.getAttribute('src') === newSrc) return;
    simImg.classList.add('fading');
    setTimeout(() => {
      simImg.src = newSrc;
      simImg.alt = newLabel;
      simImgLabel.textContent = newLabel;
      simImgSub.textContent = newSub;
      simImg.classList.remove('fading');
    }, 450);
    simDots.forEach(d => d.classList.toggle('active', d.dataset.dot === idx));
  };

  const simObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setSimImage(entry.target);
    });
  }, { rootMargin: '-35% 0px -35% 0px', threshold: 0 });

  simSections.forEach(s => simObserver.observe(s));

  simDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const target = document.querySelector(`.sim-section[data-idx="${dot.dataset.dot}"]`);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });
}

// Apply translations on page load
i18n.apply();

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
