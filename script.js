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

// Colleagues Carousel - Scroll 3 colleagues at a time (responsive)
const initColleaguesCarousel = () => {
    const carousel = document.querySelector('.colleagues-carousel');
    const grid = document.querySelector('.colleagues-grid');
    const prevBtn = document.querySelector('.colleagues-carousel-prev');
    const nextBtn = document.querySelector('.colleagues-carousel-next');

    if (!carousel || !grid) return;

    const colleagueCards = document.querySelectorAll('.colleague-card');
    let currentPosition = 0;
    const totalItems = colleagueCards.length;

    const getItemsPerView = () => {
        if (window.innerWidth <= 600) return 1;
        if (window.innerWidth <= 900) return 2;
        return 3;
    };

    const updateCarousel = () => {
        const itemsPerView = getItemsPerView();
        const gap = itemsPerView === 1 ? 0 : 40;
        const cardWidth = (grid.offsetWidth - gap * (itemsPerView - 1)) / itemsPerView;
        const translateValue = -currentPosition * (cardWidth + gap);
        grid.style.transform = `translateX(${translateValue}px)`;
    };

    const nextColleagues = () => {
        const itemsPerView = getItemsPerView();
        const maxPosition = totalItems - itemsPerView;
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

    // Reset position on window resize
    window.addEventListener('resize', () => {
        const itemsPerView = getItemsPerView();
        const maxPosition = totalItems - itemsPerView;
        if (currentPosition > maxPosition) {
            currentPosition = maxPosition;
        }
        updateCarousel();
    });
};

// News Carousel - Scroll 3 news items at a time (responsive)
const initNewsCarousel = () => {
    const carousel = document.querySelector('.news-carousel');
    const grid = document.querySelector('.news-carousel .news-grid');
    const prevBtn = document.querySelector('.news-carousel-prev');
    const nextBtn = document.querySelector('.news-carousel-next');

    if (!carousel || !grid) return;

    const newsCards = document.querySelectorAll('.news-carousel .news-card');
    let currentPosition = 0;
    const totalItems = newsCards.length;

    const getItemsPerView = () => {
        if (window.innerWidth <= 600) return 1;
        if (window.innerWidth <= 900) return 2;
        return 3;
    };

    const updateCarousel = () => {
        const itemsPerView = getItemsPerView();
        const gap = itemsPerView === 1 ? 0 : 40;
        const cardWidth = (grid.offsetWidth - gap * (itemsPerView - 1)) / itemsPerView;
        const translateValue = -currentPosition * (cardWidth + gap);
        grid.style.transform = `translateX(${translateValue}px)`;
    };

    const nextNews = () => {
        const itemsPerView = getItemsPerView();
        const maxPosition = totalItems - itemsPerView;
        if (currentPosition < maxPosition) {
            currentPosition++;
            updateCarousel();
        }
    };

    const prevNews = () => {
        if (currentPosition > 0) {
            currentPosition--;
            updateCarousel();
        }
    };

    if (prevBtn) prevBtn.addEventListener('click', prevNews);
    if (nextBtn) nextBtn.addEventListener('click', nextNews);

    // Reset position on window resize
    window.addEventListener('resize', () => {
        const itemsPerView = getItemsPerView();
        const maxPosition = totalItems - itemsPerView;
        if (currentPosition > maxPosition) {
            currentPosition = maxPosition;
        }
        updateCarousel();
    });
};

// Office Gallery Carousel - Scroll 3 images at a time (responsive)
const initOfficeCarousel = () => {
    const carousel = document.querySelector('.office-carousel');
    const gallery = document.querySelector('.office-carousel .office-gallery');
    const prevBtn = document.querySelector('.office-carousel-prev');
    const nextBtn = document.querySelector('.office-carousel-next');

    if (!carousel || !gallery) return;

    const galleryItems = document.querySelectorAll('.office-carousel .gallery-item');
    let currentPosition = 0;
    const totalItems = galleryItems.length;

    const getItemsPerView = () => {
        if (window.innerWidth <= 600) return 1;
        if (window.innerWidth <= 900) return 2;
        return 3;
    };

    const updateCarousel = () => {
        const itemsPerView = getItemsPerView();
        const cardWidth = 100 / itemsPerView;
        const translateValue = -currentPosition * (cardWidth + (itemsPerView === 1 ? 0 : 3.33));
        gallery.style.transform = `translateX(${translateValue}%)`;
    };

    const nextOffice = () => {
        const itemsPerView = getItemsPerView();
        const maxPosition = totalItems - itemsPerView;
        if (currentPosition < maxPosition) {
            currentPosition++;
            updateCarousel();
        }
    };

    const prevOffice = () => {
        if (currentPosition > 0) {
            currentPosition--;
            updateCarousel();
        }
    };

    if (prevBtn) prevBtn.addEventListener('click', prevOffice);
    if (nextBtn) nextBtn.addEventListener('click', nextOffice);

    // Reset position on window resize
    window.addEventListener('resize', () => {
        const itemsPerView = getItemsPerView();
        const maxPosition = totalItems - itemsPerView;
        if (currentPosition > maxPosition) {
            currentPosition = maxPosition;
        }
        updateCarousel();
    });
};

// Mobile Menu Toggle
const initMobileMenu = () => {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            const isOpen = nav.classList.contains('active');
            menuToggle.setAttribute('aria-label', isOpen ? 'Menü bezárása' : 'Menü megnyitása');
            menuToggle.innerHTML = isOpen ? '✕' : '☰';
        });

        // Close menu when clicking a link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    nav.classList.remove('active');
                    menuToggle.innerHTML = '☰';
                    menuToggle.setAttribute('aria-label', 'Menü megnyitása');
                }
            });
        });
    }
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

