# Péterfy17 Magánrendelő – Website

## Project Overview
Website of **LADMED Kft.**, operating the Péterfy17 Magánrendelő in Budapest. The site is fully in Hungarian and uses a teal/turquoise brand colour scheme. It covers six team members across internal medicine, diabetology, nephrology, hypertensiology, endocrinology, dermatology, venereology, cosmetology, psychiatry, and nursing.

---

## File Structure
```
Website/
├── index.html                              # Main homepage
├── style.css                               # All styling and responsive design
├── script.js                               # Carousels, mobile menu, animations, news loader
├── CLAUDE.md                               # This file
├── photos/                                 # All images — all paths are lowercase on disk
│   ├── logo.png
│   ├── hero/
│   │   ├── consultation.jpg                # Hero slide 1
│   │   ├── consultation1.jpg               # Hero slide 2
│   │   └── consultation2.jpg               # Hero slide 3
│   ├── office/
│   │   ├── consultation.jpg
│   │   └── office1.jpg – office7.jpg
│   └── colleagues/                         # All JPG, lowercase filenames
│       ├── ladanyi_agnes.jpg
│       ├── kormondi_csilla.jpg
│       ├── szever_krisztina.jpg
│       ├── szekely_katalin.jpg
│       ├── nagy_maria_magdolna.jpg
│       └── wagensommer_timea.jpg
├── data/
│   └── news.json                           # News items (loaded dynamically; JS falls back to embedded data)
├── doctors/
│   ├── dr-ladanyi-agnes.html
│   ├── kormendi-csilla.html
│   ├── dr-szever-krisztina.html
│   ├── dr-szekely-katalin.html
│   ├── dr-nagy-maria-magdolna.html
│   └── wagensommer-timea.html
├── news/
│   ├── laboratorium-szolgaltatasok.html
│   ├── 24-oras-vernyomas-monitor.html
│   ├── folyamatos-glukoz-kontroll.html
│   └── szoveti-glukoz-monitor-hozzaferes.html
└── legal/
    ├── adatvedelmi-nyilatkozat.html
    ├── adatkezelesi-tajekoztato.html
    └── sutikezelesi-tajekoztato.html
```

> **Important for deployment**: All photo paths must be lowercase. The `photos/colleagues/` and `photos/office/` folders are lowercase on disk; HTML must match exactly or images will break on Linux.

---

## Design Specifications

### Colour Scheme
- **Primary**: `#2c9fa8` (Teal) — headings, links, buttons, borders
- **Primary Hover**: `#1a7a82` (Darker Teal)
- **Section Background**: `#f8f9fa` (Light Grey) — alternates with white
- **Text**: `#333` main, `#555`/`#666` secondary
- **Footer**: `#2c3e50` (Dark Blue-Grey)

### Typography
- **Font**: 'Open Sans', Arial, sans-serif (loaded from Google Fonts)
- **Weights**: 400 (body), 600–700 (headings)

### Responsive Breakpoints
| Breakpoint | Layout |
|---|---|
| 1200px+ | Full desktop layout |
| ≤1024px | Tablet — 2-column services grid, smaller nav |
| ≤900px | Tablet — stacked contact/map, carousel 2-up |
| ≤768px | Mobile — hamburger menu, full-width sections |
| ≤600px | Small phone — single-column carousels, hidden hero arrows |

---

## Main Page Sections (`index.html`)

