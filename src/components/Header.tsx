import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate, useLocation } from "react-router-dom";

export const BOOKING_URL = "https://smooveluxurybooking.as.me/schedule/b24e2156";

const cities = [
  {
    label: "All Vehicles",
    value: "all",
    image: "https://lirp.cdn-website.com/eccf826b/dms3rep/multi/opt/DSC07218-1000h.jpg",
    count: "Our full fleet",
  },
  {
    label: "New York",
    value: "New York",
    image: "https://www.bu.edu/admissions/files/2018/07/17-2005-AERIALS-101-cropped-e1535295662889-1200x675.jpg",
    count: "NYC & Tri-State",
  },
  {
    label: "Miami",
    value: "Miami",
    image: "https://www.jetbluevacations.com/cdn-cgi/image/f=auto,width=1920,height=1080/https://www.jetbluevacations.com/media/MIA_downtown_miami_38d2ff7562/MIA_downtown_miami_38d2ff7562.jpg",
    count: "South Florida",
  },
  {
    label: "Atlanta",
    value: "Atlanta",
    image: "https://media.cntraveler.com/photos/68d58043d2572d5127695fe6/16:9/w_2992,h_1683,c_limit/092525-Unwritten-Rules-Atlanta-GettyImages-1365974686webres-final.jpg",
    count: "Metro Atlanta",
  },
  {
    label: "Nationwide",
    value: "Nationwide",
    image: "https://www.civitatis.com/blog/wp-content/uploads/2025/01/los-angeles-scaled.jpg",
    count: "All 50 states + countries",
  },
];

