// Sacred Hands Massage Therapy - JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // JotForm Integration
    const jotformLink = document.getElementById('jotform-link');
    if (jotformLink) {
        jotformLink.addEventListener('click', function(e) {
            e.preventDefault();
            // Replace 'YOUR_JOTFORM_ID' with your actual JotForm form ID
            // Example: https://form.jotform.com/123456789
            const jotformUrl = 'https://form.jotform.com/251873720824056';
            
            // Option 1: Open in new tab
            if (!jotformUrl.includes('https://form.jotform.com/251873720824056')) {
                window.open(jotformUrl, '_blank');
            } else {
                // Show instructions if JotForm not set up yet
                alert('JotForm integration ready! Please replace YOUR_JOTFORM_ID in script.js with your actual JotForm form ID.');
            }
        });
    }

    // Quick contact form submission
    const quickContactForm = document.getElementById('quick-contact-form');
    if (quickContactForm) {
        quickContactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            // Create mailto link with form data
            const emailBody = `Name: ${name}%0D%0APhone: ${phone}%0D%0AMessage: ${message}`;
            const mailtoLink = `mailto:mike@starktechstudios.com?subject=Massage Appointment Request&body=${emailBody}`;
            
            window.location.href = mailtoLink;
        });
    }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 1s ease-out';
            }
        });
    }, observerOptions);

    // Observe all service cards and testimonial cards
    document.querySelectorAll('.service-card, .testimonial-card, .about-content').forEach(el => {
        observer.observe(el);
    });

    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove shadow based on scroll position
        if (scrollTop > 100) {
            header.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
        }
        
        lastScrollTop = scrollTop;
    });

    // Mobile menu toggle (for future enhancement)
    function createMobileMenu() {
        const nav = document.querySelector('nav');
        const navLinks = document.querySelector('.nav-links');
        
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.style.cssText = `
            display: none;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
        `;
        
        // Add mobile styles
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .mobile-menu-btn {
                    display: block !important;
                }
                .nav-links {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 100%;
                    background: var(--primary-color);
                    flex-direction: column;
                    padding: 1rem;
                    transform: translateY(-100%);
                    opacity: 0;
                    transition: all 0.3s ease;
                    pointer-events: none;
                }
                .nav-links.active {
                    transform: translateY(0);
                    opacity: 1;
                    pointer-events: all;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Insert mobile menu button
        nav.insertBefore(mobileMenuBtn, navLinks);
        
        // Mobile menu toggle functionality
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });
    }
    
    // Initialize mobile menu
    createMobileMenu();

    // Form validation enhancement
    function enhanceFormValidation() {
        const form = document.getElementById('quick-contact-form');
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Add real-time validation
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                // Remove error styling on input
                this.style.borderLeft = '';
                const errorMsg = this.parentNode.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.remove();
                }
            });
        });
        
        function validateField(field) {
            let isValid = true;
            let errorMessage = '';
            
            // Remove existing error message
            const existingError = field.parentNode.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            // Validate based on field type
            if (field.hasAttribute('required') && !field.value.trim()) {
                isValid = false;
                errorMessage = 'This field is required';
            } else if (field.type === 'tel' && field.value) {
                const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                if (!phoneRegex.test(field.value.replace(/\D/g, ''))) {
                    isValid = false;
                    errorMessage = 'Please enter a valid phone number';
                }
            }
            
            // Apply validation styling
            if (!isValid) {
                field.style.borderLeft = '3px solid #e53e3e';
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-message';
                errorDiv.style.cssText = 'color: #e53e3e; font-size: 0.875rem; margin-top: 0.25rem;';
                errorDiv.textContent = errorMessage;
                field.parentNode.appendChild(errorDiv);
            } else {
                field.style.borderLeft = '3px solid var(--accent-color)';
            }
            
            return isValid;
        }
    }
    
    // Initialize form validation
    enhanceFormValidation();

    // Scroll-to-top functionality
    function addScrollToTop() {
        const scrollBtn = document.createElement('div');
        scrollBtn.innerHTML = '↑';
        scrollBtn.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 30px;
            background: var(--secondary-color);
            color: white;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            font-weight: bold;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
            box-shadow: var(--shadow-lg);
        `;
        
        document.body.appendChild(scrollBtn);
        
        // Show/hide scroll button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollBtn.style.opacity = '1';
                scrollBtn.style.visibility = 'visible';
            } else {
                scrollBtn.style.opacity = '0';
                scrollBtn.style.visibility = 'hidden';
            }
        });
        
        // Scroll to top when clicked
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Hover effect
        scrollBtn.addEventListener('mouseenter', function() {
            this.style.background = 'var(--primary-color)';
            this.style.transform = 'scale(1.1)';
        });
        
        scrollBtn.addEventListener('mouseleave', function() {
            this.style.background = 'var(--secondary-color)';
            this.style.transform = 'scale(1)';
        });
    }
    
    // Initialize scroll to top
    addScrollToTop();

    // Loading animation for service cards
    function animateServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach((card, index) => {
            // Add initial hidden state
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            // Animate in sequence when in view
            const cardObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.transition = 'all 0.6s ease';
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 150); // Stagger animation
                        
                        cardObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            cardObserver.observe(card);
        });
    }
    
    // Initialize service card animations
    animateServiceCards();

    // Console log for development
    console.log('Sacred Hands website loaded successfully!');
    console.log('Don\'t forget to:');
    console.log('1. Replace YOUR_JOTFORM_ID with your actual JotForm ID');
    console.log('2. Add your professional photos');
    console.log('3. Update testimonials with real client reviews');
    console.log('4. Test all forms and links');
    
});
