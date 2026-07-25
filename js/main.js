/* Theme toggle and scroll-spy. No dependencies.
   Everything here is enhancement — the page is complete without it. */

(function () {
  'use strict';

  /* ---------- theme ---------- */

  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');

  function label(theme) {
    return 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' theme';
  }

  if (toggle) {
    toggle.setAttribute('aria-label', label(root.getAttribute('data-theme')));

    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      toggle.setAttribute('aria-label', label(next));
      try {
        localStorage.setItem('theme', next);
      } catch (e) {
        /* Private browsing or blocked storage: the choice just won't persist. */
      }
    });
  }

  /* ---------- scroll-spy ---------- */

  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
  if (!links.length || !('IntersectionObserver' in window)) return;

  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if (sections.length !== links.length) return;

  function activate(id) {
    links.forEach(function (a) {
      if (a.getAttribute('href') === '#' + id) {
        a.setAttribute('aria-current', 'true');
      } else {
        a.removeAttribute('aria-current');
      }
    });
  }

  var observer = new IntersectionObserver(function (entries) {
    // Of everything currently on screen, mark the one nearest the top.
    var visible = entries.filter(function (e) { return e.isIntersecting; });
    if (!visible.length) return;

    visible.sort(function (a, b) {
      return a.boundingClientRect.top - b.boundingClientRect.top;
    });
    activate(visible[0].target.id);
  }, {
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  });

  sections.forEach(function (s) { observer.observe(s); });
})();
