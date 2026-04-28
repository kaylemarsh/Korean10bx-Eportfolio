// Scroll reveal for .reveal elements
var revealObs = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(function (el) { revealObs.observe(el); });

// Delayed reveal for visualizations — fires only after scrolling past the question
var vizObs = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.05, rootMargin: '0px 0px -160px 0px' });
document.querySelectorAll('.reveal-viz').forEach(function (el) { vizObs.observe(el); });

// Slide-in for fact rows
var factObs = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.fact-item').forEach(function (el) { factObs.observe(el); });

// Hamburger
var hamburger = document.getElementById('hamburger');
var navLinks = document.querySelector('.nav-links');
if (hamburger) {
  hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });
}

// Close mobile nav when a link is clicked
document.querySelectorAll('.nav-links a').forEach(function (link) {
  link.addEventListener('click', function () {
    navLinks.classList.remove('open');
  });
});

// Timeline click-to-expand
var tDrawer = document.querySelector('.t-drawer');
var tDrawerCols = document.querySelector('.t-drawer-cols');
var tDrawerTitle = document.querySelector('.t-drawer-title');
var tNoteText = document.querySelector('.t-drawer-note-text');
var tDraftText = document.querySelector('.t-drawer-draft-text');
var tRevisedText = document.querySelector('.t-drawer-revised-text');
var tDraftImg = document.querySelector('.t-drawer-draft-img');
var tRevisedImg = document.querySelector('.t-drawer-revised-img');
var tDraftCaption = document.querySelector('.t-drawer-draft-caption');
var tRevisedCaption = document.querySelector('.t-drawer-revised-caption');
var activeNode = null;

function closeAll() {
  if (activeNode) activeNode.classList.remove('t-node--active');
  activeNode = null;
  tDrawer.hidden = true;
  tDrawer.classList.remove('t-drawer--white');
  tDrawerTitle.hidden = true;
  tNoteText.hidden = true;
  tDraftCaption.hidden = true;
  tRevisedCaption.hidden = true;
  tDrawerCols.style.display = '';
}

document.querySelectorAll('.t-node').forEach(function (node) {
  node.addEventListener('click', function () {
    if (activeNode === node) { closeAll(); return; }
    closeAll();
    activeNode = node;
    node.classList.add('t-node--active');

    var title = node.dataset.title || '';
    tDrawerTitle.textContent = title;
    tDrawerTitle.hidden = !title;

    if (node.classList.contains('t-node--single')) {
      tNoteText.textContent = node.querySelector('.t-draft').textContent;
      tNoteText.hidden = false;
      tDrawerCols.style.display = 'none';
      tDrawer.hidden = false;
      return;
    }

    tNoteText.hidden = true;
    tDrawerCols.style.display = '';
    if (node.classList.contains('t-node--white-text')) {
      tDrawer.classList.add('t-drawer--white');
    } else {
      tDrawer.classList.remove('t-drawer--white');
    }
    tDraftText.textContent = node.querySelector('.t-draft').textContent;
    tRevisedText.innerHTML = node.querySelector('.t-revised').innerHTML;

    var draftImgEl = node.querySelector('.t-draft-img');
    if (draftImgEl) {
      tDraftImg.src = draftImgEl.textContent.trim();
      tDraftImg.hidden = false;
    } else {
      tDraftImg.src = '';
      tDraftImg.hidden = true;
    }

    var revisedImgEl = node.querySelector('.t-revised-img');
    if (revisedImgEl) {
      tRevisedImg.src = revisedImgEl.textContent.trim();
      tRevisedImg.hidden = false;
    } else {
      tRevisedImg.src = '';
      tRevisedImg.hidden = true;
    }

    var draftCaption = node.dataset.draftCaption || '';
    tDraftCaption.textContent = draftCaption;
    tDraftCaption.hidden = !(draftCaption && !tDraftImg.hidden);

    var revisedCaption = node.dataset.revisedCaption || '';
    tRevisedCaption.textContent = revisedCaption;
    tRevisedCaption.hidden = !(revisedCaption && !tRevisedImg.hidden);

    tDrawer.hidden = false;
  });
});

document.addEventListener('click', function (e) {
  if (activeNode && !e.target.closest('.t-node')) closeAll();
});

// Flashcard flip — both cards: compact front, expands to back on click
function initFlashcard(fc) {
  if (!fc) return;
  var inner = fc.querySelector('.flashcard-inner');
  var front = fc.querySelector('.flashcard-front');
  var back  = fc.querySelector('.flashcard-back');

  inner.style.height = 'auto';
  var frontH = Math.max(front.scrollHeight, 220);

  back.style.transition = 'none';
  back.style.transform = 'rotateY(0deg)';
  back.style.visibility = 'hidden';
  var backH = back.scrollHeight;
  back.style.transform = '';
  back.style.visibility = '';
  back.style.transition = '';

  inner.style.height = frontH + 'px';

  fc.addEventListener('click', function () {
    if (fc.classList.contains('flipped')) {
      fc.classList.remove('flipped');
      inner.style.height = frontH + 'px';
    } else {
      fc.classList.add('flipped');
      inner.style.height = backH + 'px';
    }
  });
}

