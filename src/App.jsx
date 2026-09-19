import { useState } from "react";

import Preloader from "./components/layout/Preloader.jsx";
import Cursor from "./components/layout/Cursor.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";

import Hero from "./components/sections/Hero.jsx";
import About from "./components/sections/About.jsx";
import Skills from "./components/sections/Skills.jsx";
import Projects from "./components/sections/Projects.jsx";
import Education from "./components/sections/Education.jsx";
import Contact from "./components/sections/Contact.jsx";

import { useLenis } from "./hooks/useLenis.js";

export default function App() {
  const [ready, setReady] = useState(false);
  useLenis();

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <Cursor />

      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Hero start={ready} />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
