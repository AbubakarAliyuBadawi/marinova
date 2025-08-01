// Marinova Robotics - Enhanced JavaScript Interactions
// Tethys-inspired underwater effects and premium animations
// =========================================================

// 1. Create underwater particles system
function createUnderwaterParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  
  const particleCount = 25;
  
  // Clear existing particles
  container.innerHTML = '';
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties for each particle
    const size = Math.random() * 8 + 4; // 4-12px
    const startPos = Math.random() * 100;
    const delay = Math.random() * 15;
    const duration = Math.random() * 10 + 10; // 10-20s
    
    // Apply styles
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = startPos + '%';
    particle.style.animationDelay = delay + 's';
    particle.style.animationDuration = duration + 's';
    
    // Random opacity and color variations
    const opacity = Math.random() * 0.3 + 0.2; // 0.2-0.5
    const hue = Math.random() * 60 + 160; // Blue-cyan range
    particle.style.background = `hsla(${hue}, 70%, 60%, ${opacity})`;
    
    container.appendChild(particle);
  }
}

// 2. Intersection Observer for scroll animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    '.section, .service-card, .project-card, .founder, .about-content, .contact-form, .newsletter'
  );
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered delay for multiple elements
        const delay = entry.target.dataset.delay || index * 150;
        
        setTimeout(() => {
          entry.target.classList.add('ani-fade-in', 'ani-in');
          entry.target.style.setProperty('--ani-delay', delay + 'ms');
        }, delay);
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all elements
  animatedElements.forEach((el, index) => {
    el.classList.add('ani-fade-in', 'ani-stagger');
    el.dataset.delay = index * 100; // Stagger delay
    observer.observe(el);
  });
}

