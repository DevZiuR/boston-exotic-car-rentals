import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RevealOnScroll from "./RevealOnScroll";

const BOOKING_URL = "https://smooveluxurybooking.as.me/schedule/b24e2156";

// Subtle galaxy starlight pinpoints inspired by the iconic Rolls-Royce star headliner
const STARS = [
  { top: "7%", left: "12%", size: 2, delay: 0.2, duration: 3.2, opacity: 0.7 },
  { top: "11%", left: "26%", size: 1.5, delay: 1.1, duration: 4.1, opacity: 0.6 },
  { top: "5%", left: "42%", size: 2.5, delay: 0.8, duration: 3.5, opacity: 0.8 },
  { top: "14%", left: "59%", size: 2, delay: 1.7, duration: 3.8, opacity: 0.7 },
  { top: "8%", left: "76%", size: 1.5, delay: 0.4, duration: 4.5, opacity: 0.5 },
  { top: "17%", left: "88%", size: 2, delay: 1.3, duration: 3.0, opacity: 0.75 },
  { top: "21%", left: "8%", size: 1.5, delay: 2.0, duration: 4.2, opacity: 0.6 },
  { top: "24%", left: "21%", size: 2.5, delay: 0.5, duration: 3.6, opacity: 0.85 },
  { top: "22%", left: "36%", size: 1.5, delay: 1.9, duration: 3.9, opacity: 0.65 },
  { top: "19%", left: "51%", size: 2, delay: 0.9, duration: 4.0, opacity: 0.7 },
  { top: "26%", left: "69%", size: 1.5, delay: 2.3, duration: 3.4, opacity: 0.6 },
  { top: "23%", left: "83%", size: 2, delay: 1.5, duration: 4.3, opacity: 0.7 },
  { top: "31%", left: "14%", size: 2, delay: 0.7, duration: 3.7, opacity: 0.7 },
  { top: "33%", left: "29%", size: 1.5, delay: 2.1, duration: 4.4, opacity: 0.55 },
  { top: "36%", left: "65%", size: 2, delay: 1.0, duration: 3.3, opacity: 0.75 },
  { top: "32%", left: "81%", size: 1.5, delay: 0.3, duration: 4.1, opacity: 0.6 },
  { top: "40%", left: "18%", size: 1.5, delay: 1.6, duration: 3.8, opacity: 0.5 },
  { top: "43%", left: "74%", size: 2, delay: 2.4, duration: 4.0, opacity: 0.65 },
  { top: "10%", left: "37%", size: 2, delay: 1.2, duration: 3.6, opacity: 0.7 },
  { top: "15%", left: "93%", size: 1.5, delay: 0.6, duration: 4.2, opacity: 0.6 },
  { top: "28%", left: "47%", size: 2.5, delay: 2.2, duration: 3.9, opacity: 0.8 },
  { top: "38%", left: "91%", size: 1.5, delay: 1.4, duration: 3.5, opacity: 0.55 },
];

const Hero = () => {
  const navigate = useNavigate();
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check prefers-reduced-motion: if enabled, disable parallax completely
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (bgRef.current) {
            const currentScroll = window.scrollY;
            // Background image parallax at ~0.8 scroll speed:
            // Relative to the hero section, the background scrolls at 0.8x,
            // shifting by (1.0 - 0.8) * scrollY = 0.2 * scrollY in container coordinate space.
            // Pure transform only, will-change: transform.
            const offset = currentScroll * 0.2;
            bgRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-28 pb-16">
      {/* Background Image with Parallax (~0.8 scroll speed, transform only, will-change: transform) */}
      <div
        ref={bgRef}
        className="absolute -top-[1%] left-0 right-0 -bottom-[12%] w-full h-[124%] z-0 flex items-center justify-center hero-parallax-bg"
        style={{ willChange: "transform", transform: "translate3d(0, 0, 0)" }}
      >
        {/* Mobile Background Video (cellphone view) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero-bg.png"
          className="w-full h-full object-cover md:hidden"
          ref={(el) => {
            if (el) {
              el.muted = true;
            }
          }}
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Desktop Background Image */}
        <img
          src="/images/hero-bg.png"
          alt="Smoove Luxury Transportation"
          className="hidden md:block w-full h-full object-cover"
        />
        {/* Dynamic vignette overlay: darker at top/bottom for contrast, clearer in center */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/75" />
      </div>

      {/* Subtle Starlight Shimmer */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none overflow-hidden starlight-shimmer-layer"
        aria-hidden="true"
      >
        {/* Soft sweeping starlight sheen */}
        <div className="absolute inset-0 hero-starlight-sheen" />

        {/* Delicate star pinpoints */}
        {STARS.map((star, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white hero-star-twinkle"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content with Consistent Scroll-Reveal */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto my-auto flex flex-col items-center justify-center">
        <RevealOnScroll isHeading className="flex flex-col items-center">

          <h1 className="text-[38px] sm:text-[56px] md:text-[76px] lg:text-[90px] text-white font-serif leading-[1.05] tracking-[-0.02em] mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] text-center">
            <span className="text-white">ARRIVE UNDER</span><br />
            <span className="hero-outline-stars italic">THE STARS.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/90 font-sans max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] tracking-wide">
            Chauffeured Escalades, Maybachs and Rolls-Royces, booked by the hour in the Tri-State, Atlanta and Miami.
          </p>
        </RevealOnScroll>

        {/* Action Buttons */}
        <RevealOnScroll delay={350} className="relative z-10 mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto max-w-md sm:max-w-none">
          <button
            onClick={() => window.open(BOOKING_URL, "_blank", "noopener,noreferrer")}
            className="cta-btn group relative w-full sm:w-auto min-h-[48px] px-8 py-3.5 bg-[#b3122e] text-white uppercase transition-all duration-300 hover:bg-[#8e0e24] overflow-hidden rounded-sm shadow-xl flex items-center justify-center"
          >
            <span className="relative z-10">Book Your Ride</span>
          </button>

          <button
            onClick={() => navigate("/fleet")}
            style={{ border: '1px solid rgba(255,255,255,0.7)' }}
            className="cta-btn w-full sm:w-auto min-h-[48px] px-8 py-3.5 bg-transparent text-white uppercase transition-all duration-300 rounded-sm hover:bg-[rgba(255,255,255,0.1)] flex items-center justify-center"
          >
            View the Fleet
          </button>
        </RevealOnScroll>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
        onClick={() => {
          const element = document.getElementById("services") || document.getElementById("fleet");
          if (element) element.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <ChevronDown className="w-8 h-8 text-white" />
      </div>
    </section>
  );
};

export default Hero;