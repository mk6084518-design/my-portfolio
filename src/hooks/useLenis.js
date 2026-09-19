import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "../lib/gsap.js";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion.js";

let lenisInstance = null;

export function useLenis() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef(null);

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      syncTouch: true,
      autoRaf: false,
    });
    lenisInstance = lenis;
    ref.current = lenis;

    // Lenis ko GSAP ticker par chalao — warna do RAF loops se jitter aata hai.
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const onResize = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, [reduced]);

  return ref;
}

export function scrollToSection(hash) {
  if (lenisInstance) lenisInstance.scrollTo(hash, { offset: -80 });
  else document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
}
