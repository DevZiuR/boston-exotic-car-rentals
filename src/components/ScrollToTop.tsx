import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const header = document.querySelector("header");
          const headerHeight = header ? header.getBoundingClientRect().height : 80;
          if (window.lenis) {
            window.lenis.scrollTo(element, { offset: -headerHeight, duration: 1.4 });
          } else {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, 50);
      return;
    }
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
