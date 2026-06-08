/* ============================================================
   SOMSTRATEGIES.COM — MAIN JAVASCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Nav: scroll behavior ---- */
  const nav = document.getElementById('site-nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- Mobile nav toggle ---- */
  const mobileToggle = document.getElementById('mobile-toggle');
  const body = document.body;
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      body.classList.toggle('mobile-menu-open');
      const isOpen = body.classList.contains('mobile-menu-open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileToggle.innerHTML = isOpen
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M18 6 6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    });

    // Close on nav link click
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => body.classList.remove('mobile-menu-open'));
    });
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
      // Open clicked if it was closed
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ---- Active nav link ---- */
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').replace(/\/$/, '') || '/';
    if (href === path) a.style.color = 'var(--accent-bright)';
  });

  /* ---- Contact form (basic submission handler) ---- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      // Simulate submission — wire to your backend/Formspree/Netlify Forms
      setTimeout(() => {
        contactForm.innerHTML = `
          <div style="text-align:center; padding: 48px 0;">
            <div style="font-size:3rem; margin-bottom:16px;">✓</div>
            <h3 style="margin-bottom:8px;">Message received!</h3>
            <p>Thanks for reaching out. I'll be in touch within 1 business day.</p>
          </div>
        `;
      }, 1200);
    });
  }

});
