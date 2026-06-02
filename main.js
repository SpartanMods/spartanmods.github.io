const OPEN_TO_WORK = false;

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
