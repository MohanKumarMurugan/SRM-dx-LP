// Add any JavaScript functionality here
document.addEventListener('DOMContentLoaded', function() {
    // Initialize any JavaScript functionality
    console.log('SRM Diagnostics website loaded');
});

// Franchise Benefits carousel scroll

document.querySelectorAll('.benefits-arrow').forEach(btn => {
  btn.addEventListener('click', function() {
    const carousel = document.getElementById('benefits-carousel');
    const card = carousel.querySelector('.benefit-card');
    if (!card) return;
    const style = window.getComputedStyle(card);
    const gap = parseInt(style.marginRight) + parseInt(style.marginLeft) + 24;
    const scrollAmount = card.offsetWidth + gap;
    if (btn.classList.contains('left')) {
      carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  });
});

// Auto-scroll for Franchise Benefits carousel
(function() {
  const carousel = document.getElementById('benefits-carousel');
  if (!carousel) return;
  const card = carousel.querySelector('.benefit-card');
  if (!card) return;
  const style = window.getComputedStyle(card);
  const gap = parseInt(style.marginRight) + parseInt(style.marginLeft) + 24;
  const scrollAmount = card.offsetWidth + gap;
  let autoScrollInterval = setInterval(() => {
    // If at end, scroll back to start
    if (carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth - 2) {
      carousel.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }, 3000);

  // Pause auto-scroll on mouse enter, resume on mouse leave
  carousel.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
  carousel.addEventListener('mouseleave', () => {
    autoScrollInterval = setInterval(() => {
      if (carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth - 2) {
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }, 3000);
  });
})();

// Auto-scroll for Testimonials carousel
(function() {
  const carousel = document.getElementById('testimonials-carousel');
  if (!carousel) return;
  const card = carousel.querySelector('.testimonial-card');
  if (!card) return;
  const style = window.getComputedStyle(card);
  const gap = parseInt(style.marginRight) + parseInt(style.marginLeft) + 32;
  const scrollAmount = card.offsetWidth + gap;
  let autoScrollInterval = setInterval(() => {
    // If at end, scroll back to start
    if (carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth - 2) {
      carousel.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }, 5000);

  // Pause auto-scroll on mouse enter of carousel or any card
  function pauseAutoScroll() {
    clearInterval(autoScrollInterval);
  }
  function resumeAutoScroll() {
    autoScrollInterval = setInterval(() => {
      if (carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth - 2) {
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }, 5000);
  }
  carousel.addEventListener('mouseenter', pauseAutoScroll);
  carousel.addEventListener('mouseleave', resumeAutoScroll);
  carousel.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', pauseAutoScroll);
    card.addEventListener('mouseleave', resumeAutoScroll);
  });
})();

// Testimonials carousel arrow scroll and drag-to-scroll
(function() {
  const carousel = document.getElementById('testimonials-carousel');
  if (!carousel) return;
  const card = carousel.querySelector('.testimonial-card');
  if (!card) return;
  const style = window.getComputedStyle(card);
  const gap = parseInt(style.marginRight) + parseInt(style.marginLeft) + 32;
  const scrollAmount = card.offsetWidth + gap;

  // Arrow button scroll
  document.querySelectorAll('.testimonials-arrow').forEach(btn => {
    btn.addEventListener('click', function() {
      if (btn.classList.contains('left')) {
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    });
  });

  // Mouse drag-to-scroll
  let isDown = false;
  let startX;
  let scrollLeft;
  carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    carousel.classList.add('dragging');
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
    e.preventDefault();
  });
  carousel.addEventListener('mouseleave', () => {
    isDown = false;
    carousel.classList.remove('dragging');
  });
  carousel.addEventListener('mouseup', () => {
    isDown = false;
    carousel.classList.remove('dragging');
  });
  carousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 1.2; // scroll-fast
    carousel.scrollLeft = scrollLeft - walk;
  });
  // Touch support
  carousel.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });
  carousel.addEventListener('touchend', () => {
    isDown = false;
  });
  carousel.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - carousel.offsetLeft;
    const walk = (x - startX) * 1.2;
    carousel.scrollLeft = scrollLeft - walk;
  });
})();