1. **Header** — Sticky, with logo and nav. Mobile hamburger toggle at ≤768px.
2. **#fooldal (Hero)** — 3-slide image carousel with prev/next buttons and dot indicators. Auto-advance is NOT implemented; navigation is manual only.
3. **#szolgaltatasok (Services)** — 9 service cards in a responsive grid. 7 cards link to `services/` detail pages; 2 (Gyógyszeres kezelés, Orvosi leletek értelmezése) have no detail page yet.
4. **#ujdonsagok (News)** — News loaded from `data/news.json` via `fetch()`; falls back to embedded JS array if running as `file://`. Displayed in a scrollable carousel (3-up desktop, 2-up tablet, 1-up mobile).
5. **#munkatarsak (Colleagues)** — 6 colleague cards in a carousel, all linking to `doctors/` detail pages. Order is randomised on each page load by `shuffleColleagues()`.
6. **#idopontfoglalas (Appointments)** — Clinic-wide opening hours and contact details.
7. **#rendelo (Office Gallery)** — 8 office photos in a carousel.
8. **#kapcsolat (Contact)** — Address, phone, email, Google Maps embed.
9. **Footer** — Facebook link, quick links, legal links, contact details, copyright.

---

## Team & Doctor Pages (`doctors/`)

### Current Team Members
| Name | Role | Photo | Page |
|---|---|---|---|
| Dr. Ladányi Ágnes | Belgyógyász, diabetológus, nefrológus, hipertonológus | `photos/colleagues/ladanyi_agnes.jpg` | `doctors/dr-ladanyi-agnes.html` |
| Körmöndi Csilla | Nővér | `photos/colleagues/kormondi_csilla.jpg` | `doctors/kormendi-csilla.html` |
| Dr. Széver Krisztina | Bőrgyógyász, venerológus, kozmetológus | `photos/colleagues/szever_krisztina.jpg` | `doctors/dr-szever-krisztina.html` |
| Dr. Székely Katalin | Belgyógyász, endokrinológus főorvos | `photos/colleagues/szekely_katalin.jpg` | `doctors/dr-szekely-katalin.html` |
| Dr. Nagy Mária Magdolna | Pszichiáter, pszichoterapeuta, addiktológus | `photos/colleagues/nagy_maria_magdolna.jpg` | `doctors/dr-nagy-maria-magdolna.html` |
| Wagensommer Tímea | Nővér | `photos/colleagues/wagensommer_timea.jpg` | `doctors/wagensommer-timea.html` |

### Schedules
- **Dr. Ladányi Ágnes**: Kedd 15:00–19:00, Szerda 15:00–19:00
- **Dr. Széver Krisztina**: Csütörtök 14:00–19:00
- **Dr. Székely Katalin**: Egyéni megbeszélés alapján
- **Dr. Nagy Mária Magdolna**: Egyéni megbeszélés alapján

---

## Doctor Page Structure (Template)

Use `doctors/dr-ladanyi-agnes.html` as the canonical template. Every doctor page follows this exact structure.

### HTML `<head>`
```html
<title>Dr. Név - Szakterület</title>
<meta name="description" content="Dr. Név szakterület. Rövid leírás.">
<!-- OG and Twitter meta tags with same title/description -->
<meta property="og:image" content="http://www.peterfy17rendelo.hu/photos/hero/consultation.jpg">
<meta property="og:url" content="http://www.peterfy17rendelo.hu/doctors/dr-nev.html">
<!-- JSON-LD Physician structured data (see below) -->
```

### JSON-LD Structured Data
```json
{
    "@context": "https://schema.org",
    "@type": "Physician",
    "name": "Dr. Teljes Név",
    "jobTitle": "Szakterület magyarul",
    "image": "../photos/colleagues/fajlnev.jpg",
    "medicalSpecialty": ["EnglishSpecialty1", "EnglishSpecialty2"],
    "knowsLanguage": ["hu", "de"],
    "worksFor": {
        "@type": "MedicalBusiness",
        "name": "Péterfy17 Magánrendelő",
        "telephone": "+36705503989",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Péterfy Sándor utca 17., IV. emelet, 29. ajtó",
            "addressLocality": "Budapest",
            "postalCode": "1076",
            "addressCountry": "HU"
        }
    },
    "openingHoursSpecification": [
        {"@type": "OpeningHoursSpecification", "dayOfWeek": "Tuesday", "opens": "15:00", "closes": "19:00"}
    ]
}
```
- `knowsLanguage` only if languages other than Hungarian are spoken.
- `openingHoursSpecification` omit `opens`/`closes` if schedule is by appointment only.

