// ========== NAVBAR SCROLL EFFECT ==========
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ========== HERO SLIDER ==========
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('sliderPrev');
const nextBtn = document.getElementById('sliderNext');
let currentSlide = 0;
let slideInterval;

function goToSlide(index) {
  if (slides[currentSlide]) slides[currentSlide].classList.remove('active');
  if (dots[currentSlide]) dots[currentSlide].classList.remove('active');
  currentSlide = (index + slides.length) % slides.length;
  if (slides[currentSlide]) slides[currentSlide].classList.add('active');
  if (dots[currentSlide]) dots[currentSlide].classList.add('active');
}

function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }

function startAutoSlide() {
  slideInterval = setInterval(nextSlide, 5000);
}

function resetAutoSlide() {
  clearInterval(slideInterval);
  startAutoSlide();
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });
  nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => { goToSlide(i); resetAutoSlide(); });
});

startAutoSlide();

// ========== SLIDERS COMMON LOGIC ==========
function setupHorizontalSlider(prevBtnClass, nextBtnClass, sliderClass, scrollAmount) {
  const prevBtns = document.querySelectorAll(`.${prevBtnClass}`);
  const nextBtns = document.querySelectorAll(`.${nextBtnClass}`);

  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const slider = btn.parentElement.querySelector(`.${sliderClass}`);
      slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  });

  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const slider = btn.parentElement.querySelector(`.${sliderClass}`);
      slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  });
}

setupHorizontalSlider('ps-prev', 'ps-next', 'product-slider', 320);
setupHorizontalSlider('rs-prev', 'rs-next', 'reviews-slider', 350);

// ========== MOBILE SIDEBAR ==========
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileSidebar = document.getElementById('mobileSidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const closeSidebarBtn = document.getElementById('closeSidebar');

function openSidebar() {
  mobileSidebar.classList.add('active');
  sidebarOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  showPanel('mainPanel');
}

function closeSidebarMenu() {
  mobileSidebar.classList.remove('active');
  sidebarOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

function showPanel(panelId) {
  document.querySelectorAll('.sidebar-panel').forEach(p => p.classList.remove('active'));
  const panel = document.getElementById(panelId);
  if (panel) panel.classList.add('active');
}

if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openSidebar);
if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebarMenu);
if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebarMenu);

document.querySelectorAll('.trigger-panel').forEach(trigger => {
  trigger.addEventListener('click', () => showPanel(trigger.getAttribute('data-target')));
});

document.querySelectorAll('.back-header').forEach(back => {
  back.addEventListener('click', () => showPanel(back.getAttribute('data-back')));
});

// ========== SCROLL REVEAL ==========
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll(
    '.section-header, .category-card, .product-card, .split-banner, .testimonial-card'
  ).forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
});
