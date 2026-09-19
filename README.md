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
  images/profile.jpg          <- profile photo
  resume/Manoj_Kumar_Resume.pdf
src/
  data/                       <- all content lives here
    site.js                   name, role, contact, stats, nav
    projects.js               projects
    skills.js                 skill groups, strengths, languages
    education.js              education
  lib/gsap.js                 plugins registered in one place
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
    main.css                  imports only
  App.jsx, main.jsx
```

## Sections

Hero (animated headline + counters) → About + profile image card → Technical skills → Projects → Education → Contact details → Footer.

## How to update content

| Kya | Kahan |
| --- | --- |
| Naam, role, summary, contact, stats | `src/data/site.js` |
| Projects | `src/data/projects.js` |
| Skills, strengths, languages | `src/data/skills.js` |
| Education | `src/data/education.js` |
| Colours, fonts, spacing | `src/styles/base/tokens.css` |
| Profile photo | `public/images/profile.jpg` |
| Resume PDF | `public/resume/Manoj_Kumar_Resume.pdf` |
| Social links | `src/data/site.js` → `socials` |

If the profile photo is missing, ProfileCard automatically displays a gradient fallback with initials.

## Reusable pieces

- `<Reveal>` — wrap any content to reveal it on scroll. Use the `stagger` prop to animate children one after another.
- `<Magnetic>` — a pointer-following wrapper that automatically disables on touch devices.
- `<Counter value={12} />` — scroll par number count-up.
- `<Button href="#projects">` — hash links Lenis se smooth scroll karte hain.

## Responsive

Fluid type scale (`clamp()`), auto-fit grids, hamburger nav 820px se neeche, profile card 860px par upar aa jata hai, buttons 420px par full width, blobs mobile par halke. Touch devices par custom cursor aur magnetic effect disable.

`prefers-reduced-motion` respect hota hai — preloader skip, animations off, content turant visible.

## Deploy

**Vercel:** repo import → framework Vite → build `npm run build` → output `dist`.
**GitHub Pages:** `vite.config.js` me `base: "/Portfolio/"` set karke `dist/` ko `gh-pages` branch par push karo.
# my-portfolio
