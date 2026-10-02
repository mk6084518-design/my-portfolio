import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap.js";

export default function Counter({ value, suffix = "" }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const obj = { n: 0 };
      gsap.to(obj, {
        n: value,
        duration: 1.6,
        ease: "power2.out",
        onUpdate: () => {
          ref.current.textContent = Math.round(obj.n) + suffix;
        },
        scrollTrigger: { trigger: ref.current, start: "top 92%", once: true },
      });
    },
    { scope: ref }
  );

  return <span ref={ref}>0{suffix}</span>;
}
