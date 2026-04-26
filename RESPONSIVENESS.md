# Responsiveness Best Practices

Lessons learned from building and fixing the Péterfy17 website across desktop, tablet, and mobile.

---

## Breakpoints in use

| Breakpoint | Target |
|---|---|
| `≤1024px` | Tablet landscape |
| `≤900px` | Tablet portrait, stacked layouts |
| `≤768px` | Mobile — hamburger menu triggers here |
| `≤600px` | Small phone — single-column carousels |
| `≤480px` | Very small phone — label shortening, stacked contact rows |

---

## Hero Section

**Problem:** Fixed `height` on the hero clips content on small screens. The h1/h2 wraps across many lines at large font sizes, pushing the button out of the visible area.

**Solutions:**
- Always include `h1` alongside `h2` in mobile font-size overrides — they are separate selectors. Forgetting `h1` leaves it at the desktop size (42px) even on small phones.
- Increase hero `height` on mobile breakpoints to give content room to breathe.
- Center content vertically using `align-items: center` on `.hero-content`. Do NOT switch to `flex-start` — it looks unbalanced even if it prevents clipping. Instead, reduce the font size enough to fit within the centered layout.
- Remove `padding-left`/`padding-right` offsets from first/last slides on mobile — let text use the full width.

```css
/* Always override both h1 and h2 together */
.hero-text h1,
.hero-text h2 {
    font-size: 20px;
}
```

---

## Carousels (Colleagues, News, Office Gallery)

### Arrow positioning on mobile

**Problem:** Arrows sit beside the carousel in a flex row, shrinking the card width to an unusable size on narrow screens.

**Solution:** Make arrows `position: absolute` on mobile so they overlay the card edges, allowing the carousel to take full container width.

```css
@media (max-width: 600px) {
    .colleagues-carousel-container {
        position: relative;
        gap: 0;
    }

    .colleagues-carousel-container button {
        position: absolute;
        z-index: 10;
        /* For image-based carousels: pin to image area, not card middle */
        top: 100px;
        /* For text-only carousels: centre vertically */
        /* top: 50%; transform: translateY(-50%); */
    }

    .colleagues-carousel-container .colleagues-carousel-prev { left: 4px; }
    .colleagues-carousel-container .colleagues-carousel-next { right: 4px; }
}
```

**Note:** For cards with images (colleagues, office), set a fixed `top` value equal to half the image height (e.g. `top: 100px` for a 220px image) so arrows sit over the image, not the text below. For text-only cards (news), use `top: 50%; transform: translateY(-50%)` to centre vertically.

### Card width and step calculation

**Problem:** Carousel JS calculates the step distance from `grid.offsetWidth`. On mobile, after arrows are made absolute and the grid has no explicit width, `grid.offsetWidth` can return an unreliable value, causing cards to collide or overlap after the first navigation.

**Solution:** Use `carousel.clientWidth` as the step size on single-item (mobile) view. Keep `grid.offsetWidth` for multi-item (tablet/desktop) view where it was already working.

```js
const updateCarousel = () => {
    const itemsPerView = getItemsPerView();
    const gap = itemsPerView === 1 ? 0 : 40;
    const cardWidth = itemsPerView === 1
        ? carousel.clientWidth          // stable — measured from the visible container
        : (grid.offsetWidth - gap * (itemsPerView - 1)) / itemsPerView;  // original
    const translateValue = -currentPosition * (cardWidth + gap);
    grid.style.transform = `translateX(${translateValue}px)`;
};
```

Also set explicit CSS on mobile card items so they match the JS assumption:
```css
@media (max-width: 600px) {
    .colleague-card {
        flex: 0 0 100%;
        flex-shrink: 0;
        width: 100%;
        margin: 0;
        box-sizing: border-box;
    }
    .colleagues-grid {
        gap: 0;
        width: 100%;
    }
    .colleagues-carousel {
        padding: 10px 0 35px 0; /* remove side padding on mobile */
    }
}
```

