// Hero Carousel - Manual slide navigation
const initHeroCarousel = () => {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    if (slides.length <= 1) return;

    let currentSlide = 0;
    const totalSlides = slides.length;

    const showSlide = (index) => {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
        });
        dots.forEach((dot, i) => {
            dot.classList.remove('active');
        });

        slides[index].classList.add('active');
        dots[index].classList.add('active');
    };

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    };

    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    };

    const goToSlide = (index) => {
        currentSlide = index;
        showSlide(currentSlide);
    };

    // Add button listeners
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Add dot listeners
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
};

// Colleagues Carousel - Scroll 3 colleagues at a time
const initColleaguesCarousel = () => {
    const carousel = document.querySelector('.colleagues-carousel');
    const grid = document.querySelector('.colleagues-grid');
    const prevBtn = document.querySelector('.colleagues-carousel-prev');
    const nextBtn = document.querySelector('.colleagues-carousel-next');
    
    if (!carousel || !grid) return;

    const colleagueCards = document.querySelectorAll('.colleague-card');
    const cardWidth = 100 / 3; // Each card takes 33.333%
    let currentPosition = 0;
    const itemsPerScroll = 3;
    const totalItems = colleagueCards.length;
    const maxPosition = totalItems - itemsPerScroll;

    const updateCarousel = () => {
        const translateValue = -currentPosition * (cardWidth + 3.33); // 40px gap adjusted
        grid.style.transform = `translateX(${translateValue}%)`;
    };

    const nextColleagues = () => {
        if (currentPosition < maxPosition) {
            currentPosition++;
            updateCarousel();
        }
    };

    const prevColleagues = () => {
        if (currentPosition > 0) {
            currentPosition--;
            updateCarousel();
        }
    };

    if (prevBtn) prevBtn.addEventListener('click', prevColleagues);
    if (nextBtn) nextBtn.addEventListener('click', nextColleagues);
};

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation highlighting on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add animation on scroll for cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.addEventListener('DOMContentLoaded', () => {
    // Initialize hero carousel
    initHeroCarousel();
    
    // Initialize colleagues carousel
    initColleaguesCarousel();

    const cards = document.querySelectorAll('.service-card, .price-item, .news-card, .colleague-card, .gallery-item');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Mobile menu toggle (if needed in the future)
const createMobileMenu = () => {
    const nav = document.querySelector('nav');
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-toggle';
    menuButton.innerHTML = '☰';
    menuButton.style.display = 'none';

    if (window.innerWidth <= 768) {
        menuButton.style.display = 'block';
        document.querySelector('header .container').insertBefore(menuButton, nav);

        menuButton.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }
};

// Handle responsive behavior
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        const nav = document.querySelector('nav');
        nav.classList.remove('active');
    }
});
