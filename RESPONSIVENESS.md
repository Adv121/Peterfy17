# Responsiveness Best Practices

Patterns and lessons learned from building the Péterfy17 website across desktop, tablet, and mobile.

---

## Breakpoints in use

| Breakpoint | Target |
|---|---|
| `≤1024px` | Tablet landscape |
| `≤900px` | Tablet portrait — stacked grids, 2-up carousels |
| `≤768px` | Mobile — hamburger menu, stacked schedules |
| `≤600px` | Small phone — single-column carousels, overlay arrows |
| `≤480px` | Very small phone — label shortening, stacked contact rows |

---

## Sticky Header & Scroll Offset

The header is `position: sticky; top: 0`, which means anchor-link navigation (`#section-id`) scrolls the section heading directly under the header bar.

**Fix:** Add `scroll-margin-top` to every sectioned element:

```css
section[id] {
    scroll-margin-top: 50px;
}
```

This shifts the scroll destination down by the header height, keeping headings visible.

---

## Hero Section

**Problem:** Fixed `height` on the hero clips content on small screens. The `h1`/`h2` wraps across many lines at large font sizes, pushing the button out of the visible area.

**Solutions:**
- Always override both `h1` and `h2` together in mobile rules — they are separate selectors. Missing `h1` leaves it at 42px even on small phones.
- Reduce hero `height` at each breakpoint to give content room.
- Keep `align-items: center` on `.hero-content` — switching to `flex-start` looks unbalanced. Shrink font size instead.
- Remove per-slide `padding-left`/`padding-right` offsets on mobile — let text use full width.

```css
/* Always pair h1 and h2 in mobile overrides */
.hero-text h1,
.hero-text h2 {
    font-size: 20px;
}
```

| Breakpoint | Hero height |
|---|---|
| Desktop | `500px` |
| `≤900px` | `400px` |
| `≤768px` | `380px` |
| `≤600px` | `360px` |

---

## Mobile Navigation (Max-Height Animation)

**Problem:** Using `display: none` → `display: block` on `<nav>` prevents CSS transitions — the menu snaps open with no animation.

**Solution:** Keep the element in the DOM at all times; animate `max-height` between `0` and a generous cap:

```css
nav {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
}

nav.active {
    max-height: 500px;       /* generous cap — exact value doesn't matter */
    border-top: 3px solid #2c9fa8;
}
```

JavaScript adds/removes the `.active` class via the hamburger button.

**Also:** Force the nav closed on resize if the window expands past the mobile breakpoint, otherwise the menu stays open after rotating the device:

```js
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.querySelector('nav').classList.remove('active');
        menuToggle.innerHTML = '☰';
    }
});
```

**Auto-close on link click:** When a nav link is clicked on mobile, close the menu. Smooth-scroll handles the actual navigation.

---

## Carousels (Colleagues, News, Feedback, Office Gallery)

All four carousels share the same pattern: a flex container with `overflow: hidden`, a flex track (the "grid") shifted by `translateX`, and JS that calculates the step distance based on card width.

### Overflow clipping and carousel padding

The carousel `overflow: hidden` clips the track at the inner edge of the wrapper's padding box. Side padding therefore determines how much of an adjacent off-screen card is visible before the clip cuts it.

| Side padding | Remaining clip margin | Effect |
|---|---|---|
| `35px` | ~5px | White card edges bleed in on gray-bg sections |
| `20px` | ~20px | Adequate margin, adjacent cards fully hidden |

**Rule:** Use `padding: 10px 20px 35px 20px` (20px sides) on all carousels. The bottom padding (35px) is only for the box-shadow of cards — it does not affect clipping.

```css
.feedback-carousel,
.colleagues-carousel {
    flex: 1;
    overflow: hidden;
    padding: 10px 20px 35px 20px;   /* 20px sides — sufficient clip margin */
}
```

The news and office carousels use `35px` side padding because they sit on white backgrounds where 5px bleed is invisible. Keep them consistent if backgrounds ever change.

### Arrow positioning on mobile

**Problem:** Arrows sit beside the carousel in a flex row, shrinking the card width to unusable on narrow screens.

**Solution:** Make arrows `position: absolute` on mobile so they overlay the card edges, giving the carousel full container width:

