document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.innerHTML = navLinks.classList.contains('active') ? '&times;' : '&#9776;';
        });
    }

    // Smooth Scroll for local links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.innerHTML = '&#9776;';
                }
            }
        });
    });

    // Contact Form Handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Basic Validation Check
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;

            if (name && phone) {
                alert(`Thank you, ${name}! We have received your message and will call you at ${phone} shortly.`);
                contactForm.reset();
            } else {
                alert('Please fill in the required fields.');
            }
        });
    }

    // Review Form Handler
    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('review-name').value;
            const review = document.getElementById('review-text').value;

            if (name && review) {
                alert(`Thank you, ${name}! Your review has been submitted for moderation. We appreciate your feedback.`);
                reviewForm.reset();
            }
        });
    }

    // Scroll Animation (Fade in on scroll)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });
});
