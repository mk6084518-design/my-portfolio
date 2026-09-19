import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap.js";

export default function ProjectCard({ project }) {
  const ref = useRef(null);

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
    },
    { scope: ref }
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
      <h3 className="card__title">{project.title}</h3>
      <p className="card__desc">{project.tagline}</p>

      <ul className="card__points">
        {project.points.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>

      <ul className="chip-list card__tags">
        {project.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
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
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 3h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm0 4v12h16V7H4Zm2 2h12v2H6V9Zm0 4h7v2H6v-2Z" />
              <circle cx="7" cy="5" r=".75" />
              <circle cx="10" cy="5" r=".75" />
            </svg>
            Live demo
            <span className="card__link-pulse" aria-hidden="true" />
          </a>
        )}
        {project.repo && project.repo !== "#" && (
          <a className="card__link" href={project.repo} target="_blank" rel="noopener noreferrer">
            Source code
          </a>
        )}
      </div>
    </article>
  );
}