```css
@media (max-width: 600px) {
    .colleagues-carousel-container {
        position: relative;
        gap: 0;
    }

    .colleagues-carousel-container button {
        position: absolute;
        z-index: 10;
        top: 40%;               /* over the image area for image carousels */
        /* top: 50%; transform: translateY(-50%); — for text-only carousels */
        transform: translateY(-50%);
    }

    .colleagues-carousel-container .colleagues-carousel-prev { left: 4px; }
    .colleagues-carousel-container .colleagues-carousel-next { right: 4px; }
}
```

### Card width formula and step calculation

Cards use a percentage-based `flex` declaration derived from the gap and items-per-view count:

```css
/* 3-up desktop: two 40px gaps between 3 cards */
.colleague-card {
    flex: 0 0 calc((100% - 80px) / 3);
}

/* 2-up tablet (≤900px) */
@media (max-width: 900px) {
    .colleague-card {
        flex: 0 0 calc(50% - 20px);
    }
}
```

The JS step distance mirrors the CSS formula:

```js
const updateCarousel = () => {
    const itemsPerView = getItemsPerView();
    const gap = itemsPerView === 1 ? 0 : 40;
    const cardWidth = itemsPerView === 1
        ? carousel.clientWidth          // stable on mobile — measured from visible container
        : (grid.offsetWidth - gap * (itemsPerView - 1)) / itemsPerView;
    const translateValue = -currentPosition * (cardWidth + gap);
    grid.style.transform = `translateX(${translateValue}px)`;
};
```

**Key:** Use `carousel.clientWidth` (not `grid.offsetWidth`) on single-item mobile view. After arrows become absolute, the grid has no reliable intrinsic width.

On mobile, also zero out the CSS gap and set cards to `100%` so the JS and CSS assumptions match:

```css
@media (max-width: 600px) {
    .colleague-card {
        flex: 0 0 100%;
        width: 100%;
        margin: 0;
        box-sizing: border-box;
    }
    .colleagues-grid  { gap: 0; }
    .colleagues-carousel { padding: 10px 0 35px 0; }  /* remove side padding */
}
```

### Items-per-view breakpoints (all carousels)

```js
const getItemsPerView = () => {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
};
```

### Resize handling

On resize, clamp `currentPosition` so it never exceeds the new `maxPosition`, then re-render:

```js
window.addEventListener('resize', () => {
    const itemsPerView = getItemsPerView();
    const maxPosition = totalItems - itemsPerView;
    if (currentPosition > maxPosition) currentPosition = Math.max(0, maxPosition);
    updateCarousel();
});
```

### Touch / swipe support

Attach `touchstart` + `touchend` directly on the carousel element with a 40px threshold:

```js
let touchStartX = 0;
carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
}, { passive: true });

carousel.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
        diff > 0 ? next() : prev();
    }
}, { passive: true });
```

Use `{ passive: true }` on both — it tells the browser the handler won't call `preventDefault()`, keeping native scroll smooth.

---

## Portrait Images in Carousels

### Aspect-ratio (mobile)

**Problem:** A fixed pixel height (e.g. `320px`) on a portrait photo container clips the subject on narrow screens.

**Solution:** Switch to `aspect-ratio` on mobile so the image scales proportionally with the card width:

```css
.colleague-image {
    height: 320px;          /* desktop — fixed height */
    overflow: hidden;
}

@media (max-width: 600px) {
    .colleague-image {
        height: auto;
        aspect-ratio: 4 / 5;   /* portrait proportion, no fixed height */
    }
}
```

Always pair with `object-fit: cover` and `object-position: center top` so the face (top of portrait) stays visible:

```css
.colleague-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
}
```

---

## Doctor Hero Layout

The doctor hero (photo + name + title) uses a side-by-side flex row at desktop and tablet, and stacks vertically on mobile.

| Breakpoint | Layout |
|---|---|
| `>900px` | Side by side, photo max 420px, `gap: 60px` |
| `≤900px` | Side by side, `flex-wrap: nowrap`, photo max 250px |
| `≤600px` | Stacked — text `order: 1`, image `order: 2` |

```css
/* ≤600px stacking */
.doctor-hero .hero-content {
    flex-direction: column;
    align-items: center;
}

.doctor-hero .hero-text  { order: 1; width: 100%; }
.doctor-hero .hero-image { order: 2; }

.doctor-hero .hero-image img {
    width: 90%;
    max-width: 320px;
    height: auto;
    object-fit: contain;  /* switch from cover to contain — full portrait visible */
}
```

---

## Schedule Table Responsiveness

The clinic schedule table (`.schedule-box`) has three columns: time, doctor+specialty, phone. These collapse progressively:

