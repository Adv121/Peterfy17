// Load Google Fonts dynamically (only after cookie consent)
const loadGoogleFonts = () => {
    if (document.querySelector('link[data-fonts]')) return;
    const preconnect1 = document.createElement('link');
    preconnect1.rel = 'preconnect';
    preconnect1.href = 'https://fonts.googleapis.com';
    document.head.appendChild(preconnect1);
    const preconnect2 = document.createElement('link');
    preconnect2.rel = 'preconnect';
    preconnect2.href = 'https://fonts.gstatic.com';
    preconnect2.crossOrigin = 'anonymous';
    document.head.appendChild(preconnect2);
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap';
    fontLink.setAttribute('data-fonts', '');
    document.head.appendChild(fontLink);
};

// If consent was already given in a previous visit, load fonts immediately
if (localStorage.getItem('cookieConsent') === 'accepted') {
    loadGoogleFonts();
}

// Cookie consent banner
const initCookieConsent = () => {
    if (localStorage.getItem('cookieConsent') !== null) return;

    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.innerHTML = `
        <div class="cookie-content">
            <p>Weboldalunk a Google Fonts szolgáltatást használja a betűtípusok megjelenítéséhez, amely során az Ön IP-címe átkerülhet a Google szervereire. Részletek: <a href="http://www.peterfy17rendelo.hu/legal/sutikezelesi-tajekoztato.html">Sütikezelési tájékoztató</a>.</p>
            <div class="cookie-buttons">
                <button id="cookie-accept" class="btn">Elfogadom</button>
                <button id="cookie-decline" class="cookie-decline-btn">Elutasítom</button>
            </div>
        </div>
    `;
    document.body.appendChild(banner);

    document.getElementById('cookie-accept').addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        loadGoogleFonts();
        banner.remove();
    });

    document.getElementById('cookie-decline').addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        banner.remove();
    });
};

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

    // Touch swipe support
    const heroEl = document.querySelector('.hero');
    let touchStartX = 0;

    heroEl.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    heroEl.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) {
            diff > 0 ? nextSlide() : prevSlide();
        }
    }, { passive: true });
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
        const cardWidth = itemsPerView === 1
            ? carousel.clientWidth
            : (grid.offsetWidth - gap * (itemsPerView - 1)) / itemsPerView;
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

    // Touch swipe support
    let touchStartX = 0;
    carousel.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
    carousel.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) { diff > 0 ? nextColleagues() : prevColleagues(); }
    }, { passive: true });

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
        const cardWidth = itemsPerView === 1
            ? carousel.clientWidth
            : (grid.offsetWidth - gap * (itemsPerView - 1)) / itemsPerView;
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

    // Touch swipe support
    let touchStartX = 0;
    carousel.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
    carousel.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) { diff > 0 ? nextNews() : prevNews(); }
    }, { passive: true });

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
        const gap = itemsPerView === 1 ? 0 : 40;
        const cardWidth = itemsPerView === 1
            ? carousel.clientWidth
            : (gallery.offsetWidth - gap * (itemsPerView - 1)) / itemsPerView;
        const translateValue = -currentPosition * (cardWidth + gap);
        gallery.style.transform = `translateX(${translateValue}px)`;
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

    // Touch swipe support
    let touchStartX = 0;
    carousel.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
    carousel.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) { diff > 0 ? nextOffice() : prevOffice(); }
    }, { passive: true });

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
            "title": "Laboratóriumi szolgáltatási csomagok elérhetőek",
            "summary": "2025. július 22.-től elérhetőek rendelőnkben az új laboratóriumi szolgáltatási csomagok: ANAEMIA, DIABETES KISRUTIN, DIABETES RUTIN, VESERUTIN és további speciális laborvizsgálatok. Mintavétel keddenként 8-10 óra között, előzetes bejelentkezéssel.",
            "link": "news/laboratorium-szolgaltatasok.html"
        },
        {
            "title": "24 órás vérnyomás monitor elérhető rendelőnkben",
            "summary": "2025. július 1-től elérhető a 24 órás vérnyomás monitor (ABPM) rendelőnkben! Az ambuláns vérnyomásmonitorozás pontosabb képet ad a vérnyomás alakulásáról a mindennapi élet során, segítve a rejtett magas vérnyomás felismerését és a kezelés hatékonyságának ellenőrzését.",
            "link": "news/24-oras-vernyomas-monitor.html"
        },
        {
            "title": "Folyamatos vércukorkontroll tűszúrás nélkül",
            "summary": "A Péterfy17 Magánrendelőben elérhetővé vált a szöveti glükóz monitor. A bőr alá helyezett apró szenzor valós idejű adatokat szolgáltat, így lehetővé teszi a vércukorszint alakulásának pontos követését, a kilengések korai felismerését és a kezelés hatékonyabb beállítását.",
            "link": "news/folyamatos-glukoz-kontroll.html"
        },
        {
            "title": "Hogyan juthat szöveti glükóz monitorhoz?",
            "summary": "Tájékoztató a CareSens Air szöveti glükóz monitor – egy magyar gyártású innovatív eszköz – beszerzéséről, beállításáról és a rendelői segítségről. Az eszköz Dr. Ladányi Ágnes rendelőjén keresztül vagy közvetlenül a gyártótól szerezhető be.",
            "link": "news/szoveti-glukoz-monitor-hozzaferes.html"
        },
        {
            "title": "Péterfy17 Magánrendelő megnyitása",
            "summary": "2024 szeptemberében megnyitotta kapuit a Péterfy17 Magánrendelő Budapest szívében. Büszkék vagyunk, hogy pácienseink számára elérhetővé vált egy új, személyre szabott magánellátási lehetőség.",
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
            <h3>${item.title}</h3>
            <p>${item.summary}</p>
        `;

        newsGrid.appendChild(newsElement);
    });
};

// Shuffle colleague cards into a random order on each page load
const shuffleColleagues = () => {
    const grid = document.querySelector('.colleagues-grid');
    if (!grid) return;
    const cards = Array.from(grid.children);
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        grid.appendChild(cards[j]);
        cards.splice(j, 1);
    }
};

// Observe all cards
document.addEventListener('DOMContentLoaded', async () => {
    // Load news from JSON file
    await loadNews();

    // Initialize hero carousel
    initHeroCarousel();

    // Randomise colleague order before initialising carousel
    shuffleColleagues();

    // Initialize colleagues carousel
    initColleaguesCarousel();

    // Initialize news carousel
    initNewsCarousel();

    // Initialize office gallery carousel
    initOfficeCarousel();

    // Initialize mobile menu
    initMobileMenu();

    // Show cookie consent banner if not yet decided
    initCookieConsent();

    const cards = document.querySelectorAll('.service-card, .price-item, .news-card, .colleague-card, .gallery-item');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

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

