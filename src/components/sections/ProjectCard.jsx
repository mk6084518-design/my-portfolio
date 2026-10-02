import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";
import { ArrowUpRight, BadgeCheck, Code2, ExternalLink, PanelsTopLeft } from "lucide-react";
import { getTechnology } from "../../lib/technology.js";

export default function ProjectCard({ project }) {
  const ref = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      gsap.from(ref.current, {
        y: 60,
        opacity: 0,
        duration: 0.9,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });

      if (prefersReducedMotion) return;

      const zoom = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      });

      zoom
        .fromTo(
          ref.current,
          { scale: 0.88 },
          {
            scale: () => Math.max(1, Math.min(1.08, (window.innerWidth - 16) / ref.current.offsetWidth)),
            duration: 0.5,
            ease: "none",
          }
        )
        .to(ref.current, { scale: 0.88, duration: 0.5, ease: "none" });
    },
    { dependencies: [prefersReducedMotion], scope: ref }
  );

  // Make the hover glow follow the pointer.
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <article
      ref={ref}
      onPointerMove={onMove}
      className={`card${project.featured ? " card--featured" : ""}`}
      style={{ "--accent": project.accent }}
    >
      <h3 className="card__title"><PanelsTopLeft size={19} aria-hidden="true" />{project.title}</h3>
      <p className="card__desc">{project.tagline}</p>

      <ul className="card__points">
        {project.points.map((point, i) => (
          <li key={i}><BadgeCheck size={15} aria-hidden="true" />{point}</li>
        ))}
      </ul>

      <ul className="chip-list card__tags">
        {project.tags.map((tag) => {
          const { Icon, accent } = getTechnology(tag);
          return (
            <li key={tag} style={{ "--technology-accent": accent }}>
              <Icon size={13} aria-hidden="true" />{tag}
            </li>
          );
        })}
      </ul>

      <div className="card__links">
        {project.live && project.live !== "#" && (
          <a
            className="card__link card__link--live"
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open live demo for ${project.title}`}
          >
            <ExternalLink size={15} aria-hidden="true" />
            Live demo
            <span className="card__link-pulse" aria-hidden="true" />
          </a>
        )}
        {project.repo && project.repo !== "#" && (
          <a className="card__link" href={project.repo} target="_blank" rel="noopener noreferrer" aria-label={`View source code for ${project.title}`}>
            <Code2 size={15} aria-hidden="true" />Source code<ArrowUpRight size={13} aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}