| Breakpoint | Layout |
|---|---|
| `>768px` | Three columns, phone right-aligned |
| `≤768px` | Phone wraps below doctor name (full-width row, `padding-left` aligns with doctor column) |
| `≤480px` | `flex-direction: column` — time, then doctor, then phone each on own line |

```css
@media (max-width: 768px) {
    .schedule-entry { flex-wrap: wrap; }
    .schedule-phone-col {
        text-align: left;
        width: 100%;
        padding-left: 120px;  /* aligns with doctor column when time is ~120px wide */
    }
}

@media (max-width: 480px) {
    .schedule-entry { flex-direction: column; }
    .schedule-phone-col { padding-left: 0; }
}
```

---

## Flex Row Layouts with Text + Number

**Problem:** A `justify-content: space-between` row (doctor name left, phone right) breaks on narrow screens — the number wraps mid-digit.

**Solution:** Stack vertically on mobile:

```css
.doctor-contact-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.doctor-contact-phone {
    white-space: nowrap;    /* prevents digit wrapping at all sizes */
    margin-left: 12px;
}

@media (max-width: 480px) {
    .doctor-contact-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
    }
    .doctor-contact-phone { margin-left: 0; }
}
```

---

## Auto-Fit Grids (Services, Doctor Services)

Grids that don't need breakpoint-specific overrides use `repeat(auto-fit, minmax(..., 1fr))` to reflow automatically:

```css
.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
}

.doctor-services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
}
```

The homepage service grid overrides this with explicit 2-column rules at `≤1024px` and below to keep cards square and compact.

---

## Long Labels

**Problem:** A long inline label (e.g. "(Laboratóriumi szolgáltatás)") wraps and breaks a schedule row on narrow screens.

**Solution:** Provide two `<span>` versions and toggle with CSS:

```html
<span class="labor-full">(Laboratóriumi szolgáltatás)</span>
<span class="labor-short">(Labor)</span>
```

```css
.labor-short { display: none; }
.labor-full  { display: inline; }

@media (max-width: 480px) {
    .labor-full  { display: none; }
    .labor-short { display: inline; }
}
```

---

## Phone Numbers

**Problem:** iOS Safari and some Android browsers auto-detect phone number patterns and turn them into blue underlined links.

**Solution:**
1. Add `<meta name="format-detection" content="telephone=no">` to every `<head>` to disable auto-detection.
2. Wrap numbers in `<a href="tel:+36...">` so tap-to-call still works.
3. Make tel links inherit surrounding styles:

```css
a[href^="tel"] {
    color: inherit;
    text-decoration: none;
}
```

---

## Section Background Alternation

White and light-grey sections must be assigned manually — CSS has no way to auto-alternate siblings. The pattern on the homepage after the hero:

| Section | Class |
|---|---|
| `#szolgaltatasok` | `section gray-bg` |
| `#ujdonsagok` | `section` (white) |
| `#munkatarsak` | `section gray-bg` |
| `#idopontfoglalas` | `section` (white) |
| `#velemenyek` | `section gray-bg` |
| `#rendelo` | `section` (white) |
| `#kapcsolat` | `section gray-bg` |

Two consecutive sections with the same class break the visual rhythm. Check the sequence any time a section is added or removed.

**Carousel padding interaction:** When a carousel sits on a `gray-bg` section and uses white cards, use `padding: 10px 20px` (not `35px`) on the carousel's side to prevent white card edges from peeking in from off-screen positions. See *Overflow clipping* above.

---

## Scroll-Triggered Card Animations

Cards fade in and slide up as they enter the viewport using `IntersectionObserver`. Cards start invisible (`opacity: 0`, `transform: translateY(20px)`) and transition to their final state when observed:

```js
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});
```

The `rootMargin: '0px 0px -50px 0px'` delays the trigger slightly — cards animate in when 50px above the bottom of the viewport rather than at the very edge.

---

## Git Workflow

After each editing session:

```bash
git add <specific-files>
git commit -m "Short description of what changed"
git push
```

Prefer staging specific files over `git add .` — the latter also stages deletions. If files disappear from disk accidentally, they will be removed from GitHub on the next push. Recover with:

```bash
git checkout <previous-commit-hash> -- photos/hero photos/office
git add photos/hero photos/office
git commit -m "Restore accidentally deleted photos"
git push
```

GitHub Pages redeploys automatically within 1–2 minutes after each push.
