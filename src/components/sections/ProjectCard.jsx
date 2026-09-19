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

  // Hover glow pointer ko follow karta hai
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
          <a href={project.live} target="_blank" rel="noopener noreferrer">
            Live demo
          </a>
        )}
        {project.repo && project.repo !== "#" && (
          <a href={project.repo} target="_blank" rel="noopener noreferrer">
            Source code
          </a>
        )}
      </div>
    </article>
  );
}
