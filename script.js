document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const pageSections = document.querySelectorAll('.page-section');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('header nav');

    // --- Navigation ---
    function showPage(targetId) {
        pageSections.forEach(section => {
            section.classList.remove('active');
            if (section.id === targetId) {
                section.classList.add('active');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.target === targetId) {
                link.classList.add('active');
            }
        });
        window.scrollTo(0, 0); // Scroll to top of page
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.currentTarget.dataset.target;
            showPage(targetId);
            if (nav.classList.contains('active')) { // Close mobile menu on link click
                nav.classList.remove('active');
            }
        });
    });

    // Initial page load (show home)
    showPage('home');

    // Mobile menu toggle
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }
    
    // Make "Contact Us" buttons in hero/about sections navigate to contact page
    document.querySelectorAll('.contact-us-hero, .contact-us-generic').forEach(button => {
        button.addEventListener('click', () => {
            showPage('contact');
        });
    });


    // --- Home Hero Slider ---
    const heroSlides = document.querySelectorAll('#home .hero-slide');
    let currentHeroSlide = 0;
    if (heroSlides.length > 0) {
        function showHeroSlide(index) {
            heroSlides.forEach((slide, i) => {
                slide.classList.remove('active-slide');
                if (i === index) {
                    slide.classList.add('active-slide');
                }
            });
        }
        function nextHeroSlide() {
            currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
            showHeroSlide(currentHeroSlide);
        }
        showHeroSlide(currentHeroSlide); // Show first slide
        setInterval(nextHeroSlide, 5000); // Change slide every 5 seconds
    }

    // --- Experience Testimonial Slider ---
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const prevTestimonialBtn = document.querySelector('.prev-testimonial');
    const nextTestimonialBtn = document.querySelector('.next-testimonial');
    let currentTestimonial = 0;

    if (testimonialItems.length > 0) {
        function showTestimonial(index) {
            testimonialItems.forEach((item, i) => {
                item.classList.remove('active');
                if (i === index) {
                    item.classList.add('active');
                }
            });
        }

        if (prevTestimonialBtn && nextTestimonialBtn) {
            prevTestimonialBtn.addEventListener('click', () => {
                currentTestimonial = (currentTestimonial - 1 + testimonialItems.length) % testimonialItems.length;
                showTestimonial(currentTestimonial);
            });

            nextTestimonialBtn.addEventListener('click', () => {
                currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
                showTestimonial(currentTestimonial);
            });
        }
        showTestimonial(currentTestimonial); // Show first testimonial
    }

    // --- Contact Form ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Basic validation example (can be expanded)
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            const notARobot = document.getElementById('not-a-robot').checked;

            if (name && email && message && notARobot) {
                alert('Thank you for your message! (This is a demo)');
                contactForm.reset();
            } else {
                alert('Please fill in all required fields and confirm you are not a robot.');
            }
        });
    }
});