### Touch / swipe support

Browsers on mobile do not automatically turn arrow-button carousels into swipeable ones. Add touch listeners explicitly on the carousel element:

```js
let touchStartX = 0;
carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
}, { passive: true });

carousel.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {   // 40px threshold avoids accidental triggers
        diff > 0 ? nextSlide() : prevSlide();
    }
}, { passive: true });
```

Use `{ passive: true }` on both listeners — it tells the browser the handler will not call `preventDefault()`, allowing native scroll to remain smooth.

---

## Flex Row Layouts with Text + Number

**Problem:** A `display: flex; justify-content: space-between` row (e.g. doctor name on the left, phone number on the right) breaks badly on narrow screens — the number wraps mid-digit onto the next line.

**Solution:** Stack vertically on mobile using `flex-direction: column`.

```css
.doctor-contact-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.doctor-contact-phone {
    white-space: nowrap;  /* prevents digit wrapping at all screen sizes */
    margin-left: 12px;
}

@media (max-width: 480px) {
    .doctor-contact-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
    }

    .doctor-contact-phone {
        margin-left: 0;
    }
}
```

---

## Long Labels

**Problem:** A long inline label (e.g. "(Laboratóriumi szolgáltatás)") wraps and breaks a schedule row on narrow screens.

**Solution:** Use two `<span>` elements — one for the full label, one for the short version — and toggle visibility with CSS.

```html
<span class="label-full">(Laboratóriumi szolgáltatás)</span>
<span class="label-short">(Labor)</span>
```

```css
.label-short { display: none; }
.label-full  { display: inline; }

@media (max-width: 480px) {
    .label-full  { display: none; }
    .label-short { display: inline; }
}
```

---

## Phone Numbers

**Problem:** iOS Safari and some Android browsers automatically detect phone number patterns in plain text and turn them into blue underlined links, overriding your styles.

**Solution:**
1. Add `<meta name="format-detection" content="telephone=no">` to every page's `<head>` to disable auto-detection.
2. Wrap phone numbers manually in `<a href="tel:+36...">` so users can still tap to call.
3. Add a global CSS rule so tel links inherit surrounding text styles:

```css
a[href^="tel"] {
    color: inherit;
    text-decoration: none;
}
```

---

## Section Background Alternation

Alternating white / light-grey section backgrounds must be assigned manually. The expected pattern after the hero:

| Section | Class |
|---|---|
| Szolgáltatások | `section gray-bg` |
| Újdonságok | `section` (white) |
| Munkatársak | `section gray-bg` |
| Időpontfoglalás | `section` (white) |
| Rendelő | `section gray-bg` |
| Kapcsolat | `section` (white) |

Two consecutive sections with the same class break the visual rhythm — check the sequence whenever a section is added or removed.

---

## Image Heights in Carousels

**Problem:** A fixed pixel height (e.g. `320px`) on a portrait photo container clips the subject on mobile, showing only the top of the head.

**Solution:** Reduce the image container height in mobile breakpoints, keeping `object-fit: cover` and `object-position: center top` so the face stays in frame.

```css
.colleague-image {
    height: 320px;          /* desktop */
}

@media (max-width: 600px) {
    .colleague-image {
        height: 220px;      /* mobile — less height, face still visible */
    }
}
```

---

## Git Workflow

After each editing session:

```bash
git add .
git commit -m "Short description of what changed"
git push
```

GitHub Pages redeploys automatically within 1–2 minutes after each push.

**Caution:** `git add .` stages deletions too. If files disappear from disk (e.g. images accidentally deleted), they will be removed from GitHub on the next push. Always check `git status` before committing if something looks off. Deleted files can be recovered from a previous commit:

```bash
git checkout <previous-commit-hash> -- photos/hero photos/office
git add photos/hero photos/office
git commit -m "Restore accidentally deleted photos"
git push
```