const navLinks = [
  /// { name: "Reserve Fleet", path: "/fleet", hasDropdown: true },
  { name: "Our Fleet", id: "fleet" },
  { name: "PhotoShoots", id: "photoshoots" },
  { name: "Policies", id: "policies" },
  { name: "About", id: "about" },
  { name: "FAQs", id: "faq" },
  { name: "Contact", id: "contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [fleetDropdownOpen, setFleetDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setFleetDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  }, []);

  const handleNavClick = useCallback((link: { name: string; id?: string; path?: string }) => {
    setIsOpen(false);
    setFleetDropdownOpen(false);
    if (link.path) {
      navigate(link.path);
    } else if (link.id) {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          scrollToSection(link.id!);
        }, 100);
      } else {
        scrollToSection(link.id);
      }
    }
  }, [navigate, location.pathname, scrollToSection]);

  const handleCityClick = useCallback((city: string) => {
    setFleetDropdownOpen(false);
    if (city === "all") {
      navigate("/fleet");
    } else {
      navigate(`/fleet?city=${encodeURIComponent(city)}`);
    }
  }, [navigate]);

  const isHomePage = location.pathname === "/";

  return (
    <header className="fixed w-full z-50 bg-black border-b border-white/10 transition-all duration-300">
      {/* Promo Top Bar 
      {/* 
      <div className="w-full bg-black py-2 text-center border-b border-white/10">
        <span className="text-white text-[10px] md:text-xs font-bold tracking-widest uppercase">
          ✨ Executive Luxury Transportation · Now Serving All 50 States + Countries 🌎
        </span>
      </div>
      */}

      {/* Below Top Bar Navbar */}
      <div className="w-full bg-black px-4 sm:px-6 lg:px-6 py-1">
        <div className="max-w-[1400px] mx-auto border border-white/20 bg-black rounded-none md:rounded-sm flex items-stretch min-h-[70px]">

          {/* Logo Section */}
          <div
            className="flex items-center px-3 sm:px-6 border-white/20 cursor-pointer"
            onClick={() => handleNavClick({ name: "Home", id: "home" })}
          >
            <img
              src="/images/logo.png"
              alt="Smoove Luxury Transportation"
              className="h-14 sm:h-18 md:h-20 lg:h-24 w-auto object-contain transition-all duration-300"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 justify-center items-center px-6">
            <nav className="flex items-center gap-5">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  /* Fleet dropdown trigger */
                  <div
                    key={link.name}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={() => setFleetDropdownOpen(true)}
                    onMouseLeave={() => setFleetDropdownOpen(false)}
                  >
                    <button
                      onClick={() => handleNavClick(link)}
                      className="flex items-center gap-1.5 text-white hover:text-gray-300 font-bold font-onest text-sm tracking-wider uppercase transition-colors py-4 whitespace-nowrap"
                    >
                      {link.name}
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${fleetDropdownOpen ? "rotate-180" : "rotate-0"
                          }`}
                      />
                    </button>

                    {/* Horizontal Mega-menu */}
                    <div
                      className={`fixed left-0 right-0 top-full transition-all duration-300 origin-top ${fleetDropdownOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-3 pointer-events-none"
                        }`}
                    >
                      <div className="bg-black border-t border-white/10 shadow-2xl px-6 py-6">
                        <div className="max-w-[1400px] mx-auto">
                          <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500 font-bold mb-4">Browse by Area</p>
                          <div className="grid grid-cols-5 gap-3">
                            {cities.map((city) => (
                              <button
                                key={city.value}
                                onClick={() => handleCityClick(city.value)}
                                className="group relative h-36 overflow-hidden rounded-sm text-left focus:outline-none"
                              >
                                {/* BG image */}
                                <img
                                  src={city.image}
                                  alt={city.label}
                                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                {/* Dark overlay */}
                                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300" />
                                {/* Border highlight on hover */}
                                <div className="absolute inset-0 border border-white/0 group-hover:border-white/60 transition-all duration-300" />
                                {/* Text */}
                                <div className="absolute bottom-0 left-0 right-0 p-3">
                                  <p className="text-white font-extrabold text-sm uppercase tracking-widest leading-tight drop-shadow-lg">
                                    {city.label}
                                  </p>
                                  <p className="text-white/60 text-[10px] tracking-wider mt-0.5">{city.count}</p>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link)}
                    className="text-white hover:text-gray-300 font-bold font-onest text-sm tracking-wider uppercase transition-colors py-4 whitespace-nowrap"
                  >
                    {link.name}
                  </button>
                )
              )}
            </nav>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center px-6">
            <button
              onClick={() => window.open(BOOKING_URL, "_blank", "noopener,noreferrer")}
              className="cta-btn py-3 px-10 bg-[#b3122e] hover:bg-[#8e0e24] text-white uppercase transition-colors flex items-center justify-center whitespace-nowrap rounded-lg shadow-md"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex-1 flex justify-end items-center px-2 sm:px-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:bg-white/10 w-12 h-12 min-h-[48px] min-w-[48px] flex items-center justify-center p-0"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black z-[999] lg:hidden flex flex-col h-[100dvh] w-screen" style={{ top: 0 }}>
          {/* Close bar at top — matches header height */}
          <div className="bg-black border-b border-white/10 flex items-center justify-between px-4 py-4 min-h-[70px] sm:min-h-[90px] flex-shrink-0">
            <img
              src="/images/logo.png"
              alt="Smoove Luxury Transportation"
              className="h-12 sm:h-14 w-auto object-contain"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/10 w-12 h-12 min-h-[48px] min-w-[48px] flex items-center justify-center p-0"
              aria-label="Close navigation menu"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Nav links */}
          <div className="flex-1 overflow-y-auto bg-black px-6 pt-6 pb-32">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <button
                    onClick={() => handleNavClick(link)}
                    className="flex items-center w-full text-left text-xl font-bold text-white border-b border-white/10 min-h-[48px] py-4 uppercase tracking-wide hover:text-gray-300 transition-colors"
                  >
                    {link.name}
                  </button>
                  {/* Mobile city sub-links */}
                  {link.hasDropdown && (
                    <div className="pl-4 py-3 space-y-2 border-b border-white/10">
                      {cities.map((city) => (
                        <button
                          key={city.value}
                          onClick={() => { setIsOpen(false); handleCityClick(city.value); }}
                          className="flex items-center justify-between w-full min-h-[44px] text-sm text-gray-400 hover:text-white transition-colors py-2.5"
                        >
                          <span className="uppercase tracking-wider font-semibold">{city.label}</span>
                          <span className="text-gray-600 text-xs">{city.count}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button
                className="cta-btn w-full bg-[#b3122e] text-white min-h-[48px] py-4 uppercase rounded-none hover:bg-[#8e0e24]"
                onClick={() => window.open(BOOKING_URL, "_blank", "noopener,noreferrer")}
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;