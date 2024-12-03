// Navigation
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });

    // Scroll-based animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .about-content, .contact-container').forEach((el) => {
        observer.observe(el);
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other open items
            const currentlyActive = document.querySelector('.faq-item.active');
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});

// Form handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const submitButton = document.getElementById('submit-button');
    const successMessage = document.getElementById('form-success');
    const errorMessage = document.getElementById('form-error');
    const inputs = form.querySelectorAll('input, textarea');

    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            validateInput(input);
            updateSubmitButton();
        });

        input.addEventListener('blur', function() {
            validateInput(input);
            updateSubmitButton();
        });
    });

    function validateInput(input) {
        const errorElement = document.getElementById(`${input.id}-error`);
        
        if (input.validity.valid) {
            errorElement.textContent = '';
            input.classList.remove('invalid');
            input.classList.add('valid');
        } else {
            errorElement.textContent = input.title;
            input.classList.remove('valid');
            input.classList.add('invalid');
        }
    }

    function updateSubmitButton() {
        submitButton.disabled = !form.checkValidity();
    }

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!form.checkValidity()) {
            return;
        }

        // Show loading state
        submitButton.classList.add('loading');
        submitButton.disabled = true;

        // Submit form using Formspree
        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                // Show success message
                form.reset();
                form.style.display = 'none';
                successMessage.style.display = 'block';
                errorMessage.style.display = 'none';

                // Reset form after 5 seconds
                setTimeout(() => {
                    form.style.display = 'block';
                    successMessage.style.display = 'none';
                }, 5000);
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            // Show error message
            errorMessage.style.display = 'block';
            successMessage.style.display = 'none';
        })
        .finally(() => {
            // Remove loading state
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
        });
    });
});

// Scroll-based header
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});
