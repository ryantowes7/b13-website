// JavaScript for B13 Factory Website
console.log('B13 Factory Website Loaded Successfully!');

document.addEventListener('DOMContentLoaded', function() {
    console.log('Website ready!');
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    navLinksItems.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });
    
    // Product slider functionality (if exists)
    const productSliders = document.querySelectorAll('.product-slider');
    if (productSliders.length > 0) {
        productSliders.forEach(slider => {
            initProductSlider(slider);
        });
    }
});

// Function to initialize product sliders
function initProductSlider(slider) {
    const slides = slider.querySelectorAll('.slide');
    let currentSlide = 0;
    
    if (slides.length <= 1) return;
    
    // Show first slide
    slides[0].classList.add('active');
    
    // Auto-rotate slides
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 5000);
}