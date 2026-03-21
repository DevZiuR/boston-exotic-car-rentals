import { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (!w.chatbase || w.chatbase("getState") !== "initialized") {
      w.chatbase = (...args: any[]) => {
        if (!w.chatbase.q) w.chatbase.q = [];
        w.chatbase.q.push(args);
      };
      w.chatbase = new Proxy(w.chatbase, {
        get(target: any, prop: string) {
          if (prop === "q") return target.q;
          return (...args: any[]) => target(prop, ...args);
        },
      });
    }

    const onLoad = () => {
      if (document.getElementById("p0FAns6pyRrJ0GRE8TRIQ")) return; // avoid duplicate
      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = "p0FAns6pyRrJ0GRE8TRIQ";
      (script as any).domain = "www.chatbase.co";
      document.body.appendChild(script);
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
      return () => window.removeEventListener("load", onLoad);
    }
  }, []);

  return null;
};

export default Chatbot;
