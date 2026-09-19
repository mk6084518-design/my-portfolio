import { useRef, useState } from "react";
import { gsap, useGSAP } from "../../lib/gsap.js";
import { useMediaQuery } from "../../hooks/useMediaQuery.js";

export default function Cursor() {
  const ref = useRef(null);
  const [hover, setHover] = useState(false);
  const isTouch = useMediaQuery("(hover: none)");

  useGSAP(
    () => {
      if (isTouch) return;
      const x = gsap.quickTo(ref.current, "x", { duration: 0.35, ease: "power3" });
      const y = gsap.quickTo(ref.current, "y", { duration: 0.35, ease: "power3" });

      const onMove = (e) => {
        x(e.clientX);
        y(e.clientY);
        setHover(Boolean(e.target.closest("a, button")));
      };

      window.addEventListener("pointermove", onMove);
      return () => window.removeEventListener("pointermove", onMove);
    },
    { dependencies: [isTouch] }
  );

  if (isTouch) return null;

  return <div className={`cursor${hover ? " is-hover" : ""}`} ref={ref} aria-hidden="true" />;
}
