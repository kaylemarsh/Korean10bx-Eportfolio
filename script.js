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
var tDraftText = document.querySelector('.t-drawer-draft-text');
var tRevisedText = document.querySelector('.t-drawer-revised-text');
var tDraftImg = document.querySelector('.t-drawer-draft-img');
var tRevisedImg = document.querySelector('.t-drawer-revised-img');
var activeNode = null;

document.querySelectorAll('.t-node').forEach(function (node) {
  node.addEventListener('click', function () {
    if (activeNode === node) {
      activeNode.classList.remove('t-node--active');
      activeNode = null;
      tDrawer.hidden = true;
      return;
    }
    if (activeNode) activeNode.classList.remove('t-node--active');
    activeNode = node;
    node.classList.add('t-node--active');
    tDraftText.textContent = node.querySelector('.t-draft').textContent;
    tRevisedText.textContent = node.querySelector('.t-revised').textContent;

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

    tDrawer.hidden = false;
  });
});

document.addEventListener('click', function (e) {
  if (activeNode && !e.target.closest('.t-node')) {
    activeNode.classList.remove('t-node--active');
    activeNode = null;
    tDrawer.hidden = true;
  }
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
