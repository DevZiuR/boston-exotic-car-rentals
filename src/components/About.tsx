import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealOnScroll from "./RevealOnScroll";

gsap.registerPlugin(ScrollTrigger);

const ABOUT_TEXT =
  "We built Smoove around the arrival. Galaxy-roof Escalades, Maybachs, Rolls-Royces and Sprinters, driven by professional chauffeurs, for airport transfers, nights out, events and photoshoots.";

const WORDS = ABOUT_TEXT.split(" ");

const About = () => {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener?.("change", handleChange);

    return () => {
      mediaQuery.removeEventListener?.("change", handleChange);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion || !paragraphRef.current) return;

    const ctx = gsap.context(() => {
      const words = paragraphRef.current?.querySelectorAll<HTMLElement>(".about-word");
      if (!words || words.length === 0) return;

      gsap.fromTo(
        words,
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: paragraphRef.current,
            start: "top 85%",
            end: "bottom 55%",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        }
      );
    }, paragraphRef);

    ScrollTrigger.refresh();
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 350);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(refreshTimer);
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <section
      id="about"
      className="relative bg-[#faf8f5] text-[#0b0b0e] py-10 sm:py-12 md:py-14 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-black/[0.05]"
    >
      <div className="container mx-auto max-w-4xl flex flex-col items-center text-center">
        {/* Pill Badge */}
        <RevealOnScroll className="flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.03)] mb-4 sm:mb-5">
            <span className="text-[#b3122e] text-xs font-bold leading-none select-none" aria-hidden="true">✱</span>
            <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#0b0b0e]">
              ABOUT US
            </span>
          </div>
        </RevealOnScroll>

        {/* Large Editorial Statement with Scroll-Driven Word Reveal */}
        <p
          ref={paragraphRef}
          className="about-statement text-[28px] sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[48px] font-normal leading-[1.24] sm:leading-[1.2] md:leading-[1.22] tracking-[-0.015em] text-center max-w-4xl mx-auto text-[#0b0b0e] break-words"
        >
          {WORDS.map((word, index) => (
            <React.Fragment key={index}>
              <span
                className="about-word inline-block"
                style={{ opacity: reducedMotion ? 1 : 0.15 }}
              >
                {word}
              </span>
              {index < WORDS.length - 1 ? " " : ""}
            </React.Fragment>
          ))}
        </p>
      </div>
    </section>
  );
};

export default About;