# Portfolio site for Lovepreet Singh Bhangu

A premium dark, single-page portfolio for a Web & Social Designer, with a separate case-study page per project.

## Look and feel

- Deep charcoal/black background, white and soft-grey text, one electric accent colour.
- Bold display headings paired with a clean body typeface, generous spacing, large editorial type.
- Subtle motion only: scroll reveals, hover lifts on cards, image zoom, sticky nav that shrinks on scroll.
- Mobile gets its own layout treatment, not a shrunken desktop.

## Sections on the home page

1. Hero — name, "Web & Social Designer", the headline "I Design Digital Experiences That Help Businesses Stand Out.", profile photo with a styled placeholder you can swap for a real photo, two buttons (View My Work, Let's Work Together), social links, and a small credibility strip using the non-numeric labels from the brief.
2. About — editorial two-column layout: bio, focus, design philosophy, strengths, link to work.
3. Education — timeline with ITI Computer, BA, B.Tech, completed by 2024, no invented institutions or dates.
4. Skills — tabbed categories: Web, UI/UX, Social Media, Branding, Marketing/Growth. No percentage bars.
5. Services — seven cards (Website Design, Website Development, UI/UX, Landing Pages, Social Media Design, Branding, SEO) with icon, description, hover state, CTA.
6. Projects — the visual centrepiece: large cards for Aesthetic Aura, Dhillon Skin Clinic, Wild Wing Restaurants, Saman MD, with service tags and clickable live links, plus a "Selected Work & Ongoing Projects" note.
7. Process — five numbered steps (Discover, Strategy, Design, Develop, Launch & Improve).
8. Why Work With Me — credibility points, no unsupported claims.
9. Testimonials — placeholder cards clearly marked for real feedback later.
10. Contact — headline "Have a project in mind?", clickable email and phone, a direct WhatsApp link, Facebook/Instagram/LinkedIn, and a form (name, email, business, service needed, project details, optional budget).
11. Footer — name, title, tagline, navigation, socials, contact, copyright.

## Case studies

Each project gets its own page: objective, approach, services provided, key design decisions, website preview, gallery, and a contact CTA. Content stays truthful to what you provided — no invented clients, results, or medical claims.

## Defaults I'm applying (tell me to change any of these)

- Contact form opens your email app with the details filled in, so nothing extra needs setting up. If you'd rather have enquiries saved and viewable in a dashboard, I'll add that instead.
- Project visuals use generated abstract mockups shown inside browser frames, easy to replace with real screenshots later.
- Profile photo is a clearly marked styled placeholder until you upload a real photo.

## Technical notes

- TanStack Start routes: `/` for the home page and `/work/$slug` for case studies.
- Dark-first design tokens defined in `src/styles.css`; no hardcoded colours in components.
- Fonts loaded via a `<link>` in the root route head.
- Per-route `head()` metadata with unique titles, descriptions, Open Graph and Twitter tags; semantic headings and descriptive alt text throughout.
- Project data lives in one shared file so copy, links, and images are edited in a single place.
