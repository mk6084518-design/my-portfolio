import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap.js";

/**
 * Wrap any content in <Reveal> to reveal it on scroll.
 * When stagger={true}, direct children appear one after another.
 */
export default function Reveal({ children, stagger = false, as: Tag = "div", ...rest }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const targets = stagger ? ref.current.children : ref.current;
      gsap.from(targets, {
        y: 32,
        opacity: 0,
        duration: 0.75,
        stagger: stagger ? 0.09 : 0,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
          toggleActions: "play none none none",
          once: true,
        },
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} {...rest}>
      {children}
    </Tag>
  );
}
