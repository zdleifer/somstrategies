/* SOM Strategies — Main JS */

// --- Nav: scroll state ---
const nav = document.querySelector('.nav');
const onScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// --- Mobile menu ---
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');
navToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('mobile-open');
  navToggle.setAttribute('aria-expanded', open);
  navToggle.querySelectorAll('span')[0].style.transform = open ? 'translateY(7px) rotate(45deg)' : '';
  navToggle.querySelectorAll('span')[1].style.opacity  = open ? '0' : '';
  navToggle.querySelectorAll('span')[2].style.transform = open ? 'translateY(-7px) rotate(-45deg)' : '';
});

// Close mobile menu on outside click
document.addEventListener('click', e => {
  if (navLinks?.classList.contains('mobile-open') &&
      !nav.contains(e.target)) {
    navLinks.classList.remove('mobile-open');
  }
});

// --- FAQ accordion ---
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item   = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item.open').forEach(el => {
      el.classList.remove('open');
      el.querySelector('.faq-answer').style.maxHeight = null;
    });

    // Open if was closed
    if (!isOpen) {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// --- Scroll-in animations ---
const observer = new IntersectionObserver(
  entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }),
  { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
);
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// --- Contact form ---
const form = document.querySelector('.contact-form form');
form?.addEventListener('submit', e => {
  e.preventDefault();
  const formEl    = e.currentTarget;
  const successEl = formEl.closest('.contact-form').querySelector('.form-success');
  formEl.style.display = 'none';
  if (successEl) successEl.classList.add('visible');
});
