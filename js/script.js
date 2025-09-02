// js/script.js
console.log("B13 Factory Website Loaded Successfully!");

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");
    
    // Initialize mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            console.log("Mobile menu toggled");
        });
    } else {
        console.warn("Menu toggle elements not found");
    }

    // Close mobile menu when clicking on links
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (menuToggle) {
                    menuToggle.classList.remove('active');
                }
                console.log("Mobile menu closed after link click");
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                console.log("Smooth scrolling to:", targetId);
            }
        });
    });

    // Product image hover effect
    const productImages = document.querySelectorAll('.product-image');
    productImages.forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        image.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Form validation
    const contactForms = document.querySelectorAll('form');
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = 'red';
                    isValid = false;
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (isValid) {
                console.log("Form submitted successfully");
                // Here you would typically send data to a server
                alert('Pesan terkirim! Kami akan menghubungi Anda segera.');
                this.reset();
            } else {
                alert('Silakan lengkapi semua field yang wajib diisi.');
            }
        });
    });

    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                    console.log("Lazy loaded image:", img.src);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Back to top button functionality
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });

        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Product filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');
    
    if (filterButtons.length > 0 && productItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filterValue = this.getAttribute('data-filter');
                
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                // Filter products
                productItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
                
                console.log("Products filtered by:", filterValue);
            });
        });
    }

    // Image slider functionality
    const initSliders = function() {
        const sliders = document.querySelectorAll('.slider');
        sliders.forEach(slider => {
            const slides = slider.querySelectorAll('.slide');
            const prevBtn = slider.querySelector('.prev-btn');
            const nextBtn = slider.querySelector('.next-btn');
            let currentSlide = 0;

            if (slides.length > 1 && prevBtn && nextBtn) {
                function showSlide(index) {
                    slides.forEach(slide => slide.classList.remove('active'));
                    slides[index].classList.add('active');
                }

                prevBtn.addEventListener('click', function() {
                    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                    showSlide(currentSlide);
                });

                nextBtn.addEventListener('click', function() {
                    currentSlide = (currentSlide + 1) % slides.length;
                    showSlide(currentSlide);
                });

                // Auto slide every 5 seconds
                setInterval(function() {
                    currentSlide = (currentSlide + 1) % slides.length;
                    showSlide(currentSlide);
                }, 5000);
            }
        });
    };

    initSliders();

    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in, .slide-in');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(element => {
            observer.observe(element);
        });
    };

    animateOnScroll();

    // Shopping cart functionality (if exists)
    const cartButtons = document.querySelectorAll('.add-to-cart');
    cartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            const productName = this.getAttribute('data-product-name');
            console.log("Product added to cart:", productName, productId);
            
            // Show confirmation
            this.innerHTML = '<i class="fas fa-check"></i> Ditambahkan';
            this.style.background = '#2ecc71';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-shopping-cart"></i> Tambah ke Keranjang';
                this.style.background = '';
            }, 2000);
        });
    });

    console.log("Website ready! All functionalities initialized.");
});

// Global function for menu toggle (if needed from HTML)
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.getElementById('menu-toggle');
    
    if (navLinks && menuToggle) {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        console.log("Menu toggled via global function");
    } else {
        console.warn("Menu elements not found for toggleMenu()");
    }
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Resize event handler with debouncing
window.addEventListener('resize', debounce(function() {
    console.log("Window resized to:", window.innerWidth, "x", window.innerHeight);
    
    // Close mobile menu on resize to desktop
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.getElementById('menu-toggle');
    
    if (window.innerWidth > 768 && navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        if (menuToggle) {
            menuToggle.classList.remove('active');
        }
        console.log("Mobile menu closed on resize");
    }
}, 250));

// Error handling for images
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        console.error("Image failed to load:", e.target.src);
        e.target.style.display = 'none';
    }
}, true);

// Export functions if needed for other scripts
window.B13 = window.B13 || {};
window.B13.utils = {
    toggleMenu: toggleMenu,
    debounce: debounce
};