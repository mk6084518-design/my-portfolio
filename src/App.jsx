import { useEffect, useRef, useState } from "react";

import Preloader from "./components/layout/Preloader.jsx";
import Cursor from "./components/layout/Cursor.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";

import Hero from "./components/sections/Hero.jsx";
import About from "./components/sections/About.jsx";
import Skills from "./components/sections/Skills.jsx";
import Projects from "./components/sections/Projects.jsx";
import Education from "./components/sections/Education.jsx";
import SkillMatrix from "./components/sections/SkillMatrix.jsx";
import Contact from "./components/sections/Contact.jsx";

import { useLenis } from "./hooks/useLenis.js";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion.js";
import { gsap, useGSAP } from "./lib/gsap.js";

const editableSelector = "input, textarea, [contenteditable]:not([contenteditable='false'])";

function isEditableTarget(target) {
  return target instanceof Element && target.closest(editableSelector) !== null;
}

export default function App() {
  const [ready, setReady] = useState(false);
  const mainRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  useLenis();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      Array.from(mainRef.current.children)
        .filter((child) => child.tagName === "SECTION" && child.id !== "projects")
        .forEach((section) => {
          const content = section.querySelector(".container") || section;
          const maxScale = () => Math.max(1, Math.min(1.08, (window.innerWidth - 16) / content.offsetWidth));
          const zoom = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.7,
              invalidateOnRefresh: true,
            },
          });

          zoom
            .fromTo(content, { scale: 0.88 }, { scale: maxScale, duration: 0.5, ease: "none" })
            .to(content, { scale: 0.88, duration: 0.5, ease: "none" });
        });
    },
    { dependencies: [prefersReducedMotion], scope: mainRef }
  );

  useEffect(() => {
    const preventContextMenu = (event) => event.preventDefault();
    const preventPageCopy = (event) => {
      if (isEditableTarget(event.target) || isEditableTarget(document.activeElement)) return;
      event.preventDefault();
    };
    const preventCopyShortcut = (event) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        !event.shiftKey &&
        !event.altKey &&
        event.key.toLowerCase() === "c" &&
        !isEditableTarget(event.target) &&
        !isEditableTarget(document.activeElement)
      ) {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", preventContextMenu);
    document.addEventListener("copy", preventPageCopy);
    document.addEventListener("keydown", preventCopyShortcut);

    return () => {
      document.removeEventListener("contextmenu", preventContextMenu);
      document.removeEventListener("copy", preventPageCopy);
      document.removeEventListener("keydown", preventCopyShortcut);
    };
  }, []);

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <Cursor />

      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Navbar />

      <main id="main" ref={mainRef}>
        <Hero start={ready} />
        <About />
        <Skills />
        <Projects />
        <Education />
        <SkillMatrix />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
