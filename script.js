// Smooth scroll for nav links
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Fade-in animation on scroll
const faders = document.querySelectorAll('.section, .founder, .project-card, .service-card');
const appearOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('appear');
    observer.unobserve(entry.target);
  });
}, appearOptions);
faders.forEach(fader => {
  fader.classList.add('fade-init');
  appearOnScroll.observe(fader);
});

// Contact form and newsletter validation + success message
document.querySelectorAll('.contact-form, .newsletter form').forEach(form => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;
    this.querySelectorAll('input[required], textarea[required]').forEach(input => {
      if (!input.value.trim()) {
        input.style.borderColor = '#e74c3c';
        valid = false;
      } else {
        input.style.borderColor = '#b2dbe6';
      }
    });
    if (valid) {
      const msg = document.createElement('div');
      msg.textContent = this.classList.contains('contact-form') ? 'Thank you for contacting us!' : 'Subscribed successfully!';
      msg.style.cssText = 'background:#1ec6c6;color:#fff;padding:1rem;border-radius:6px;margin-bottom:1rem;text-align:center;';
      this.parentNode.insertBefore(msg, this);
      this.reset();
      setTimeout(() => msg.remove(), 3500);
    }
  });
}); 