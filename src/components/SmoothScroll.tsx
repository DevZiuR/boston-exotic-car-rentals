"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

export interface SmoothScrollProps {
  children: React.ReactNode;
}

export const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 7. Skip Lenis entirely when prefers-reduced-motion is set
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      return;
    }

    // Tuned heavy smooth scroll (responsive yet weighted and buttery)
    const lenis = new Lenis({
      lerp: 0.055,
      wheelMultiplier: 0.75,
      smoothWheel: true,
      syncTouch: false,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    // 4. GSAP ScrollTrigger sync
    gsap.registerPlugin(ScrollTrigger);
    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // 5. Anchor links and nav items must scroll with lenis.scrollTo using 1.4s duration and offset equal to header height
    const handleAnchorClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }

      const link = (e.target as HTMLElement).closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      let targetId = "";
      if (href.startsWith("#") && href.length > 1) {
        targetId = href.slice(1);
      } else if (href.startsWith("/#") && href.length > 2 && window.location.pathname === "/") {
        targetId = href.slice(2);
      }

      if (targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          e.preventDefault();
          const header = document.querySelector("header");
          const headerHeight = header ? header.getBoundingClientRect().height : 80;
          lenis.scrollTo(targetElement, {
            offset: -headerHeight,
            duration: 1.4,
          });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
      delete window.lenis;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
};

export default SmoothScroll;

