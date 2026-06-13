const OPEN_TO_WORK = false;

// Theme toggle
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

function applyTheme(theme, animate) {
  if (animate) {
    document.body.classList.add('theme-transitioning');
    setTimeout(() => document.body.classList.remove('theme-transitioning'), 280);
  }
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

const saved = localStorage.getItem('theme');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(saved || (systemDark ? 'dark' : 'light'), false);

themeToggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next, true);
});

// Progress bar + nav scroll state
const progressBar = document.getElementById('progressBar');
const header = document.getElementById('siteHeader');

function onScroll() {
  const scrolled = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.setProperty('--prog', (total > 0 ? (scrolled / total) * 100 : 0) + '%');
  header.classList.toggle('scrolled', scrolled > 30);
}

window.addEventListener('scroll', onScroll, { passive: true });

// Active nav section tracking
const navSections = document.querySelectorAll('#about, #work, #projects, #contact');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
let lastActiveLink = null;

const navObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const link = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
    if (!link) return;
    if (entry.isIntersecting) {
      if (lastActiveLink) lastActiveLink.classList.remove('active');
      link.classList.add('active');
      lastActiveLink = link;
    }
  });
}, { rootMargin: '-60px 0px -80% 0px', threshold: 0 });

navSections.forEach(s => navObs.observe(s));

// Custom cursor (desktop pointer devices only)
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const cursorDot = document.querySelector('.cursor-dot');
  if (cursorDot) {
    let cursorVisible = false;
    document.addEventListener('mousemove', e => {
      cursorDot.style.left = e.clientX + 'px';
      cursorDot.style.top = e.clientY + 'px';
      if (!cursorVisible) { cursorDot.classList.add('visible'); cursorVisible = true; }
    });
    document.addEventListener('mouseleave', () => {
      cursorDot.classList.remove('visible');
      cursorVisible = false;
    });
    document.querySelectorAll('a, button, summary, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', () => cursorDot.classList.add('expanded'));
      el.addEventListener('mouseleave', () => cursorDot.classList.remove('expanded'));
    });
  }
}

// Scroll-triggered reveal
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReduced) {
  document.querySelectorAll('.reveal-up, .stat-card').forEach(el => {
    el.classList.add('in-view', 'lit');
  });
} else {
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal-up').forEach(el => revealObs.observe(el));

  // Stat card top-border animation
  const statObs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('lit'), i * 80);
        statObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.25 });

  document.querySelectorAll('.stat-card').forEach(el => statObs.observe(el));

  // Stat count-up
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        countUp(e.target);
        countObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.6 });

  document.querySelectorAll('.stat-num[data-count]').forEach(el => countObs.observe(el));
}

function countUp(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  if (isNaN(target)) return;
  const duration = 1100;
  const start = performance.now();
  function step(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