function initAllFlashcards() {
  document.querySelectorAll('.flashcard').forEach(initFlashcard);
}

if (document.readyState === 'complete') { initAllFlashcards(); }
else { window.addEventListener('load', initAllFlashcards); }

// Navbar opacity on scroll
var navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', function () {
    navbar.style.background = window.scrollY > 60
      ? 'rgba(255,255,255,0.98)'
      : 'rgba(255,255,255,0.88)';
  }, { passive: true });
}

// Active nav link based on scroll position
var sections = ['writings', 'projects', 'reflection', 'interviews'];
var navAnchors = {};
sections.forEach(function (id) {
  navAnchors[id] = document.querySelector('.nav-links a[href="#' + id + '"]');
});

window.addEventListener('scroll', function () {
  var scrollY = window.scrollY + 120;
  var active = null;

  sections.forEach(function (id) {
    var el = document.getElementById(id);
    if (el && el.offsetTop <= scrollY) active = id;
  });

  sections.forEach(function (id) {
    if (navAnchors[id]) navAnchors[id].classList.toggle('active', id === active);
  });
}, { passive: true });

// Reflection drawer toggle
(function () {
  var toggle = document.getElementById('reflection-toggle');
  var drawer = document.getElementById('reflection-drawer');
  if (!toggle || !drawer) return;
  toggle.addEventListener('click', function () {
    var isOpen = drawer.classList.toggle('open');
    toggle.classList.toggle('active', isOpen);
  });
})();

// Artist carousel — 3 cards per slide, 5 slides total
(function () {
  var carousel = document.getElementById('artist-carousel');
  if (!carousel) return;

  var track   = carousel.querySelector('.carousel-track');
  var slides  = Array.from(carousel.querySelectorAll('.carousel-slide'));
  var counter = carousel.querySelector('.carousel-counter');
  var prevBtn = carousel.querySelector('.carousel-prev');
  var nextBtn = carousel.querySelector('.carousel-next');
  var total   = slides.length;
  var current = 0;

  function goTo(idx) {
    current = (idx + total) % total;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    counter.textContent   = (current + 1) + ' / ' + total;
  }

  prevBtn.addEventListener('click', function (e) { e.stopPropagation(); goTo(current - 1); });
  nextBtn.addEventListener('click', function (e) { e.stopPropagation(); goTo(current + 1); });

  // Swipe support
  var startX = 0;
  var moved  = false;

  track.addEventListener('mousedown', function (e) {
    startX = e.clientX;
    moved  = false;
    e.preventDefault();
  });
  window.addEventListener('mousemove', function (e) {
    if (!startX) return;
    if (Math.abs(e.clientX - startX) > 8) moved = true;
  });
  window.addEventListener('mouseup', function (e) {
    if (!startX) return;
    if (moved) {
      var delta = e.clientX - startX;
      if      (delta < -60) goTo(current + 1);
      else if (delta >  60) goTo(current - 1);
    }
    startX = 0;
    moved  = false;
  });

  track.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
    moved  = false;
  }, { passive: true });
  track.addEventListener('touchmove', function (e) {
    if (Math.abs(e.touches[0].clientX - startX) > 8) moved = true;
  }, { passive: true });
  track.addEventListener('touchend', function (e) {
    if (moved) {
      var delta = e.changedTouches[0].clientX - startX;
      if      (delta < -60) goTo(current + 1);
      else if (delta >  60) goTo(current - 1);
    }
    startX = 0;
    moved  = false;
  });

  // Block clicks from reaching the parent flashcard flip handler
  carousel.addEventListener('click', function (e) { e.stopPropagation(); });

  goTo(0);
})();

// Hero text scramble — synced pairs
(function () {
  var subEl  = document.querySelector('.hero-sub .tw-text');
  var nameEl = document.querySelector('.hero-name .tw-text');
  if (!subEl || !nameEl) return;

  var pairs = [
    ['안녕하세요!', '지성'],
    ['Hello!',      'Kayle']
  ];

  var CHARSET  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var DURATION = 1.0;
  var SPEED    = 0.04;
  var WAIT     = 2400;
  var current  = 0;

  function scramble(el, text, onDone) {
    var steps = Math.round(DURATION / SPEED);
    var step  = 0;
    var id    = setInterval(function () {
      var progress  = step / steps;
      var out       = '';
      for (var i = 0; i < text.length; i++) {
        if (text[i] === ' ') { out += ' '; continue; }
        out += progress * text.length > i
          ? text[i]
          : CHARSET[Math.floor(Math.random() * CHARSET.length)];
      }
      el.textContent = out;
      step++;
      if (step > steps) {
        clearInterval(id);
        el.textContent = text;
        onDone();
      }
    }, SPEED * 1000);
  }

  function runPair() {
    var pair = pairs[current];
    var done = 0;
    function onDone() {
      if (++done < 2) return;
      setTimeout(function () {
        current = (current + 1) % pairs.length;
        runPair();
      }, WAIT);
    }
    scramble(subEl,  pair[0], onDone);
    scramble(nameEl, pair[1], onDone);
  }

  setTimeout(runPair, 900);
})()