### Navigation
```html
<nav>
    <ul>
        <li><a href="../index.html">Főoldal</a></li>
        <li><a href="#bemutatkozas">Bemutatkozás</a></li>
        <li><a href="#szolgaltatasok">Szolgáltatások</a></li>
        <li><a href="#arak">Árak</a></li>
        <li><a href="#rendeles-ido">Rendelési Idő</a></li>
    </ul>
</nav>
```
Omit `#arak` from nav only if the doctor has no pricing section (e.g. nursing staff).

### Hero Section
```html
<section class="hero doctor-hero">
    <div class="container">
        <div class="hero-content">
            <div class="hero-text">
                <h1>Dr. Teljes Név</h1>
                <p class="doctor-title">Szakterület</p>
                <a href="#rendeles-ido" class="btn">Időpontfoglalás</a>
            </div>
            <div class="hero-image">
                <img src="../photos/colleagues/fajlnev.jpg" alt="Dr. Teljes Név">
            </div>
        </div>
    </div>
</section>
```

### Section Background Alternation
| Section | Class |
|---|---|
| `#bemutatkozas` | `section` (white) |
| `#szolgaltatasok` | `section gray-bg` |
| `#arak` | `section` (white) |
| `#rendeles-ido` | `section` (white) |

### #bemutatkozas — Biography Section

**Writing style:**
- Written in **first person** ("végeztem", "dolgozom", "tartom fontosnak").
- Tone is professional, warm, and patient-focused — never cold or clinical.
- No "Tapasztalat:" subsection — experience is woven naturally into the narrative paragraphs.

**Content flow (3–4 paragraphs):**
1. Education and specialist certifications with years, followed by training institutions.
2. Career path: where they worked, what roles, notable experience (international, research, etc.).
3. Continuing education / commitment to staying current.
4. Personal professional philosophy — what they value, how they approach patient care.

**Subsections after the paragraphs:**
```html
<h4>Szakterületeim:</h4>
<ul>
    <li>Specialty area one</li>
    <li>Specialty area two</li>
</ul>

<h4>Képzettségeim:</h4>
<ul>
    <li><strong>1995</strong> – Diploma / certification description</li>
    <li><strong>2000</strong> – Next qualification</li>
    <li>Ongoing training note (no year tag)</li>
</ul>
```
- Years in `<strong>` tags.
- En-dash (`–`) between year and description, not a hyphen.
- Ongoing training or licence entries without a year go at the end without a `<strong>` tag.

**Full section wrapper:**
```html
<section id="bemutatkozas" class="section">
    <div class="container">
        <h2 class="section-title">Bemutatkozás</h2>
        <div class="content-wrapper">
            <div class="profile-content">
                <div class="bio">
                    <!-- paragraphs, Szakterületeim, Képzettségeim -->
                </div>
            </div>
        </div>
    </div>
</section>
```

### #szolgaltatasok — Services Grid

```html
<section id="szolgaltatasok" class="section gray-bg">
    <div class="container">
        <h2 class="section-title">Szakterület-specifikus cím pl. "Bőrgyógyászati szolgáltatások"</h2>
        <div class="doctor-services-grid">
            <div class="doctor-service-item">
                <h3>Service name</h3>
            </div>
            <!-- repeat for each service -->
        </div>
    </div>
</section>
```
- Each item contains **only an `<h3>` with the service name** — no description text.
- Typically 10–16 items per doctor.
- Section title names the specialty, e.g. "Belgyógyászati és endokrinológiai szolgáltatások", "Bőrgyógyászati szolgáltatások".

### #arak — Pricing Section

