// Ronni Landeck site — global behaviour for GHL.
// Header (pinned header, current-page underline, mobile menu), testimonial sliders, stat counters,
// 90-day timeline, fade-up reveals and parallax. Each part does nothing on pages without its section.
// Paste into: Website settings → Tracking code → Footer, wrapped in <script> … </script>.
// (The forms are GHL forms, so no form code is included.)

(function () {
  // ========== Header (shared partial) (from code/header.html) ==========
  function initHeader() {
  var header = document.querySelector('.rl-hdr:not(.rl-hdr--ready)');
  if (!header) return;
  header.classList.add('rl-hdr--ready');

  // GHL wraps custom code in its own containers (width limits, overflow, transforms can all
  // break a fixed header). Move the header to the very top of <body> so none of them apply.
  if (header.parentNode !== document.body) document.body.prepend(header);
  var inner = header.querySelector('.rl-hdr__inner');
  var toggle = header.querySelector('.rl-hdr__toggle');

  // Pad the body by the header's full (unscrolled) height so the hero isn't hidden under it.
  // Measured with the scrolled state and transitions briefly off, so the value never changes
  // while scrolling and nothing visibly flickers.
  function padBody() {
    var wasScrolled = header.classList.contains('is-scrolled');
    header.classList.add('rl-hdr--measuring');
    header.classList.remove('is-scrolled');
    var border = parseFloat(window.getComputedStyle(header).borderBottomWidth) || 0;
    var height = Math.ceil(inner.getBoundingClientRect().height + border);
    if (wasScrolled) header.classList.add('is-scrolled');
    void header.offsetHeight; // apply the restored state before transitions come back
    header.classList.remove('rl-hdr--measuring');
    document.body.style.paddingTop = height + 'px';
    header.style.setProperty('--rl-hdr-h', height + 'px');
  }

  // Shrink after scrolling 24px, like the live site
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  }

  // Highlight the current page: "/" only on the home page, other links also match sub-pages
  var norm = function (p) { p = p.replace(/\.html$/, '').replace(/\/index$/, '').replace(/\/+$/, ''); return p || '/'; };
  var path = norm(window.location.pathname);
  header.querySelectorAll('.rl-hdr__link, .rl-hdr__mlink').forEach(function (a) {
    var to = norm(new URL(a.getAttribute('href'), window.location.href).pathname);
    var active = to === '/' ? path === '/' : (path === to || path.indexOf(to + '/') === 0);
    if (active) {
      a.classList.add('is-active');
      a.setAttribute('aria-current', 'page');
    }
  });

  // Mobile menu
  function setOpen(open) {
    header.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  toggle.addEventListener('click', function () { setOpen(!header.classList.contains('is-open')); });
  header.querySelectorAll('.rl-hdr__panel a').forEach(function (a) {
    a.addEventListener('click', function () { setOpen(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && header.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
  });

  padBody();
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', padBody);
  var logo = header.querySelector('.rl-hdr__logo img');
  if (logo && !logo.complete) logo.addEventListener('load', padBody);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(padBody);
  }

  // ========== Home hero (from code/hero-section.html) ==========
  function initHero() {
  // Runs for every hero block on the page.
  var sections = document.querySelectorAll('.rl-hero:not(.rl-hero--ready)');
  if (!sections.length) return;

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return; // content shows, photo stays still

  sections.forEach(function (section) {
    // Parallax: same maths as the live site. The photo moves 8% of its distance
    // from the middle of the screen, capped at 60px either way.
    var layer = section.querySelector('.rl-hero__parallax');
    var frame = 0;
    var update = function () {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(function () {
        var rect = layer.getBoundingClientRect();
        var shift = -(rect.top + rect.height / 2 - window.innerHeight / 2) * 0.08;
        shift = Math.max(-60, Math.min(60, shift));
        layer.style.transform = 'translate3d(0, ' + shift + 'px, 0)';
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    // Fade-up reveal
    if (!('IntersectionObserver' in window)) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    section.querySelectorAll('.rl-hero__reveal').forEach(function (el) {
      el.style.transitionDelay = (el.getAttribute('data-delay') || 0) + 'ms';
      observer.observe(el);
    });
    section.classList.add('rl-hero--ready');
  });
  }

  // ========== Client Results testimonial slider (from code/client-results-slider.html) ==========
  function initClientResults() {
  // Runs for every Client Results block on the page, so the snippet can be pasted more than once.
  var sections = document.querySelectorAll('.rl-cr:not(.rl-cr--ready)');
  if (!sections.length) return;

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) return; // content simply shows, no animation

  sections.forEach(function (section) {
    // Stagger the cards 0 / 90 / 180ms, as on the live site
    section.querySelectorAll('.rl-cr__item').forEach(function (item, i) {
      item.style.transitionDelay = (i * 90) + 'ms';
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    section.querySelectorAll('.rl-cr__reveal').forEach(function (el) { observer.observe(el); });
    section.classList.add('rl-cr--ready');
  });
  }

  // ========== Stat counters (90 days / 25 years / 200 hours) (from code/stat-counters.html) ==========
  function initStatCounters() {
  // Runs for every stat block on the page, so the snippet can be pasted more than once.
  var blocks = document.querySelectorAll('.rl-stats:not(.rl-stats--ready)');
  if (!blocks.length) return;

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) return; // final numbers stay as written

  var DURATION = 2000; // ms, same as the live site

  function countUp(el) {
    var target = parseInt(el.getAttribute('data-to'), 10) || 0;
    var start = null;
    function frame(now) {
      if (start === null) start = now;
      var progress = Math.min((now - start) / DURATION, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.round(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  blocks.forEach(function (block) {
    // Counters: start at 0, run when 40% visible
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          counterObserver.unobserve(entry.target);
          countUp(entry.target);
        }
      });
    }, { threshold: 0.4 });

    block.querySelectorAll('.rl-count').forEach(function (el) {
      el.textContent = '0';
      counterObserver.observe(el);
    });

    // Card fade-up: runs when 12% visible
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    block.querySelectorAll('.rl-stats__reveal').forEach(function (el) {
      el.style.transitionDelay = (el.getAttribute('data-delay') || 0) + 'ms';
      revealObserver.observe(el);
    });

    block.classList.add('rl-stats--ready');
  });
  }

  // ========== Framework section (from code/framework-section.html) ==========
  function initFramework() {
  // Runs for every framework block on the page.
  var sections = document.querySelectorAll('.rl-fw:not(.rl-fw--ready)');
  if (!sections.length) return;

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) return; // content simply shows

  sections.forEach(function (section) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    section.querySelectorAll('.rl-fw__reveal').forEach(function (el) {
      el.style.transitionDelay = (el.getAttribute('data-delay') || 0) + 'ms';
      observer.observe(el);
    });
    section.classList.add('rl-fw--ready');
  });
  }

  // ========== 90-day path timeline (from code/90-day-path-timeline.html) ==========
  function initPathTimeline() {
  // Runs for every timeline block on the page.
  var sections = document.querySelectorAll('.rl-path:not(.rl-path--ready)');
  if (!sections.length) return;

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  sections.forEach(function (section) {
    var fill = section.querySelector('.rl-path__fill');

    // Progress line: same maths as the live site. Progress is how far the middle of the
    // screen has travelled down the section (0 at the section top, 1 at its bottom).
    // The fill spans the 66.6667% between the first and last dot.
    if (reduceMotion) {
      fill.style.width = '66.6667%';
    } else {
      var frame = 0;
      var update = function () {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(function () {
          var rect = section.getBoundingClientRect();
          var progress = (window.innerHeight * 0.5 - rect.top) / rect.height;
          progress = Math.max(0, Math.min(1, progress));
          fill.style.width = (66.6667 * progress) + '%';
        });
      };
      update();
      window.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update);
    }

    // Fade-up reveal
    if (reduceMotion || !('IntersectionObserver' in window)) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    section.querySelectorAll('.rl-path__reveal').forEach(function (el) {
      el.style.transitionDelay = (el.getAttribute('data-delay') || 0) + 'ms';
      observer.observe(el);
    });
    section.classList.add('rl-path--ready');
  });
  }

  // ========== Shared fade-up reveal for home sections (.rl-reveal) ==========
  function initReveal() {
    var items = document.querySelectorAll('.rl-reveal');
    if (!items.length) return;
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) return; // content simply shows
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) {
      el.style.transitionDelay = (el.getAttribute('data-delay') || 0) + 'ms';
      observer.observe(el);
    });
    document.documentElement.classList.add('rl-reveal-ready');
  }

  // ========== Shared parallax (.rl-parallax): same movement as the home hero photo ==========
  function initParallax() {
    var layers = Array.prototype.slice.call(document.querySelectorAll('.rl-parallax'));
    if (!layers.length) return;
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;
    var frame = 0;
    var update = function () {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(function () {
        layers.forEach(function (layer) {
          var rect = layer.getBoundingClientRect();
          var shift = -(rect.top + rect.height / 2 - window.innerHeight / 2) * 0.08;
          shift = Math.max(-60, Math.min(60, shift));
          layer.style.transform = 'translate3d(0, ' + shift + 'px, 0)';
        });
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  }

  function start() {
    initHeader();
    initHero();
    initClientResults();
    initStatCounters();
    initFramework();
    initPathTimeline();
    initReveal();
    initParallax();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
