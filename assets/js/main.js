// Mobile menu, dropdowns, sub-tab highlighting and reveal-on-scroll
(function () {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const mobile = () => window.matchMedia('(max-width: 1080px)').matches;

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // On mobile, the parent item opens its sub-menu instead of navigating
  document.querySelectorAll('.has-dropdown > .nav-link').forEach(link => {
    link.addEventListener('click', e => {
      if (!mobile()) return;
      const li = link.parentElement;
      if (!li.classList.contains('open')) {
        e.preventDefault();
        li.classList.add('open');
      }
    });
  });

  // Highlight the active sub-tab while scrolling
  const tabs = Array.from(document.querySelectorAll('.subtabs a'));
  if (tabs.length) {
    const sections = tabs.map(t => document.querySelector(t.getAttribute('href'))).filter(Boolean);
    const setActive = () => {
      const y = window.scrollY + 200;
      let current = sections[0];
      sections.forEach(s => { if (s.offsetTop <= y) current = s; });
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) current = sections[sections.length - 1];
      tabs.forEach(t => t.classList.toggle('active', t.getAttribute('href') === '#' + current.id));
    };
    window.addEventListener('scroll', setActive, { passive: true });
    setActive();
  }

  // Reveal on scroll
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); } });
    }, { threshold: 0.08 });
    items.forEach(el => io.observe(el));
  } else {
    items.forEach(el => el.classList.add('visible'));
  }

  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
