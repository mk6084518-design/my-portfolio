import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap.js";
import { useMediaQuery } from "../../hooks/useMediaQuery.js";

/** Pointer ki taraf halka khinchne wala wrapper. Touch devices par off. */
export default function Magnetic({ children, strength = 0.35 }) {
  const ref = useRef(null);
  const isTouch = useMediaQuery("(hover: none)");

  useGSAP(
    () => {
      if (isTouch) return;
      const el = ref.current.firstElementChild || ref.current;
      const moveX = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
      const moveY = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });

      const onMove = (e) => {
        const r = ref.current.getBoundingClientRect();
        moveX((e.clientX - r.left - r.width / 2) * strength);
        moveY((e.clientY - r.top - r.height / 2) * strength);
      };
      const onLeave = () => {
        moveX(0);
        moveY(0);
      };

      ref.current.addEventListener("pointermove", onMove);
      ref.current.addEventListener("pointerleave", onLeave);
      return () => {
        ref.current?.removeEventListener("pointermove", onMove);
        ref.current?.removeEventListener("pointerleave", onLeave);
      };
    },
    { dependencies: [isTouch], scope: ref }
  );

  return (
    <span className="magnetic" ref={ref}>
      {children}
    </span>
  );
}
