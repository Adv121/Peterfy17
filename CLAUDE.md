# Dr. Ladányi Ágnes - Medical Office Website

## Project Overview
This is the official Hungarian language medical office website for Dr. Ladányi Ágnes's private practice. The website features a professional, clean aesthetic using a teal/turquoise color scheme, showcasing services in internal medicine, diabetology, nephrology, and hypertensiology.

## File Structure
```
Website/
├── index.html               # Main homepage with all sections
├── dr-ladanyi-agnes.html    # Detailed page for Dr. Ladányi Ágnes
├── style.css                # Styling and responsive design
├── script.js                # Interactive features and animations
├── logo.png                 # Medical office logo
├── CLAUDE.md                # This documentation file
└── Photos/                  # Image assets folder
    ├── Colleagues/          # Team member photos
    │   ├── Agi.jpg          # Dr. Ladányi Ágnes photo
    │   └── Csilla.jpg       # Receptionist photo
    └── Office/              # Office interior photos
        ├── Consultation.jpg # Consultation room (also used as hero image)
        └── Office1-7.jpg    # Various office views
```

## Design Specifications

### Color Scheme
- **Primary Color**: #2c9fa8 (Teal/Turquoise) - Used for headings, links, buttons
- **Secondary Color**: #1a7a82 (Darker Teal) - Used for hover states
- **Background**: #f8f9fa (Light Gray) - Alternating sections
- **Text**: #333 (Dark Gray) for main text, #555/#666 for secondary text
- **Footer**: #2c3e50 (Dark Blue-Gray)

### Typography
- **Font Family**: 'Open Sans', Arial, sans-serif
- **Headings**: Bold (600-700 weight)
- **Body Text**: Regular (400 weight)
- **Font Sizes**: Responsive and hierarchical

## Website Structure

### Main Page (index.html)
1. **Header**: Sticky navigation with logo (logo.png) and menu
2. **Hero**: Welcome section with call-to-action and doctor's photo (Consultation.jpg)
3. **Bemutatkozás (About)**: Brief doctor biography with link to detailed page
4. **Szolgáltatások (Services)**: 6 service cards in grid layout
5. **Munkatársak (Colleagues)**: Team member profiles with photos - Dr. Ladányi Ágnes card is clickable
6. **Rendelő (Office)**: Photo gallery showcasing office interior (8 images)
7. **Árak (Pricing)**: Service pricing table
8. **Időpontfoglalás (Appointments)**: Schedule and contact methods
9. **Újdonságok (News)**: Latest updates and announcements
10. **Kapcsolat (Contact)**: Full contact information with Google Maps embed
11. **Footer**: Quick links and copyright

### Doctor Detail Page (dr-ladanyi-agnes.html)
1. **Header**: Same as main page with navigation
2. **Hero**: Doctor's name, title, and photo
3. **Bemutatkozás (Full Biography)**: Complete education, experience, specializations, and qualifications
4. **Call-to-Action**: Appointment booking section
5. **Footer**: Same as main page

## Doctor Information

**Dr. Ladányi Ágnes**
- Belgyógyász, diabetológus, nefrológus, hipertonológus
- Graduated from Semmelweis Medical University in 1991
- 30+ years of hospital experience
- Private practice opened in September 2024

## Customization Instructions

### Updating Doctor Information
- **Name**: Currently set to "Dr. Ladányi Ágnes"
- **Specialization**: Belgyógyász, diabetológus, nefrológus, hipertonológus
- **Biography**: Edit the bio paragraphs in the #bemutatkozas section

### Updating Contact Information
- **Phone Number**: Currently set to +36 70 550 3989
- **Email**: Currently set to peterfy17rendelo@gmail.com
- **Address**: Currently set to 1076 Budapest, Péterfy Sándor utca 17., IV. emelet, 29. ajtó

### Updating Services
- Services are in `.service-card` divs within the #szolgaltatasok section
- Each card has an icon (emoji), title (h3), and description (p)
- To add/remove services, add/remove `.service-card` divs

### Updating Pricing
- Prices are in `.price-item` divs within the #arak section
- Update the service name, price, and description

### Updating Schedule
- Schedule is in the `.schedule` ul within the #idopontfoglalas section
- Format: `<li><strong>Day:</strong> Time</li>`

### Adding Real Images
Hero image currently uses: `Photos/Office/Consultation.jpg`
- **Hero Image**: Currently displays Consultation.jpg
- **Profile Photo**: Can be added in the #bemutatkozas section if needed

### Managing Colleague Photos
Current team members are displayed in the #munkatarsak section:
- **Dr. Ladányi Ágnes** (Agi.jpg) - The doctor herself - **Clickable, links to detailed page**
- **Csilla** (Csilla.jpg) - Receptionist/Administrator