// 3. Magnetic button effects (Tethys-style)
function addMagneticEffect(element) {
  if (!element) return;
  
  let isHovering = false;
  
  element.addEventListener('mouseenter', () => {
    isHovering = true;
  });
  
  element.addEventListener('mouseleave', () => {
    isHovering = false;
    element.style.transform = '';
  });
  
  element.addEventListener('mousemove', (e) => {
    if (!isHovering) return;
    
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * 0.15;
    const deltaY = (e.clientY - centerY) * 0.15;
    
    element.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.05)`;
  });
}

// 4. Ripple effect for buttons
function addRippleEffect(button) {
  if (!button) return;
  
  button.addEventListener('click', function(e) {
    // Remove existing ripples
    const existingRipples = this.querySelectorAll('.ripple');
    existingRipples.forEach(ripple => ripple.remove());
    
    // Create new ripple
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    this.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.remove();
      }
    }, 600);
  });
}

// 5. Smooth scrolling navigation
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('nav a[href^="#"], .hero__cta[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Update active nav link
        document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
        if (this.closest('nav')) {
          this.classList.add('active');
        }
        
        // Smooth scroll to target
        const headerOffset = 80; // Account for fixed header
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// 6. Header background on scroll
function initHeaderEffects() {
  const header = document.querySelector('header');
  if (!header) return;
  
  let lastScrollY = 0;
  let ticking = false;
  
  function updateHeader() {
    const scrollY = window.pageYOffset;
    
    if (scrollY > 100) {
      header.style.background = 'rgba(10, 25, 41, 0.98)';
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
      header.style.background = 'rgba(10, 25, 41, 0.95)';
      header.style.boxShadow = '0 1px 10px rgba(30, 198, 198, 0.1)';
    }
    
    // Hide/show header on scroll direction
    if (scrollY > lastScrollY && scrollY > 200) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    
    lastScrollY = scrollY;
    ticking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  });
}

// 7. Enhanced form handling with loading states
function initFormHandling() {
  const forms = document.querySelectorAll('.contact-form, .newsletter form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const button = this.querySelector('button[type="submit"]');
      const inputs = this.querySelectorAll('input[required], textarea[required]');
      let isValid = true;
      
      // Validation
      inputs.forEach(input => {
        const value = input.value.trim();
        const errorClass = 'error';
        
        input.classList.remove(errorClass);
        
        if (!value) {
          input.classList.add(errorClass);
          input.style.borderColor = '#ef4444';
          isValid = false;
        } else if (input.type === 'email' && !isValidEmail(value)) {
          input.classList.add(errorClass);
          input.style.borderColor = '#ef4444';
          isValid = false;
        } else {
          input.style.borderColor = 'var(--glass-border)';
        }
      });
      
      if (!isValid) {
        // Shake animation for invalid form
        this.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
          this.style.animation = '';
        }, 500);
        return;
      }
      
      // Show loading state
      showLoadingState(button);
      
      // Simulate form submission
      setTimeout(() => {
        hideLoadingState(button);
        showSuccessMessage(this);
        this.reset();
        
        // Reset input styles
        inputs.forEach(input => {
          input.style.borderColor = 'var(--glass-border)';
        });
      }, 2000);
    });
  });
}

// Helper function for email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Show loading state on button
function showLoadingState(button) {
  if (!button) return;
  
  const originalText = button.textContent;
  button.dataset.originalText = originalText;
  
  // Add spinner
  const spinner = document.createElement('span');
  spinner.className = 'spinner';
  spinner.style.display = 'inline-block';
  
  button.textContent = 'Sending...';
  button.appendChild(spinner);
  button.disabled = true;
  button.style.opacity = '0.8';
}

// Hide loading state
function hideLoadingState(button) {
  if (!button) return;
  
  const spinner = button.querySelector('.spinner');
  if (spinner) {
    spinner.remove();
  }
  
  button.textContent = button.dataset.originalText || 'Submit';
  button.disabled = false;
  button.style.opacity = '1';
}

// Show success message
function showSuccessMessage(form) {
  // Remove existing success messages
  const existingMessages = form.parentNode.querySelectorAll('.success-message');
  existingMessages.forEach(msg => msg.remove());
  
  const message = document.createElement('div');
  message.className = 'success-message';
  
  if (form.classList.contains('contact-form')) {
    message.textContent = '✓ Thank you for your message! We\'ll get back to you soon.';
  } else {
    message.textContent = '✓ Successfully subscribed to our newsletter!';
  }
  
  form.parentNode.insertBefore(message, form);
  
  // Remove message after 5 seconds
  setTimeout(() => {
    if (message.parentNode) {
      message.style.animation = 'slideOut 0.5s ease-in';
      setTimeout(() => message.remove(), 500);
    }
  }, 5000);
}

// 8. Parallax effects for hero section
function initParallaxEffects() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  
  let ticking = false;
  
  function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    
    hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    
    ticking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });
}

// 9. Active navigation highlighting
function initActiveNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '-80px 0px -80px 0px' // Account for header height
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // Update active nav link
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);
  
  sections.forEach(section => observer.observe(section));
}

// 10. Advanced hover effects for cards
function initAdvancedHoverEffects() {
  const cards = document.querySelectorAll('.service-card, .project-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      // Scale up siblings slightly to create depth
      const siblings = [...this.parentNode.children].filter(el => el !== this);
      siblings.forEach(sibling => {
        sibling.style.transform = 'scale(0.95)';
        sibling.style.opacity = '0.7';
      });
    });
    
    card.addEventListener('mouseleave', function() {
      // Reset siblings
      const siblings = [...this.parentNode.children].filter(el => el !== this);
      siblings.forEach(sibling => {
        sibling.style.transform = '';
        sibling.style.opacity = '';
      });
    });
  });
}

// 11. Performance optimization
function optimizePerformance() {
  // Lazy load non-critical animations
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  if (mediaQuery.matches) {
    // Disable animations for users who prefer reduced motion
    document.body.classList.add('reduce-motion');
    return;
  }
  
  // Use Intersection Observer for expensive animations
  const expensiveElements = document.querySelectorAll('.service-card, .project-card, .founder');
  
  const performanceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-ready');
      }
    });
  }, { threshold: 0.1 });
  
  expensiveElements.forEach(el => performanceObserver.observe(el));
}

// 12. Touch device optimization
function optimizeForTouch() {
  if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Disable magnetic effects on touch devices
    const magneticElements = document.querySelectorAll('.hero__cta, .contact-form button, .newsletter button');
    magneticElements.forEach(el => {
      el.style.transform = '';
      el.removeEventListener('mousemove', () => {});
      el.removeEventListener('mouseleave', () => {});
    });
  }
}

// Shake animation for form errors
const shakeKeyframes = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }
`;

// Slide out animation for success messages
const slideOutKeyframes = `
  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-20px);
    }
  }
`;

// Add keyframes to stylesheet
function addDynamicStyles() {
  const style = document.createElement('style');
  style.textContent = shakeKeyframes + slideOutKeyframes;
  document.head.appendChild(style);
}

// Main initialization function
function init() {
  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
    return;
  }
  
  console.log('🌊 Initializing Marinova Robotics Enhanced Effects...');
  
  try {
    // Core functionality
    createUnderwaterParticles();
    initScrollAnimations();
    initSmoothScroll();
    initHeaderEffects();
    initFormHandling();
    initActiveNavigation();
    
    // Enhanced effects
    initParallaxEffects();
    initAdvancedHoverEffects();
    
    // Apply magnetic and ripple effects to interactive elements
    const magneticElements = document.querySelectorAll('.hero__cta, .contact-form button, .newsletter button');
    magneticElements.forEach(el => {
      addMagneticEffect(el);
      addRippleEffect(el);
    });
    
    // Performance and accessibility
    optimizePerformance();
    optimizeForTouch();
    addDynamicStyles();
    
    console.log('✅ Marinova Robotics effects initialized successfully!');
    
  } catch (error) {
    console.error('❌ Error initializing effects:', error);
  }
}

// Initialize when DOM is ready
init();

// Re-create particles on window resize for responsive behavior
window.addEventListener('resize', () => {
  clearTimeout(window.resizeTimeout);
  window.resizeTimeout = setTimeout(createUnderwaterParticles, 250);
});

// Cleanup function for performance
window.addEventListener('beforeunload', () => {
  // Clear any running animations or intervals
  const particles = document.querySelectorAll('.particle');
  particles.forEach(particle => {
    particle.style.animation = 'none';
  });
});