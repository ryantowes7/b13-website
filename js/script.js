// Simple JavaScript for basic functionality
console.log('B13 Factory Website Loaded Successfully!');

// Mobile menu toggle (will be added later)
document.addEventListener('DOMContentLoaded', function() {
    console.log('Website ready!');
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});