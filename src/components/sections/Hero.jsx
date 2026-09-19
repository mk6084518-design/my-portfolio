import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap.js";
import { site } from "../../data/site.js";
import Button from "../ui/Button.jsx";
import Counter from "../ui/Counter.jsx";

/** Headline ko word-by-word mask reveal ke liye split karta hai. */
function SplitHeadline({ text }) {
  return (
    <h1 className="hero__title">
      {text.split(" ").map((word, i) => (
        <span className="line" key={`${word}-${i}`}>
          <span>{word}</span>
        </span>
      ))}
    </h1>
  );
}

export default function Hero({ start }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (!start) return;

      gsap
        .timeline()
        .from(".hero__title .line > span", { yPercent: 115, stagger: 0.035, duration: 0.9 })
        .from(".hero__eyebrow", { y: 16, opacity: 0, duration: 0.6 }, 0.15)
        .from(".hero__subtitle", { y: 24, opacity: 0 }, "-=0.55")
        .from(".hero__cta .magnetic", { y: 20, opacity: 0, stagger: 0.09 }, "-=0.5")
        .from(".hero__stats > div", { y: 20, opacity: 0, stagger: 0.08 }, "-=0.45")
        .from(".hero__blob", { scale: 0.4, opacity: 0, duration: 1.6, stagger: 0.15 }, 0);

      // Scroll parallax
      gsap.to(".hero__blob--one", {
        yPercent: 35,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero__blob--two", {
        yPercent: -25,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { dependencies: [start], scope: ref }
  );

  return (
    <section className="hero" id="hero" ref={ref}>
      <div className="hero__blob hero__blob--one" />
      <div className="hero__blob hero__blob--two" />

      <div className="container hero__inner">
        {site.available && <p className="hero__eyebrow">Available for work · {site.location}</p>}

        <SplitHeadline text={site.headline} />

        <p className="hero__subtitle">{site.summary}</p>

        <div className="hero__cta">
          <Button href="#projects">See my work</Button>
          <Button href={site.resume} variant="ghost" download>
            Download resume
          </Button>
        </div>

        <dl className="hero__stats">
          {site.stats.map((stat) => (
            <div key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>
                <Counter value={stat.value} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
