import { useRef, useState } from "react";
import { gsap, useGSAP } from "../../lib/gsap.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";
import { site } from "../../data/site.js";

export default function Preloader({ onDone }) {
  const ref = useRef(null);
  const countRef = useRef(null);
  const barRef = useRef(null);
  const [hidden, setHidden] = useState(false);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced) {
        setHidden(true);
        onDone?.();
        return;
      }

      document.body.style.overflow = "hidden";
      const progress = { n: 0 };

      gsap
        .timeline({
          onComplete: () => {
            document.body.style.overflow = "";
            setHidden(true);
            onDone?.();
          },
        })
        .to(progress, {
          n: 100,
          duration: 1.3,
          ease: "power2.inOut",
          onUpdate: () => {
            if (countRef.current) countRef.current.textContent = Math.round(progress.n);
          },
        })
        .to(barRef.current, { width: "100%", duration: 1.3, ease: "power2.inOut" }, 0)
        .to(ref.current, { yPercent: -100, duration: 0.8, ease: "power4.inOut" }, "+=0.1");
    },
    { scope: ref }
  );

  if (hidden) return null;

  return (
    <div className="preloader" ref={ref}>
      <div className="preloader__mark" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="preloader__capsule">
        <span>Loading</span>
        <strong ref={countRef}>0</strong>
        <span className="preloader__bar" aria-hidden="true">
          <i ref={barRef} />
        </span>
      </div>
      <p className="preloader__name">{site.name} / portfolio 2026</p>
    </div>
  );
}
