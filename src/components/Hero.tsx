import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section id="home" className="relative h-screen min-h-[700px] flex flex-col justify-center items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://lirp.cdn-website.com/eccf826b/dms3rep/multi/opt/Lambo+2-1200h.jpg"
          alt="88 Exotic Car Rentals Boston"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-48 md:mt-20">
        <h1 className="text-[42px] md:text-[64px] lg:text-[76px] text-white font-serif leading-[1.1] mb-6 drop-shadow-lg">
          Boston's Most Exclusive<br />
          <span className="italic">Exotic Car Rentals</span>
        </h1>

        <p className="text-lg md:text-xl text-white/80 font-sans max-w-2xl mx-auto leading-relaxed drop-shadow-md tracking-wide">
          Lamborghini. Ferrari. Porsche. Rolls-Royce.<br className="hidden md:block" />
          Drive the extraordinary — available in Boston, Miami, Atlanta &amp; LA.
        </p>

        {/* Action Buttons */}
        <div className="relative z-10 mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate("/fleet")}
            className="group relative px-12 py-5 bg-white text-black font-extrabold text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:bg-black hover:text-white overflow-hidden rounded-sm"
          >
            <span className="relative z-10">View Fleet</span>
            <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0" />
          </button>
          
          <button
            onClick={() => {
              const element = document.getElementById("contact");
              if (element) element.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-12 py-5 bg-transparent border border-white/30 text-white font-extrabold text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white/10 hover:border-white rounded-sm"
          >
            Contact Us
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
           onClick={() => {
             const element = document.getElementById("fleet");
             if (element) element.scrollIntoView({ behavior: "smooth" });
           }}>
        <ChevronDown className="w-8 h-8 text-white" />
      </div>
    </section>
  );
};

export default Hero;