// News data - Update this array to change news items
// You can also edit data/news.json file when running on a web server
const newsData = {
    "news": [
        {
            "date": "2026. július 22.",
            "title": "Laboratóriumi szolgáltatási csomagok elérhetőek",
            "summary": "Július 22-től elérhetőek rendelőnkben az új laboratóriumi szolgáltatási csomagok: ANAEMIA, DIABETES KISRUTIN, DIABETES RUTIN, VESERUTIN és további speciális laborvizsgálatok. Mintavétel keddenként 8-10 óra között, előzetes bejelentkezéssel.",
            "link": "news/laboratorium-szolgaltatasok.html"
        },
        {
            "date": "2026. július 1.",
            "title": "24 órás vérnyomás monitor elérhető rendelőnkben",
            "summary": "Július 1-től elérhető a 24 órás vérnyomás monitor (ABPM) rendelőnkben! Az ambuláns vérnyomásmonitorozás pontosabb képet ad a vérnyomás alakulásáról a mindennapi élet során, segítve a rejtett magas vérnyomás felismerését és a kezelés hatékonyságának ellenőrzését.",
            "link": "news/24-oras-vernyomas-monitor.html"
        },
        {
            "date": "2024. november 19.",
            "title": "Hogyan tudok a folyamatosan mérő szöveti glükóz monitorhoz jutni?",
            "summary": "Ha Önt is érinti a cukorbetegség, vagy gyanítja az állapotot, ezt az innovatív szöveti glükóz monitorozó eszközt ajánljuk...",
            "link": "news/szoveti-glukoz-monitor-hozzaferes.html"
        },
        {
            "date": "2024. november 15.",
            "title": "Napi 4x-i tűszúrás helyett folyamatos szöveti glükózszint kontroll",
            "summary": "A kialakult cukorbetegség folyamatos monitorozást igényel. Dr. Ladányi Ágnes rendelője most már 24 órás folyamatos glükóz monitorokat kínál...",
            "link": "news/folyamatos-glukoz-kontroll.html"
        },
        {
            "date": "2024. szeptember 1.",
            "title": "Péterfy17 Magánrendelő megnyitása",
            "summary": "Több mint három évtizedes kórházi tapasztalattal nyitotta meg kapuit magánrendelőnk, ahol személyre szabott, alapos ellátást biztosítunk pácienseinknek.",
            "link": null
        }
    ]
};

// Load news from JSON file or fallback to embedded data
const loadNews = async () => {
    let data = newsData; // Fallback to embedded data

    try {
        // Try to fetch from JSON file (works on web servers)
        const response = await fetch('data/news.json');
        if (response.ok) {
            data = await response.json();
        }
    } catch (error) {
        // Fetch failed (likely opened as file://), use embedded data
        console.log('Using embedded news data (fetch not available)');
    }

    const newsGrid = document.querySelector('.news-carousel .news-grid');
    if (!newsGrid) return;

    // Clear existing news
    newsGrid.innerHTML = '';

    // Add news items
    data.news.forEach(item => {
        const newsElement = document.createElement(item.link ? 'a' : 'article');
        newsElement.className = item.link ? 'news-card news-link' : 'news-card';
        if (item.link) {
            newsElement.href = item.link;
        }

        newsElement.innerHTML = `
            <div class="news-date">${item.date}</div>
            <h3>${item.title}</h3>
            <p>${item.summary}</p>
        `;

        newsGrid.appendChild(newsElement);
    });
};

// Observe all cards
document.addEventListener('DOMContentLoaded', async () => {
    // Load news from JSON file
    await loadNews();

    // Initialize hero carousel
    initHeroCarousel();

    // Initialize colleagues carousel
    initColleaguesCarousel();

    // Initialize news carousel
    initNewsCarousel();

    // Initialize office gallery carousel
    initOfficeCarousel();

    // Initialize mobile menu
    initMobileMenu();

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
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        if (nav) {
            nav.classList.remove('active');
        }
        if (menuToggle) {
            menuToggle.innerHTML = '☰';
            menuToggle.setAttribute('aria-label', 'Menü megnyitása');
        }
    }
});

// ============================================
// SERVICE APPOINTMENT CAROUSEL
// ============================================

const initServiceAppointmentCarousel = () => {
    const container = document.querySelector('.service-appointment-carousel-container');
    if (!container) return;

    const track = container.querySelector('.service-appointment-track');
    const prevBtn = container.querySelector('.prev-appointment');
    const nextBtn = container.querySelector('.next-appointment');
    const slides = container.querySelectorAll('.appointment-slide');

    if (!track || slides.length === 0) return;

    let currentIndex = 0;

    const updateCarousel = () => {
        const translateX = -currentIndex * 100;
        track.style.transform = `translateX(${translateX}%)`;

        // Update button states
        if (prevBtn) {
            prevBtn.disabled = currentIndex === 0;
        }
        if (nextBtn) {
            nextBtn.disabled = currentIndex === slides.length - 1;
        }
    };

    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
    }

    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentIndex < slides.length - 1) {
                currentIndex++;
                updateCarousel();
            }
        });
    }

    // Keyboard navigation
    container.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        } else if (e.key === 'ArrowRight' && currentIndex < slides.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Initial state
    updateCarousel();
};

// Initialize service appointment carousel on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initServiceAppointmentCarousel);
} else {
    initServiceAppointmentCarousel();
}
