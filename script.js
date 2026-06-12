// Load Google Fonts dynamically (only after consent)
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

// Load Google Maps iframe (only after consent)
const loadGoogleMaps = () => {
    const iframe = document.getElementById('google-map');
    const placeholder = document.getElementById('map-placeholder');
    if (iframe && iframe.getAttribute('data-src')) {
        iframe.src = iframe.getAttribute('data-src');
        iframe.style.removeProperty('display');
    }
    if (placeholder) placeholder.style.display = 'none';
};

// --- Consent storage helpers (GDPR Art. 7) ---
// Preferences stored as JSON: { fonts: bool, maps: bool }
// Legacy string values 'accepted'/'declined' are handled for backward compat.
const getConsentPrefs = () => {
    const raw = localStorage.getItem('cookieConsent');
    if (!raw) return null;
    if (raw === 'accepted') return { fonts: true, maps: true };
    if (raw === 'declined') return { fonts: false, maps: false };
    try { return JSON.parse(raw); } catch { return null; }
};

const saveConsentPrefs = (prefs) => {
    localStorage.setItem('cookieConsent', JSON.stringify(prefs));
};

const applyConsent = (prefs) => {
    if (!prefs) return;
    if (prefs.fonts) loadGoogleFonts();
    if (prefs.maps) loadGoogleMaps();
};

// Accept all — also called from the map placeholder button
const acceptConsent = () => {
    const prefs = { fonts: true, maps: true };
    saveConsentPrefs(prefs);
    applyConsent(prefs);
};

// Apply previously saved consent on page load
applyConsent(getConsentPrefs());

// Cookie consent banner
// Compliant with GDPR Art. 4(11), Art. 7, EDPB Cookie Banner Taskforce (2023),
// and NAIH equal-prominence requirement (no dark patterns).
const initCookieConsent = () => {
    if (getConsentPrefs() !== null) return;

    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-modal', 'true');
    banner.setAttribute('aria-label', 'Süti-beállítások');
    banner.innerHTML = `
        <div class="cookie-content">
            <div class="cookie-text-area">
                <p class="cookie-title">Süti-beállítások</p>
                <p class="cookie-desc">Weboldalunk <strong>Google Fonts</strong> és <strong>Google Maps</strong> külső szolgáltatásokat alkalmaz, amelyek az Ön IP-címét a Google szervereire továbbíthatják. Hozzájárulás nélkül ezek nem töltődnek be — a betűtípusok és a térkép helyett semleges helyőrzők jelennek meg. <a href="http://www.peterfy17rendelo.hu/legal/sutikezelesi-tajekoztato.html">Sütikezelési tájékoztató</a></p>
            </div>

            <div id="cookie-settings-panel" class="cookie-settings-panel" hidden>
                <div class="cookie-service-row">
                    <div class="cookie-service-info">
                        <span class="cookie-service-name">Szükséges működés</span>
                        <span class="cookie-service-desc">Hozzájárulási döntés tárolása (localStorage). Harmadik félnek nem továbbít adatot.</span>
                    </div>
                    <span class="cookie-always-on">Mindig aktív</span>
                </div>
                <div class="cookie-service-row">
                    <div class="cookie-service-info">
                        <span class="cookie-service-name">Google Fonts</span>
                        <span class="cookie-service-desc">Betűtípus-betöltés. IP-cím továbbítás a Google Ireland Ltd. szerverére.</span>
                    </div>
                    <label class="cookie-toggle-switch" aria-label="Google Fonts engedélyezése">
                        <input type="checkbox" id="consent-fonts" checked>
                        <span class="cookie-toggle-slider"></span>
                    </label>
                </div>
                <div class="cookie-service-row">
                    <div class="cookie-service-info">
                        <span class="cookie-service-name">Google Maps</span>
                        <span class="cookie-service-desc">Interaktív térkép. IP-cím és interakciók továbbítása a Google Ireland Ltd. szerverére.</span>
                    </div>
                    <label class="cookie-toggle-switch" aria-label="Google Maps engedélyezése">
                        <input type="checkbox" id="consent-maps" checked>
                        <span class="cookie-toggle-slider"></span>
                    </label>
                </div>
                <div class="cookie-save-row">
                    <button id="cookie-save-prefs" class="cookie-btn cookie-btn-save">Beállítások mentése</button>
                </div>
            </div>

            <div class="cookie-buttons">
                <button id="cookie-decline" class="cookie-btn cookie-btn-outline">Elutasítom</button>
                <button id="cookie-settings-toggle" class="cookie-btn cookie-btn-secondary">Beállítások</button>
                <button id="cookie-accept" class="cookie-btn cookie-btn-primary">Mindent elfogadok</button>
            </div>
        </div>
    `;
    document.body.appendChild(banner);

    const panel = document.getElementById('cookie-settings-panel');
    const toggleBtn = document.getElementById('cookie-settings-toggle');

    toggleBtn.addEventListener('click', () => {
        const opening = panel.hidden;
        panel.hidden = !opening;
        toggleBtn.textContent = opening ? 'Bezárás' : 'Beállítások';
    });

    document.getElementById('cookie-accept').addEventListener('click', () => {
        acceptConsent();
        banner.remove();
    });

    document.getElementById('cookie-decline').addEventListener('click', () => {
        saveConsentPrefs({ fonts: false, maps: false });
        banner.remove();
    });

    document.getElementById('cookie-save-prefs').addEventListener('click', () => {
        const prefs = {
            fonts: document.getElementById('consent-fonts').checked,
            maps: document.getElementById('consent-maps').checked,
        };
        saveConsentPrefs(prefs);
        applyConsent(prefs);
        banner.remove();
    });
};

