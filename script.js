// THE PALM: controla el deslizador antes/después.
const comparison = document.querySelector('[data-comparison]');
const slider = comparison?.querySelector('.comparison-range');

if (comparison && slider) {
  const updateComparison = () => {
    const value = Number(slider.value);
    comparison.style.setProperty('--split', value + '%');
    comparison.classList.toggle('is-new-only', value < 12);
    comparison.classList.toggle('is-old-only', value > 88);
  };
  slider.addEventListener('input', updateComparison);
  updateComparison();
}

// MENÚ MÓVIL: abre y cierra la navegación.
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
if (menuToggle && nav) {
  const closeMenu = () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menú');
    nav.classList.remove('open');
  };
  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    nav.classList.toggle('open', open);
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

// ANIMACIONES: revela secciones al hacer scroll; respeta movimiento reducido.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reducedMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.08, rootMargin: '0px 0px 30px 0px' });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

// PROGRESO: línea superior que indica cuánto se ha recorrido la página.
const progress = document.querySelector('.scroll-progress');
let ticking = false;
const updateScroll = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.width = (max > 0 ? window.scrollY / max * 100 : 0) + '%';
  ticking = false;
};
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateScroll);
    ticking = true;
  }
}, { passive: true });
updateScroll();
