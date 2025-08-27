// JavaScript for B13 Factory Website
console.log('B13 Factory Website Loaded Successfully!');

document.addEventListener('DOMContentLoaded', function() {
    console.log('Website ready!');
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (menuToggle && navLinks) {
        // Toggle menu
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            if (navLinks.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on a link
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                body.style.overflow = '';
            }
        });
        
        // Prevent closing when clicking inside menu
        navLinks.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    navLinksItems.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Handle browser resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            body.style.overflow = '';
        }
    });
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

function toggleBodyScroll(enable) {
    if (enable) {
        document.body.classList.remove('menu-open');
    } else {
        document.body.classList.add('menu-open');
    }
}

// Update the menu toggle event
if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
        const isOpening = !navLinks.classList.contains('active');
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        toggleBodyScroll(!isOpening);
    });
    
    // Close menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            toggleBodyScroll(true);
        });
    });
}