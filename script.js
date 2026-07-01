document.addEventListener('DOMContentLoaded', function () {

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // FAQ accordion
  var triggers = document.querySelectorAll('.accordion-trigger');
  triggers.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panel = btn.nextElementSibling;
      var isOpen = btn.getAttribute('aria-expanded') === 'true';

      // Close all
      triggers.forEach(function (b) {
        b.setAttribute('aria-expanded', 'false');
        b.nextElementSibling.style.maxHeight = null;
      });

      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  // Contact form -> WhatsApp handoff
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('name').value.trim();
      var phone = document.getElementById('phone').value.trim();
      var area = document.getElementById('area').value.trim();
      var issue = document.getElementById('issue').value.trim();

      var message = 'Hello, I would like to book a washing machine repair.%0A' +
        'Name: ' + encodeURIComponent(name) + '%0A' +
        'Phone: ' + encodeURIComponent(phone) + '%0A' +
        'Area: ' + encodeURIComponent(area) + '%0A' +
        'Issue: ' + encodeURIComponent(issue);

      window.open('https://wa.me/9779704787165?text=' + message, '_blank');
    });
  }

  // Reveal-on-scroll for section headers
  var revealTargets = document.querySelectorAll('.section-inner > .eyebrow');
  if ('IntersectionObserver' in window && revealTargets.length) {
    var sections = document.querySelectorAll('.section');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    sections.forEach(function (sec) {
      sec.style.opacity = 0;
      sec.style.transform = 'translateY(16px)';
      sec.style.transition = 'opacity .5s ease, transform .5s ease';
      observer.observe(sec);
    });
  }
});
