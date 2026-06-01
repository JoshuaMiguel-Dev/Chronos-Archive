/* index.js — Home Page JavaScript */

/* --- Check if user is logged in --- */
/* If not logged in, send them back to login page */
var user = localStorage.getItem('chronos-user');
if (!user) {
  window.location.href = 'login.html';
}

/* --- Progress Bar --- */
/* Updates the gold bar at the top as you scroll down */
var progressBar = document.getElementById('progressBar');

window.addEventListener('scroll', function () {
  var scrolled = window.scrollY;
  var totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  var percent = (scrolled / totalHeight) * 100;
  progressBar.style.width = percent + '%';

  /* Show or hide the back-to-top button */
  var backTop = document.getElementById('backTop');
  if (scrolled > 400) {
    backTop.classList.add('show');
  } else {
    backTop.classList.remove('show');
  }

  /* Highlight the active nav link based on scroll position */
  var sectionIds = ['hero', 'era-1950s', 'era-1960s', 'era-1970s', 'era-1980s', 'era-1990s', 'era-2000s', 'era-2010s', 'more'];
  var current = 'hero';

  sectionIds.forEach(function (id) {
    var section = document.getElementById(id);
    if (section && window.scrollY >= section.offsetTop - 120) {
      current = id;
    }
  });

  var navLinks = document.querySelectorAll('.nav-links a[data-section]');
  navLinks.forEach(function (link) {
    if (link.getAttribute('data-section') === current) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

/* --- Scroll Reveal --- */
/* Makes era sections fade in as you scroll to them */
var revealElements = document.querySelectorAll('.reveal');

var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(function (el) {
  observer.observe(el);
});

/* Main Menu for Phone */
var hamburger = document.getElementById('hamburger');
var navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', function () {
  navLinks.classList.toggle('open');
});

/* Close menu when a nav link is clicked */
var allNavLinks = document.querySelectorAll('.nav-links a');
allNavLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    navLinks.classList.remove('open');
  });
});