```html
<section id="arak" class="section">
    <div class="container">
        <h2 class="section-title">Árlista</h2>
        <div class="price-list">
            <div class="price-group">
                <h3>Csoport neve</h3>
                <!-- Optional group note: -->
                <p style="font-size: 0.875em; color: #666; font-style: italic; margin: -4px 0 16px;">Megjegyzés szövege.</p>
                <div class="price-row">
                    <span class="price-label">Szolgáltatás neve <span class="price-sub">Részletező megjegyzés</span></span>
                    <span class="price-amount">28 000 Ft</span>
                </div>
            </div>
        </div>
    </div>
</section>
```

**Price formatting rules:**
- Thousands separator is a **space**: `28 000 Ft`, not `28.000` or `28,000`.
- Ranges use an **en-dash with spaces**: `28 000 – 50 000 Ft`.
- Quantity tiers written as: `(2 / 5 / 8 db)` with spaces around slashes.
- `price-sub` is used for: method details, quantity ranges, time constraints, parenthetical notes.
- `price-sub` content always starts with an **uppercase initial letter**.
- Group-level notes (e.g. "A kezelési díj a vizsgálati díjon felül értendő.") go as an italic `<p>` immediately below the `<h3>`, before the first `price-row`.
- Unavailable/included items can use `—` as the amount.

**Dr. Széver Krisztina's price structure as reference example:**
- Group 1: "Vizsgálati díjak" — examination fees (7 items)
- Group 2: "Kezelési díjak" — treatment fees with group note (10 items)
- Group 3: "Sebkezelés és nyiroködéma kezelés" — wound/lymphoedema care (9 items)

### #rendeles-ido — Schedule & Appointment Section

```html
<section id="rendeles-ido" class="section">
    <div class="container">
        <h2 class="section-title">Rendelési Idő</h2>
        <div class="appointment-info">
            <div class="info-box">
                <h3>Dr. Név rendelési ideje</h3>
                <ul class="schedule">
                    <li><strong>Kedd:</strong> 15:00 – 19:00</li>
                    <li><strong>Szerda:</strong> 15:00 – 19:00</li>
                </ul>
            </div>
            <div class="contact-box">
                <h3>Időpontfoglalás</h3>
                <p>Kérem, előre egyeztetett időponttal keresse fel rendelésemet.</p>
                <div class="contact-methods">
                    <p><strong>Telefon:</strong> +36 70 550 3989</p>
                    <p><strong>E-mail:</strong> peterfy17rendelo@gmail.com</p>
                </div>
                <!-- Optional online booking button: -->
                <div style="text-align: center; margin-top: 16px;">
                    <a href="BOOKING_URL" target="_blank" rel="noopener noreferrer" class="btn">Online időpontfoglalás</a>
                </div>
            </div>
        </div>
    </div>
</section>
```
- If schedule is by appointment only, write: `<li><strong>Rendelési idő:</strong> Egyéni megbeszélés alapján</li>`
- Time ranges use en-dash: `15:00 – 19:00`
- Online booking button (centered) is optional — add when a direct booking URL exists.

### Footer (all doctor pages identical)
```html
<footer>
    <div class="container">
        <div class="footer-content">
            <div class="footer-section">
                <h3>Péterfy17 Magánrendelő</h3>
                <!-- Facebook SVG link -->
            </div>
            <div class="footer-section">
                <h4>Gyors linkek</h4>
                <ul>
                    <li><a href="../index.html#munkatarsak">Munkatársak</a></li>
                    <li><a href="../index.html#szolgaltatasok">Szolgáltatások</a></li>
                    <li><a href="../index.html#idopontfoglalas">Időpontfoglalás</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Jogi</h4>
                <ul>
                    <li><a href="../legal/adatvedelmi-nyilatkozat.html">Adatvédelmi nyilatkozat</a></li>
                    <li><a href="../adatkezelesi-tajekoztato.html">Adatkezelési tájékoztató</a></li>
                    <li><a href="../legal/sutikezelesi-tajekoztato.html">Sütikezelési tájékoztató</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Elérhetőség</h4>
                <p><a href="tel:+36705503989">+36 70 550 3989</a></p>
                <p><a href="mailto:peterfy17rendelo@gmail.com">peterfy17rendelo@gmail.com</a></p>
                <p>1076 Budapest, Péterfy Sándor utca 17.<br>IV. emelet, 29. ajtó</p>
            </div>
        </div>
        <div class="copyright">
            <p>&copy; 2026 Péterfy17 Magánrendelő. Minden jog fenntartva.</p>
        </div>
    </div>
</footer>
```

