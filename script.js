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