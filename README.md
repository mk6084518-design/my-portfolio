# Manoj Kumar — Portfolio (React + Vite + GSAP)

Responsive personal portfolio. React 18, Vite, GSAP + ScrollTrigger, Lenis smooth scroll, dark/light theme, fully data-driven content.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/
npm run preview
```

## Structure

```
public/
  favicon.svg
  images/profile.jpg          <- apni photo
  resume/Manoj_Kumar_Resume.pdf
src/
  data/                       <- SAARA CONTENT YAHAN
    site.js                   name, role, contact, stats, nav
    projects.js               projects
    skills.js                 skill groups, strengths, languages
    education.js              education
  lib/gsap.js                 plugins ek hi jagah register
  hooks/
    useLenis.js               smooth scroll (GSAP ticker se synced)
    useTheme.js               dark/light + localStorage
    useMediaQuery.js
    usePrefersReducedMotion.js
  components/
    layout/                   Preloader, Cursor, Navbar, Footer
    ui/                       Button, Magnetic, Reveal, SectionTitle, Counter
    sections/                 Hero, About, ProfileCard, Skills,
                              Projects, ProjectCard, Education, Contact
  styles/
    base/                     tokens, reset, typography
    components/               preloader, cursor, navbar, button, card, chip
    sections/                 hero, about, skills, projects, education, contact, footer
    main.css                  sirf @import
  App.jsx, main.jsx
```

## Sections

Hero (animated headline + counters) → About + profile image card → Technical skills → Projects → Education → Contact form + details → Footer.

## Content kaise badle

| Kya | Kahan |
| --- | --- |
| Naam, role, summary, contact, stats | `src/data/site.js` |
| Projects | `src/data/projects.js` |
| Skills, strengths, languages | `src/data/skills.js` |
| Education | `src/data/education.js` |
| Colours, fonts, spacing | `src/styles/base/tokens.css` |
| Profile photo | `public/images/profile.jpg` |
| Resume PDF | `public/resume/Manoj_Kumar_Resume.pdf` |
| Contact form endpoint | `src/components/sections/Contact.jsx` → `FORM_ENDPOINT` |

Photo na ho to ProfileCard apne aap initials wala gradient fallback dikha deta hai.

## Reusable pieces

- `<Reveal>` — kisi bhi content ko wrap karo, scroll par reveal ho jayega. `stagger` prop se children ek ke baad ek.
- `<Magnetic>` — pointer ki taraf khinchne wala wrapper (touch par apne aap off).
- `<Counter value={12} />` — scroll par number count-up.
- `<Button href="#projects">` — hash links Lenis se smooth scroll karte hain.

## Responsive

Fluid type scale (`clamp()`), auto-fit grids, hamburger nav 820px se neeche, profile card 860px par upar aa jata hai, buttons 420px par full width, blobs mobile par halke. Touch devices par custom cursor aur magnetic effect disable.

`prefers-reduced-motion` respect hota hai — preloader skip, animations off, content turant visible.

## Deploy

**Vercel:** repo import → framework Vite → build `npm run build` → output `dist`.
**GitHub Pages:** `vite.config.js` me `base: "/Portfolio/"` set karke `dist/` ko `gh-pages` branch par push karo.
# my-portfolio
