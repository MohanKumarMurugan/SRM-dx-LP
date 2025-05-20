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