// Inject "Sütik visszavonása" link into footer (GDPR Art. 7(3))
const initCookieWithdrawal = () => {
    const sutiLink = document.querySelector('a[href*="sutikezelesi-tajekoztato"]');
    if (!sutiLink) return;
    const li = sutiLink.closest('li');
    if (!li) return;
    const withdrawLi = document.createElement('li');
    withdrawLi.innerHTML = '<a href="#" class="cookie-withdraw-link">Sütik visszavonása</a>';
    li.after(withdrawLi);
    withdrawLi.querySelector('.cookie-withdraw-link').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('cookieConsent');
        location.reload();
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

// Feedback Carousel - Scroll feedback cards (responsive)
const initFeedbackCarousel = () => {
    const carousel = document.querySelector('.feedback-carousel');
    const grid = document.querySelector('.feedback-carousel .feedback-grid');
    const prevBtn = document.querySelector('.feedback-carousel-prev');
    const nextBtn = document.querySelector('.feedback-carousel-next');

    if (!carousel || !grid) return;

    const cards = document.querySelectorAll('.feedback-carousel .feedback-card');
    let currentPosition = 0;
    const totalItems = cards.length;

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

    const next = () => {
        const itemsPerView = getItemsPerView();
        const maxPosition = totalItems - itemsPerView;
        if (currentPosition < maxPosition) { currentPosition++; updateCarousel(); }
    };

    const prev = () => {
        if (currentPosition > 0) { currentPosition--; updateCarousel(); }
    };

    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);

    let touchStartX = 0;
    carousel.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
    carousel.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) { diff > 0 ? next() : prev(); }
    }, { passive: true });

    window.addEventListener('resize', () => {
        const itemsPerView = getItemsPerView();
        const maxPosition = totalItems - itemsPerView;
        if (currentPosition > maxPosition) currentPosition = Math.max(0, maxPosition);
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
            "title": "Túlsúly és elhízás korszerű kezelése – életmódtanácsadás és GLP-1 terápia",
            "summary": "Rendelőnkben elérhető a túlsúly és elhízás komplex, orvosi kezelése. Dr. Ladányi Ágnes belgyógyász egyénre szabott életmódprogrammal és korszerű GLP-1 alapú gyógyszeres terápiával segít a tartós testsúlycsökkentésben.",
            "link": "news/tulsuly-kezeles.html"
        },
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
    const all = Array.from(grid.children);
    const pinned = all.filter(c => c.querySelector('h3')?.textContent.includes('Körmöndi'));
    const cards = all.filter(c => !c.querySelector('h3')?.textContent.includes('Körmöndi'));
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        grid.appendChild(cards[j]);
        cards.splice(j, 1);
    }
    pinned.forEach(c => grid.appendChild(c));
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

    // Initialize feedback carousel
    initFeedbackCarousel();

    // Initialize office gallery carousel
    initOfficeCarousel();

    // Initialize mobile menu
    initMobileMenu();

    // Show cookie consent banner if not yet decided
    initCookieConsent();

    // Add withdrawal link to footer on every page
    initCookieWithdrawal();

    // Map placeholder: clicking the button grants consent and loads the map
    document.getElementById('map-load-btn')?.addEventListener('click', () => {
        acceptConsent();
    });

    // Cookie policy page withdrawal button
    document.getElementById('withdraw-consent-page-btn')?.addEventListener('click', () => {
        localStorage.removeItem('cookieConsent');
        location.reload();
    });

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

