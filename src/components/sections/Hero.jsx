import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "../../lib/gsap.js";
import { site } from "../../data/site.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";
import Button from "../ui/Button.jsx";
import Counter from "../ui/Counter.jsx";
import { ArrowDownRight, Code2, Download, FileText, FolderKanban, MapPin, PlugZap } from "lucide-react";

const statIcons = {
  "Live projects": FolderKanban,
  "Core technologies": Code2,
  "APIs integrated": PlugZap,
};

const heroThoughts = [
  "Full Stack Developer | MERN",
  "React + Redux Toolkit + Node + Express",
  "AI Model & API Integration",
  "Building products, not just pages",
];

const thoughtColors = ["#ff5d73", "#ffb347", "#2be38a", "#4cc9f0"];

export default function Hero({ start }) {
  const ref = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [thoughtIndex, setThoughtIndex] = useState(0);
  const [thought, setThought] = useState("");

  useEffect(() => {
    if (prefersReducedMotion) {
      setThoughtIndex(0);
      setThought(heroThoughts[0]);
      return;
    }

    let phraseIndex = 0;
    let characterIndex = 0;
    let deleting = false;
    let timeoutId;

    const advance = () => {
      const phrase = heroThoughts[phraseIndex];
      characterIndex += deleting ? -1 : 1;
      setThought(phrase.slice(0, characterIndex));

      let delay = deleting ? 28 : 55;
      if (characterIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % heroThoughts.length;
        setThoughtIndex(phraseIndex);
        delay = 350;
      } else if (characterIndex === phrase.length) {
        deleting = true;
        delay = 1400;
      }

      timeoutId = window.setTimeout(advance, delay);
    };

    timeoutId = window.setTimeout(advance, 900);
    return () => window.clearTimeout(timeoutId);
  }, [prefersReducedMotion]);

  useGSAP(
    () => {
      if (!start) return;

      gsap
        .timeline()
        .from(".hero__title", { y: 18, opacity: 0, duration: 0.8 })
        .from(".hero__subtitle", { y: 12, opacity: 0, duration: 0.55 }, "-=0.35")
        .from(".hero__thought", { y: 8, opacity: 0, duration: 0.4 }, "-=0.3")
        .from(".hero__cta > *", { y: 10, opacity: 0, stagger: 0.08 }, "-=0.25")
        .from(".hero__meta > span", { y: 10, opacity: 0, stagger: 0.06 }, "-=0.2");

      if (prefersReducedMotion) return;

      gsap.to(".hero__inner", {
        y: 24,
        opacity: 0.72,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    },
    { dependencies: [start, prefersReducedMotion], scope: ref }
  );

  return (
    <section className="hero" id="hero" ref={ref}>
      <div className="container hero__inner">
        {site.available && <p className="hero__eyebrow">HI, I'm</p>}
        <h1 className="hero__title">{site.name}</h1>
        <p className="hero__subtitle" style={{ "--thought-color": thoughtColors[thoughtIndex] }} aria-live="off">
          A Full-Stack Developer passionate about building scalable web applications and integrating AI into real-world products.
        </p>
        <p className="hero__thought" style={{ "--thought-color": thoughtColors[thoughtIndex] }} aria-live="off">
          <span>{thought}</span>
          {!prefersReducedMotion && <span className="hero__typing-cursor" aria-hidden="true" />}
        </p>

        <div className="hero__cta">
          <Button href="#projects"><ArrowDownRight size={16} aria-hidden="true" />See my work</Button>
          <Button href={site.resume} variant="ghost" target="_blank" rel="noopener noreferrer">
            <FileText size={16} aria-hidden="true" />View resume
          </Button>
          <Button href={site.resume} variant="download" download>
            <Download size={16} aria-hidden="true" />Download resume
          </Button>
        </div>

        <div className="hero__meta">
          <span className="hero__meta-item hero__meta-item--location">
            <MapPin size={16} aria-hidden="true" />
            <span><b>Location</b>{site.location}</span>
          </span>
          {site.stats.map((stat) => (
            <span className="hero__meta-item" key={stat.label}>
              {(() => {
                const Icon = statIcons[stat.label] || Code2;
                return <Icon size={16} aria-hidden="true" />;
              })()}
              <span><b>{stat.label}</b><Counter value={stat.value} suffix={stat.suffix} /></span>
            </span>
          ))}
        </div>

      </div>
      <div className="hero__waves" aria-hidden="true">
        <svg viewBox="0 0 2880 120" preserveAspectRatio="none">
          <defs>
            <linearGradient id="hero-rainbow" x1="0" x2="1">
              <stop offset="0%" stopColor="rgba(14, 91, 190, 0.48)" />
              <stop offset="25%" stopColor="rgba(35, 126, 220, 0.42)" />
              <stop offset="50%" stopColor="rgba(154, 174, 193, 0.38)" />
              <stop offset="75%" stopColor="rgba(42, 158, 234, 0.45)" />
              <stop offset="100%" stopColor="rgba(82, 103, 122, 0.4)" />
            </linearGradient>
          </defs>
          <path d="M0 42 Q180 4 360 42 t360 0 t360 0 t360 0 t360 0 t360 0 t360 0 t360 0 V120 H0Z" fill="url(#hero-rainbow)" opacity=".48" />
          <path d="M0 62 Q180 28 360 62 t360 0 t360 0 t360 0 t360 0 t360 0 t360 0 t360 0 V120 H0Z" fill="url(#hero-rainbow)" opacity=".72" />
          <path d="M0 82 Q180 54 360 82 t360 0 t360 0 t360 0 t360 0 t360 0 t360 0 t360 0 V120 H0Z" fill="var(--bg)" />
        </svg>
      </div>
    </section>
  );
}