// FAQ Accordion Toggle
(function() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    item.addEventListener('click', function(e) {
      // Close all other items
      faqItems.forEach(i => { if (i !== item) i.classList.remove('active'); });
      // Toggle this one
      item.classList.toggle('active');
    });
    // Keyboard accessibility
    item.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });
})();

// Benefits Carousel Functionality
const benefitsCarousel = document.getElementById('benefits-carousel');
const benefitsLeftArrow = document.querySelector('.benefits-arrow.left');
const benefitsRightArrow = document.querySelector('.benefits-arrow.right');

function getBenefitScrollAmount() {
    const card = benefitsCarousel.querySelector('.benefit-card');
    if (!card) return 0;
    if (window.innerWidth <= 600) {
        return card.offsetWidth + 12;
    } else {
        return card.offsetWidth + 32;
    }
}

if (benefitsLeftArrow && benefitsRightArrow && benefitsCarousel) {
    benefitsLeftArrow.addEventListener('click', () => {
        benefitsCarousel.scrollBy({
            left: -getBenefitScrollAmount(),
            behavior: 'smooth'
        });
    });

    benefitsRightArrow.addEventListener('click', () => {
        benefitsCarousel.scrollBy({
            left: getBenefitScrollAmount(),
            behavior: 'smooth'
        });
    });
}

// Testimonials Carousel Functionality
const testimonialsCarousel = document.getElementById('testimonials-carousel');
const testimonialsLeftArrow = document.querySelector('.testimonials-arrow.left');
const testimonialsRightArrow = document.querySelector('.testimonials-arrow.right');

function getTestimonialScrollAmount() {
    const card = testimonialsCarousel.querySelector('.testimonial-card');
    if (!card) return 0;
    if (window.innerWidth <= 600) {
        return card.offsetWidth + 12;
    } else {
        return card.offsetWidth + 32;
    }
}

if (testimonialsLeftArrow && testimonialsRightArrow && testimonialsCarousel) {
    testimonialsLeftArrow.addEventListener('click', () => {
        testimonialsCarousel.scrollBy({
            left: -getTestimonialScrollAmount(),
            behavior: 'smooth'
        });
    });

    testimonialsRightArrow.addEventListener('click', () => {
        testimonialsCarousel.scrollBy({
            left: getTestimonialScrollAmount(),
            behavior: 'smooth'
        });
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form validation for appointment form
const appointmentForm = document.querySelector('.appointment-form');
if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputs = appointmentForm.querySelectorAll('input[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ff4444';
            } else {
                input.style.borderColor = '#4eb0f9';
            }
        });

        if (isValid) {
            // Here you would typically send the form data to your server
            alert('Appointment request submitted successfully!');
            appointmentForm.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

// Add input field labels and placeholders
const appointmentFields = document.querySelector('.appointment-fields');
if (appointmentFields) {
    const fieldLabels = [
        'Full Name',
        'Phone Number',
        'Email Address',
        'Preferred Date',
        'Preferred Time',
        'Test Type'
    ];

    const inputs = appointmentFields.querySelectorAll('input');
    inputs.forEach((input, index) => {
        input.placeholder = fieldLabels[index];
        input.setAttribute('aria-label', fieldLabels[index]);
    });
}

// Add loading state to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.classList.contains('benefits-arrow') && 
            !this.classList.contains('testimonials-arrow')) {
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 200);
        }
    });
});

// Add hover effects for benefit cards
const benefitCards = document.querySelectorAll('.benefit-card');
benefitCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 4px 16px rgba(78,176,249,0.15)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 2px 8px rgba(78,176,249,0.07)';
    });
});

// Add scroll reveal animation
const revealElements = document.querySelectorAll('.service-card-main, .why-choose-card, .criteria-card, .benefit-card, .testimonial-card');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for reveal elements
revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
});

// Add scroll event listener
window.addEventListener('scroll', revealOnScroll);
// Initial check for elements in view
revealOnScroll();