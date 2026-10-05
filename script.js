document.addEventListener('DOMContentLoaded', () => {
  // ---- Menú móvil -------------------------------------------------
  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');

  if (toggle && links) {
    const setOpen = (open) => {
      links.classList.toggle('nav__links--open', open);
      toggle.classList.toggle('nav__toggle--open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };
    toggle.addEventListener('click', () => setOpen(!links.classList.contains('nav__links--open')));
    links.querySelectorAll('.nav__link').forEach(link => link.addEventListener('click', () => setOpen(false)));
  }

  // ---- Enlace activo según la sección visible ---------------------
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav__link');
  if (!sections.length || !navLinks.length) return;

  const setActive = (id) => {
    navLinks.forEach(link => {
      link.classList.toggle('nav__link--active', link.getAttribute('href') === `#${id}`);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(section => observer.observe(section));
});
