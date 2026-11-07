import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#07070a] text-white">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold font-serif text-white">404</h1>
        <p className="mb-4 text-xl text-zinc-400 font-sans">Oops! Page not found</p>
        <a href="/" className="inline-block mt-2 px-6 py-3 bg-[#b3122e] text-white font-bold uppercase tracking-wider text-xs rounded-sm hover:bg-[#8e0e24] transition-colors">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
