import { useEffect, useState } from "react";
import { site } from "../../data/site.js";
import { useTheme } from "../../hooks/useTheme.js";
import { scrollToSection } from "../../hooks/useLenis.js";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 40);
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent background scrolling while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const go = (e, href) => {
    e.preventDefault();
    setOpen(false);
    scrollToSection(href);
  };

  return (
    <header className={`navbar${scrolled ? " is-scrolled" : ""}`}>
      <span className="navbar__progress" style={{ transform: `scaleX(${progress})` }} />
      <a className="navbar__logo" href="#hero" onClick={(e) => go(e, "#hero")}>
        MK<span>.</span>
      </a>

      <nav className={`navbar__nav${open ? " is-open" : ""}`} aria-label="Primary">
        {site.navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={(e) => go(e, link.href)}>
            {link.label}
          </a>
        ))}
      </nav>

      <div className="navbar__actions">
        <button
          className="theme-toggle"
          onClick={toggle}
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
        >
          {theme === "dark" ? "◐" : "◑"}
        </button>

        <button
          className="navbar__burger"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
