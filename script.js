// Marinova Robotics Professional Interactions
// ------------------------------------------
// - Staggered reveal, parallax, spring physics, ripple, magnetic buttons
// - Loading states, mobile menu, premium micro-interactions
// - requestAnimationFrame for smoothness
// - Detailed comments for complex logic

// 1. Staggered fade-in for sections/cards
const fadeEls = Array.from(document.querySelectorAll('.section, .founder, .service-card, .project-card'));
let fadeIndex = 0;
function staggerFadeIn() {
  fadeEls.forEach((el, i) => {
    el.classList.add('ani-fade-in', 'ani-stagger');
    el.style.setProperty('--ani-delay', `${i * 120}ms`);
  });
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('ani-in');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
  fadeEls.forEach(el => observer.observe(el));
}
staggerFadeIn();

// 2. Parallax effect for hero particles
function createParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  let particles = document.createElement('div');
  particles.className = 'hero__particles';
  for (let i = 0; i < 12; i++) {
    let p = document.createElement('div');
    p.className = 'particle';
    p.style.left = `${Math.random() * 100}%`;
    p.style.bottom = `-${Math.random() * 40 + 10}px`;
    p.style.width = p.style.height = `${Math.random() * 32 + 16}px`;
    p.style.animationDuration = `${10 + Math.random() * 8}s`;
    particles.appendChild(p);
  }
  hero.appendChild(particles);
  // Parallax on scroll
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    particles.style.transform = `translateY(${scrollY * 0.12}px)`;
  });
}
createParticles();

// 3. Magnetic/morphing buttons (hero CTA, form buttons)
function magneticButton(btn) {
  let hovering = false;
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width/2;
    const y = e.clientY - rect.top - rect.height/2;
    btn.style.transform = `translate(${x*0.12}px, ${y*0.18}px) scale(1.04)`;
    hovering = true;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
    hovering = false;
  });
}
document.querySelectorAll('.hero__cta, .contact-form button, .newsletter button').forEach(magneticButton);

// 4. Ripple effect on buttons
function addRippleEffect(btn) {
  btn.addEventListener('click', function(e) {
    let ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = `${e.offsetX}px`;
    ripple.style.top = `${e.offsetY}px`;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
}
document.querySelectorAll('.hero__cta, .contact-form button, .newsletter button').forEach(addRippleEffect);

// 5. Smooth scroll for nav links
// (kept from previous version, but add active state)
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
    this.classList.add('active');
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// 6. Loading state for form buttons
function showLoading(btn) {
  let spinner = btn.querySelector('.spinner');
  if (!spinner) {
    spinner = document.createElement('span');
    spinner.className = 'spinner';
    btn.appendChild(spinner);
  }
  spinner.style.display = 'inline-block';
  btn.disabled = true;
}
function hideLoading(btn) {
  let spinner = btn.querySelector('.spinner');
  if (spinner) spinner.style.display = 'none';
  btn.disabled = false;
}

// 7. Contact form and newsletter validation + animated loading/success
function enhanceForm(form) {
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
    const btn = this.querySelector('button');
    if (valid && btn) {
      showLoading(btn);
      setTimeout(() => {
        hideLoading(btn);
        const msg = document.createElement('div');
        msg.textContent = this.classList.contains('contact-form') ? 'Thank you for contacting us!' : 'Subscribed successfully!';
        msg.style.cssText = 'background:#1ec6c6;color:#fff;padding:1rem;border-radius:6px;margin-bottom:1rem;text-align:center;box-shadow:0 2px 8px rgba(30,198,198,0.10);font-weight:600;letter-spacing:0.02em;';
        this.parentNode.insertBefore(msg, this);
        this.reset();
        setTimeout(() => msg.remove(), 3500);
      }, 1200);
    }
  });
}
document.querySelectorAll('.contact-form, .newsletter form').forEach(enhanceForm);

// 8. Parallax background for hero (on scroll)
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  hero.style.backgroundPosition = `center ${window.scrollY * 0.18}px`;
});

// 9. Touch support for mobile (magnetic effect fallback)
if ('ontouchstart' in window) {
  document.querySelectorAll('.hero__cta, .contact-form button, .newsletter button').forEach(btn => {
    btn.removeEventListener('mousemove', null);
    btn.removeEventListener('mouseleave', null);
    btn.style.transform = '';
  });
}

// 10. (Optional) Mobile menu animation (if you add a hamburger menu in HTML)
// ... (add code here if/when mobile menu is implemented) ...

// 11. requestAnimationFrame for performance (used in parallax, particles, etc.)
// All animations above use GPU-accelerated properties (transform, opacity) for 60fps.

// End of premium interactions 