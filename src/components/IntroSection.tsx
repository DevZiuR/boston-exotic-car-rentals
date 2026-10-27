import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const IntroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll-driven animation tracking section entry through center viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  // Motion transforms driven directly by scroll position
  const containerOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.25, 0.8, 1]);
  const containerY = useTransform(scrollYProgress, [0, 1], [45, 0]);
  const containerScale = useTransform(scrollYProgress, [0, 1], [0.97, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#f5f2ed] text-[#0b0b0e] overflow-hidden"
      style={{
        paddingTop: "clamp(96px, 12vw, 180px)",
        paddingBottom: "clamp(96px, 12vw, 180px)",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
          style={
            shouldReduceMotion
              ? {}
              : {
                  opacity: containerOpacity,
                  y: containerY,
                  scale: containerScale,
                }
          }
        >
          {/* Eyebrow: 12px, letter-spacing 0.3em, crimson #b3122e */}
          <span className="text-[12px] tracking-[0.3em] text-[#b3122e] uppercase font-mono font-bold mb-6 sm:mb-8 block">
            PREMIUM CHAUFFEURS
          </span>

          {/* Headline: Display serif, sentence case (no uppercase), clamp(2.5rem, 5.5vw, 5rem), 'arrival' in italic */}
          <h2
            className="font-serif font-normal text-[#0b0b0e] leading-[1.08] tracking-[-0.015em] mb-6 sm:mb-8 text-center"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 5rem)" }}
          >
            Every ride, an <em className="italic font-serif">arrival</em>.
          </h2>

          {/* Subline: body #5b5b63, 18px, max-width 560px, centered */}
          <p className="text-[18px] text-[#5b5b63] font-sans leading-relaxed max-w-[560px] mx-auto text-center">
            Airport transfers, nights out, events and photoshoots. Chauffeured by the hour in the Tri-State, Atlanta and Miami.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default IntroSection;
