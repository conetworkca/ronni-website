// Shared behaviour for every page in /site.
// 1. Loads the shared header and footer from /partials into each page.
// 2. Then runs each block's setup (header, sliders, counters, timeline, form…).
//    Each setup does nothing on pages that don't contain its block.

(function () {
  function loadPartials() {
    var slots = Array.prototype.slice.call(document.querySelectorAll('[data-include]'));
    return Promise.all(slots.map(function (slot) {
      var url = slot.getAttribute('data-include');
      return fetch(url)
        .then(function (res) { if (!res.ok) throw new Error(res.status); return res.text(); })
        .then(function (html) { slot.outerHTML = html; })
        .catch(function () {
          slot.innerHTML = '<div class="site-include-error">Couldn\'t load ' + url + '. Preview this site through a local server: run <code>node site/serve.mjs</code> and open http://localhost:8080</div>';
        });
    }));
  }

  // ========== Header (shared partial) (from code/header.html) ==========
  function initHeader() {
  var header = document.querySelector('.rl-hdr:not(.rl-hdr--ready)');
  if (!header) return;
  header.classList.add('rl-hdr--ready');

  var spacer = header.previousElementSibling;
  var inner = header.querySelector('.rl-hdr__inner');
  var toggle = header.querySelector('.rl-hdr__toggle');

  // Spacer matches the header's full (unscrolled) height so content never sits underneath it
  function sizeSpacer() {
    if (spacer && !header.classList.contains('is-scrolled')) spacer.style.height = inner.offsetHeight + 'px';
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

  sizeSpacer();
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', sizeSpacer);
  var logo = header.querySelector('.rl-hdr__logo img');
  if (logo && !logo.complete) logo.addEventListener('load', sizeSpacer);
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

  // ========== Free Blueprint form (from code/free-blueprint-form.html) ==========
  function initBlueprintForm() {
  // ▼▼▼ Paste your GHL Inbound Webhook URL between the quotes ▼▼▼
  var WEBHOOK_URL = '';
  // ▲▲▲ ---------------------------------------------------- ▲▲▲

  var root = document.querySelector('.rl-bp:not(.rl-bp--ready)');
  if (!root) return;

  var form = root.querySelector('.rl-bp__form');
  var success = root.querySelector('.rl-bp__success');
  var submit = form.querySelector('button[type="submit"]');
  var fields = {
    firstName: form.querySelector('#bp-first-name'),
    email: form.querySelector('#bp-email')
  };
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // same check as the live site

  function setError(input, message) {
    var el = document.getElementById(input.id + '-error');
    el.textContent = message || '';
    el.hidden = !message;
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
    if (message) input.setAttribute('aria-describedby', el.id);
    else input.removeAttribute('aria-describedby');
  }

  function validate() {
    var errors = {};
    if (!fields.firstName.value.trim()) errors.firstName = 'Please enter your first name.';
    var email = fields.email.value.trim();
    if (!email) errors.email = 'Please enter your email.';
    else if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.';
    setError(fields.firstName, errors.firstName);
    setError(fields.email, errors.email);
    return Object.keys(errors).length === 0;
  }

  // Clear a field's error as soon as the visitor types in it
  Object.keys(fields).forEach(function (key) {
    fields[key].addEventListener('input', function () {
      if (fields[key].getAttribute('aria-invalid') === 'true') setError(fields[key], '');
    });
  });

  function showToast(message) {
    var toast = document.createElement('div');
    toast.className = 'rl-bp-toast';
    toast.setAttribute('role', 'status');
    toast.innerHTML =
      '<span class="rl-bp-toast__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20" aria-hidden="true"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"/></svg></span>' +
      '<span class="rl-bp-toast__title"></span>';
    toast.querySelector('.rl-bp-toast__title').textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { toast.classList.add('is-shown'); });
    });
    setTimeout(function () {
      toast.classList.remove('is-shown');
      setTimeout(function () { toast.remove(); }, 400);
    }, 4000);
  }

  function showSuccess() {
    form.hidden = true;
    success.hidden = false;
    success.querySelector('.rl-bp__success-title').focus({ preventScroll: true });
    showToast('Check your inbox — the Blueprint is on its way.');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) return;

    if (!WEBHOOK_URL) {
      console.warn('[Free Blueprint form] WEBHOOK_URL is empty, so this sign-up was not sent anywhere.');
      showSuccess();
      return;
    }

    submit.disabled = true;
    var data = new URLSearchParams({
      first_name: fields.firstName.value.trim(),
      email: fields.email.value.trim(),
      source: 'Free Blueprint form',
      page_url: window.location.href
    });
    // "no-cors" lets the browser post to GHL's webhook from any domain. The reply can't be
    // read, so a sign-up counts as sent unless the request itself fails.
    fetch(WEBHOOK_URL, { method: 'POST', mode: 'no-cors', body: data })
      .then(showSuccess)
      .catch(function () {
        submit.disabled = false;
      });
  });

  // Fade-up reveal (card at 120ms, line underneath at 220ms)
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    root.querySelectorAll('.rl-bp__reveal').forEach(function (el) {
      el.style.transitionDelay = (el.getAttribute('data-delay') || 0) + 'ms';
      observer.observe(el);
    });
  }
  root.classList.add('rl-bp--ready');
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

  // ========== Contact inquiry form (same checks, toast and thank-you view as the live site) ==========
  // Like the live site, it doesn't send anything. It's marked to be replaced by a GHL form.
  function initContactForm() {
    var form = document.querySelector('.rl-ct__form');
    if (!form) return;
    var success = document.querySelector('.rl-ct__success');
    var fields = {
      name: form.querySelector('#ci-name'),
      email: form.querySelector('#ci-email'),
      message: form.querySelector('#ci-message')
    };
    var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // same check as the live site

    function setError(input, message) {
      var el = document.getElementById(input.id + '-error');
      el.textContent = message || '';
      el.hidden = !message;
      input.setAttribute('aria-invalid', message ? 'true' : 'false');
      if (message) input.setAttribute('aria-describedby', el.id);
      else input.removeAttribute('aria-describedby');
    }

    function validate() {
      var errors = {};
      if (!fields.name.value.trim()) errors.name = 'Please enter your name.';
      var email = fields.email.value.trim();
      if (!email) errors.email = 'Please enter your email.';
      else if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.';
      if (!fields.message.value.trim()) errors.message = 'Please enter a message.';
      Object.keys(fields).forEach(function (key) { setError(fields[key], errors[key]); });
      return Object.keys(errors).length === 0;
    }

    Object.keys(fields).forEach(function (key) {
      fields[key].addEventListener('input', function () {
        if (fields[key].getAttribute('aria-invalid') === 'true') setError(fields[key], '');
      });
    });

    function showToast(message) {
      // Uses the same toast styles as the Free Blueprint form (.rl-bp-toast)
      var toast = document.createElement('div');
      toast.className = 'rl-bp-toast';
      toast.setAttribute('role', 'status');
      toast.innerHTML =
        '<span class="rl-bp-toast__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20" aria-hidden="true"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"/></svg></span>' +
        '<span class="rl-bp-toast__title"></span>';
      toast.querySelector('.rl-bp-toast__title').textContent = message;
      document.body.appendChild(toast);
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { toast.classList.add('is-shown'); });
      });
      setTimeout(function () {
        toast.classList.remove('is-shown');
        setTimeout(function () { toast.remove(); }, 400);
      }, 4000);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate()) return;
      form.hidden = true;
      success.hidden = false;
      success.querySelector('.rl-ct__success-title').focus({ preventScroll: true });
      showToast('Your inquiry has been sent. Ronni will be in touch personally.');
    });
  }

  function start() {
    loadPartials().then(function () {
      initHeader();
      initHero();
      initClientResults();
      initStatCounters();
      initFramework();
      initPathTimeline();
      initBlueprintForm();
      initReveal();
      initParallax();
      initContactForm();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
