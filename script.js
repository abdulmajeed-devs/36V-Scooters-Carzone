// ====================================
// Navigation Menu Toggle
// ====================================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking on a nav link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);

            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
});

// ====================================
// Contact Form Handling
// ====================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const category = document.getElementById('category').value;
        const message = document.getElementById('message').value;

        // Simple validation
        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission
        // In a real application, you would send this data to a server
        console.log('Form Data:', {
            name,
            email,
            subject,
            category,
            message
        });

        // Show success message
        showFormMessage('Thank you for your message! We will get back to you within 24-48 hours.', 'success');

        // Reset form
        contactForm.reset();
    });
}

function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// ====================================
// Smooth Scroll for Anchor Links
// ====================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Only prevent default if it's not just "#"
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ====================================
// Scroll to Top Button
// ====================================
function createScrollToTopButton() {
    // Create button element
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.setAttribute('id', 'scrollToTop');
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #4a90e2;
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        display: none;
        z-index: 999;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
    `;

    // Add button to body
    document.body.appendChild(scrollBtn);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });

    // Scroll to top when clicked
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add hover effect
    scrollBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#357abd';
        this.style.transform = 'scale(1.1)';
    });

    scrollBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#4a90e2';
        this.style.transform = 'scale(1)';
    });
}

// Initialize scroll to top button
createScrollToTopButton();

// ====================================
// Reading Progress Bar
// ====================================
function createReadingProgressBar() {
    // Only create on article pages
    if (document.querySelector('.article-body') || document.querySelector('.article-content')) {
        const progressBar = document.createElement('div');
        progressBar.setAttribute('id', 'readingProgress');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #4a90e2, #28a745);
            z-index: 1001;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', function() {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrolled = window.pageYOffset;
            const progress = (scrolled / documentHeight) * 100;
            
            progressBar.style.width = progress + '%';
        });
    }
}

// Initialize reading progress bar
createReadingProgressBar();

// ====================================
// Lazy Loading Images
// ====================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('fade-in');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// ====================================
// Print Button Functionality
// ====================================
function addPrintButton() {
    // Add print button to article pages
    const articleFooter = document.querySelector('.article-footer');
    if (articleFooter) {
        const printBtn = document.createElement('button');
        printBtn.textContent = '🖨️ Print Article';
        printBtn.className = 'btn btn-secondary';
        printBtn.style.cursor = 'pointer';
        
        printBtn.addEventListener('click', function() {
            window.print();
        });
        
        articleFooter.appendChild(printBtn);
    }
}

// Initialize print button
addPrintButton();

// ====================================
// External Links - Open in New Tab
// ====================================
document.querySelectorAll('a[href^="http"]').forEach(link => {
    // Check if it's an external link
    if (link.hostname !== window.location.hostname) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    }
});

// ====================================
// Form Input Animations
// ====================================
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
        this.parentElement.style.transition = 'transform 0.3s ease';
    });

    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

// ====================================
// Copy to Clipboard Functionality
// ====================================
function addCopyButtons() {
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(block => {
        const button = document.createElement('button');
        button.textContent = 'Copy';
        button.className = 'copy-btn';
        button.style.cssText = `
            position: absolute;
            top: 5px;
            right: 5px;
            padding: 5px 10px;
            background-color: #4a90e2;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            font-size: 12px;
        `;

        const pre = block.parentElement;
        pre.style.position = 'relative';
        pre.appendChild(button);

        button.addEventListener('click', function() {
            const text = block.textContent;
            navigator.clipboard.writeText(text).then(() => {
                button.textContent = 'Copied!';
                setTimeout(() => {
                    button.textContent = 'Copy';
                }, 2000);
            });
        });
    });
}

// Initialize copy buttons
addCopyButtons();

// ====================================
// Dark Mode Toggle (Optional Feature)
// ====================================
function initDarkMode() {
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

// Initialize dark mode
initDarkMode();

// ====================================
// Analytics Event Tracking (Placeholder)
// ====================================
function trackEvent(category, action, label) {
    // This is a placeholder for analytics tracking
    // Replace with your actual analytics implementation (Google Analytics, etc.)
    console.log('Event Tracked:', { category, action, label });
}

// Track button clicks
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        trackEvent('Button', 'Click', buttonText);
    });
});

// Track external link clicks
document.querySelectorAll('a[rel="nofollow"]').forEach(link => {
    link.addEventListener('click', function() {
        trackEvent('External Link', 'Click', this.href);
    });
});

// ====================================
// Performance Optimization
// ====================================
// Defer non-critical JavaScript
window.addEventListener('load', function() {
    // Add any non-critical functionality here
    console.log('Page fully loaded - All resources loaded');
});

// ====================================
// Console Welcome Message
// ====================================
console.log('%c Welcome to Carzone Scooters! ', 'background: #4a90e2; color: white; font-size: 16px; padding: 10px;');
console.log('%c Exploring electric scooter technology and reviews ', 'color: #28a745; font-size: 12px;');