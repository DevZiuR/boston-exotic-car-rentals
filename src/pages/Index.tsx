import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MobileCTA from "@/components/MobileCTA";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Policies from "@/components/Policies";
import Photoshoots from "@/components/Photoshoots";
import EmergencyCall from "@/components/EmergencyCall";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import PreFooterCTA from "@/components/PreFooterCTA";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let context: { revert: () => void } | undefined;

    const setup = () => {
      const hero = heroRef.current;
      const curtain = document.getElementById("curtain-overlay");
      if (!hero || !curtain) return;

      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mediaQuery.matches) return;

      context = gsap.context(() => {
        gsap.fromTo(
          hero,
          { scale: 1, opacity: 1 },
          {
            scale: 0.95,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: curtain,
              start: "top bottom",
              end: () => `top top+=${window.innerWidth >= 768 ? 120 : 0}`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      ScrollTrigger.refresh();
    };

    setup();

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(refreshTimer);
      context?.revert();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#07070a] text-white pb-16 lg:pb-0 overflow-x-clip">
      <Header />
      <Hero ref={heroRef} />
      <main
        id="curtain-overlay"
        className="relative z-[2] bg-[#07070a] text-white shadow-[0_-25px_60px_rgba(0,0,0,0.9)]"
      >
        <About />
        <Gallery />

        <Policies />
        <Photoshoots />
        <EmergencyCall />
        <Reviews />
        <Contact />
        <FAQ />
        <PreFooterCTA />
        <Footer />
      </main>

      <MobileCTA />
    </div>
  );
};

export default Index;
