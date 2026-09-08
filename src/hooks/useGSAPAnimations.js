import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal() {
  useEffect(() => {
    // Reveal project cards on scroll
    gsap.utils.toArray(".project-card").forEach((element) => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
          markers: false,
        },
        opacity: 0,
        y: 50,
        duration: 1,
      });
    });
  }, []);
}

export function useParallax() {
  useEffect(() => {
    gsap.utils.toArray(".parallax-element").forEach((element) => {
      gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          start: "top center",
          end: "bottom center",
          scrub: 1,
          markers: false,
        },
        y: -100,
        duration: 2,
      });
    });
  }, []);
}

export function useMagneticButton() {
  return (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: "power2.out",
    });
  };
}

export function useMagneticButtonReset() {
  return () => {
    gsap.to("button, a", {
      x: 0,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };
}
