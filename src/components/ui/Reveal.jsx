import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/**
 * Wrap any content in <Reveal> to reveal it on scroll.
 * When stagger={true}, direct children appear one after another.
 */
export default function Reveal({ children, stagger = false, as: Tag = "div", ...rest }) {
  const ref = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const targets = stagger ? ref.current.children : ref.current;
      gsap.from(targets, {
        y: 20,
        scale: 1.08,
        filter: "blur(3px)",
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: stagger ? 0.09 : 0,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
          toggleActions: "play none none none",
          once: true,
        },
      });
    },
    { dependencies: [prefersReducedMotion], scope: ref }
  );

  return (
    <Tag ref={ref} {...rest}>
      {children}
    </Tag>
  );
}
