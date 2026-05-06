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
document.querySelectorAll('.tabs').forEach(tabGroup => {
  const buttons = tabGroup.querySelectorAll('.tab-btn');
  const contents = tabGroup.closest('section, .tab-wrapper')?.querySelectorAll('.tab-content')
    || document.querySelectorAll('.tab-content');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.tab;
      document.querySelectorAll('.tab-content').forEach(c => {
        c.classList.toggle('active', c.id === target);
      });
    });
  });
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
    const code = btn.dataset.code;

    document.getElementById('currentCode').textContent = code;
    document.querySelectorAll('.lang-option').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    langSelector.classList.remove('open');

    const triggerTranslate = () => {
      const select = document.querySelector('.goog-te-combo');
      if (select) {
        select.value = lang === 'en' ? '' : lang;
        select.dispatchEvent(new Event('change', { bubbles: true }));
        return true;
      }
      return false;
    };

    if (!triggerTranslate()) {
      const interval = setInterval(() => {
        if (triggerTranslate()) clearInterval(interval);
      }, 300);
      setTimeout(() => clearInterval(interval), 6000);
    }
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