---

---

## News (`data/news.json` + `news/`)

News items are stored in `data/news.json`. `script.js` fetches this file and renders cards into `.news-carousel .news-grid`. If `fetch()` fails (e.g. `file://` protocol), it falls back to the embedded `newsData` object in `script.js` — **keep both in sync**.

Each news item has: `date`, `title`, `summary`, `link` (nullable — items without a link render as `<article>`, items with a link render as `<a>`).

---

## Contact & Legal

- **Phone**: +36 70 550 3989
- **Email**: peterfy17rendelo@gmail.com
- **Address**: 1076 Budapest, Péterfy Sándor utca 17., IV. emelet, 29. ajtó
- **Facebook**: https://www.facebook.com/profile.php?id=61566762230496
- **Domain**: http://www.peterfy17rendelo.hu

Legal pages:
- `legal/adatkezelesi-tajekoztato.html`
- `legal/adatvedelmi-nyilatkozat.html`
- `legal/sutikezelesi-tajekoztato.html`

---

## JavaScript (`script.js`)

| Function | Purpose |
|---|---|
| `initHeroCarousel()` | Manual prev/next/dot navigation for the 3-slide homepage hero |
| `initColleaguesCarousel()` | Scrolls colleague cards (3-up → 2-up → 1-up responsive) |
| `initNewsCarousel()` | Same logic for news cards |
| `initOfficeCarousel()` | Same logic for office gallery |
| `initMobileMenu()` | Hamburger open/close and nav link auto-close on mobile |
| `loadNews()` | Fetches `data/news.json`; falls back to embedded `newsData` |
| `shuffleColleagues()` | Fisher-Yates shuffle of colleague cards, runs before carousel init |

All carousels reset position on `window.resize`.

---

## Content Guidelines

- **Language**: All content in Hungarian. Use proper Hungarian medical terminology.
- **Date format**: `YYYY. hónap nap.` (e.g. `2026. január 15.`)
- **Tone**: Professional, warm, patient-focused. First person on doctor bio pages.
- **En-dash**: Use `–` (not `-`) for ranges and credential separators.
- **Copyright**: Update year in all footer blocks annually.

---

## How To: Common Tasks

### Add a new doctor
1. Create `doctors/dr-name.html` — copy `doctors/dr-ladanyi-agnes.html` and update all content.
2. Add a `<a href="doctors/dr-name.html" class="colleague-card colleague-link">` block to `index.html` `#munkatarsak`.
3. Add the photo to `photos/colleagues/` as a JPG with a lowercase `firstname_lastname.jpg` filename.
4. Add the doctor to the `employee` array in the `index.html` JSON-LD block.

### Add a new service card
1. Add a `<div class="service-card">` block to `index.html` `#szolgaltatasok`.
2. Update the `availableService` array in the `index.html` JSON-LD block.
3. Service cards on the homepage link to the corresponding doctor page (no `services/` directory).

### Add a news item
1. Add an entry to `data/news.json` (newest first).
2. Also add the same entry to the `newsData` fallback object in `script.js` (same order).
3. If the item needs a full article page, create `news/article-name.html` and set `"link": "news/article-name.html"` in the JSON.

### Update office gallery photos
- Replace or add files in `photos/office/` (lowercase).
- Add/remove `<div class="gallery-item"><img ...></div>` entries in `index.html` `#rendelo`.

### Update colleague photos
- Replace files in `photos/colleagues/` (lowercase JPG, e.g. `ladanyi_agnes.jpg`).
- Recommended minimum size: 800×800 px, portrait orientation.

---

## Known Issues

None at this time.
