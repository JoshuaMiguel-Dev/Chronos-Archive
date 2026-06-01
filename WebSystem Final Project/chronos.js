/*chronos.js — Shared JavaScript Used by all pages except login and index */

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

  if (progressBar) {
    progressBar.style.width = percent + '%';
  }

  /* Show or hide the back-to-top button */
  var backTop = document.getElementById('backTop');
  if (backTop) {
    if (scrolled > 400) {
      backTop.classList.add('show');
    } else {
      backTop.classList.remove('show');
    }
  }
});

/* --- Scroll Reveal --- */
/* Adds a fade-in animation as sections come into view */
var revealSections = document.querySelectorAll('.content-section');

/* First hide all sections so we can animate them in */
revealSections.forEach(function (section) {
  section.style.opacity = '0';
  section.style.transform = 'translateY(40px)';
  section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
});

var revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

revealSections.forEach(function (section) {
  revealObserver.observe(section);
});

/* --- Mobile Hamburger Menu --- */
var hamburger = document.getElementById('hamburger');
var navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
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
}

/* --- Highlight current page in navbar --- */
var currentPage = window.location.pathname.split('/').pop();
var allLinks = document.querySelectorAll('.nav-links a');

allLinks.forEach(function (link) {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});