To update:
- **Add colleague**: Create a new `.colleague-card` div with image, name, position, and description
- **Update photos**: Replace files in `Photos/Colleagues/` folder (recommended size: 800x800px or larger)
- **Modify info**: Edit the name, position, and description in the `.colleague-info` div
- **Remove colleague**: Delete the entire `.colleague-card` div
- **Make clickable**: Wrap the `.colleague-card` in an `<a>` tag with `colleague-link` class

Example structure for non-clickable card:
```html
<div class="colleague-card">
    <div class="colleague-image">
        <img src="Photos/Colleagues/Name.jpg" alt="Name - Position">
    </div>
    <div class="colleague-info">
        <h3>Name</h3>
        <p class="position">Position</p>
        <p class="description">Bio description...</p>
    </div>
</div>
```

Example structure for clickable card (with detailed page):
```html
<a href="detailed-page.html" class="colleague-card colleague-link">
    <div class="colleague-image">
        <img src="Photos/Colleagues/Name.jpg" alt="Name - Position">
    </div>
    <div class="colleague-info">
        <h3>Name</h3>
        <p class="position">Position</p>
        <p class="description">Bio description...</p>
    </div>
</a>
```

### Managing Office Gallery
Office photos are displayed in the #rendelo section:
- **Add photos**: Upload to `Photos/Office/` and add new `.gallery-item` div
- **Update photos**: Replace existing JPG files in the folder
- **Add captions**: Add `.gallery-caption` div inside `.gallery-item` (optional)
- **Remove photos**: Delete the `.gallery-item` div
- **Recommended size**: 1200x800px or similar aspect ratio

Example with caption:
```html
<div class="gallery-item">
    <img src="Photos/Office/NewPhoto.jpg" alt="Description">
    <div class="gallery-caption">Caption text</div>
</div>
```

### Adding Google Maps
Replace `.map-placeholder` in the #kapcsolat section with:
```html
<iframe
    src="https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE"
    width="100%"
    height="400"
    style="border:0; border-radius:10px;"
    allowfullscreen=""
    loading="lazy">
</iframe>
```

### Creating Detailed Pages for Team Members
To add a detailed biography page for a new doctor or colleague:

1. **Create a new HTML file** (e.g., `dr-name.html`)
   - Copy the structure from `dr-ladanyi-agnes.html`
   - Update the doctor's name, title, photo, and biography
   - Ensure header and footer match the main site

2. **Update the colleague card on index.html**
   - Wrap the `.colleague-card` in an `<a>` tag
   - Add the `colleague-link` class
   - Set the `href` to your new HTML file

3. **Update navigation**
   - Ensure all internal links work correctly
   - Test navigation between pages

Example:
```html
<a href="dr-new-doctor.html" class="colleague-card colleague-link">
    <div class="colleague-image">
        <img src="Photos/Colleagues/NewDoctor.jpg" alt="Dr. New Doctor">
    </div>
    <div class="colleague-info">
        <h3>Dr. New Doctor</h3>
        <p class="position">Specialist Title</p>
        <p class="description">Brief bio...</p>
    </div>
</a>
```

## Language
All content is in **Hungarian**. When making changes:
- Maintain Hungarian language throughout
- Use proper Hungarian grammar and medical terminology
- Date format: YYYY. hónap nap. (e.g., "2026. január 15.")

## Responsive Design
The website is fully responsive with breakpoints:
- **Desktop**: 1200px+ (full layout)
- **Tablet**: 768px - 1199px (adjusted grid)
- **Mobile**: <768px (single column, stacked navigation)

## Features
- Multi-page architecture with clickable colleague cards
- Smooth scrolling navigation
- Sticky header
- Active navigation highlighting on scroll
- Hover animations on cards
- Scroll-triggered fade-in animations
- Fully accessible links and buttons
- Detailed biography pages for doctors

## Technical Notes

### JavaScript Functionality
- Smooth scroll to section anchors
- Active navigation state based on scroll position
- Intersection Observer for card animations
- All features work without requiring external libraries

### CSS Features
- CSS Grid for responsive layouts
- Flexbox for component alignment
- CSS transitions for smooth animations
- Custom properties could be added for easier theme customization

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Uses standard HTML5, CSS3, and ES6 JavaScript
- No external dependencies required

## Future Enhancements (Optional)
- [ ] Add online appointment booking form
- [ ] Integrate Google Maps with actual location
- [ ] Add photo gallery of the office
- [ ] Create patient testimonials section
- [ ] Add blog/news with multiple pages
- [ ] Implement cookie consent banner
- [ ] Add GDPR-compliant contact form
- [ ] SEO optimization with meta tags
- [ ] Add social media links in header/footer

## Maintenance
When updating content:
1. Always maintain the Hungarian language
2. Keep the professional medical tone
3. Ensure all links work (especially tel: and mailto: links)
4. Test responsive design on mobile devices
5. Keep color scheme consistent with brand
6. Update copyright year annually in footer

## Support
For questions about this project or customizations, refer to this documentation.
