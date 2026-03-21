import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const cities = [
  {
    label: "All Vehicles",
    value: "all",
    image: "https://lirp.cdn-website.com/eccf826b/dms3rep/multi/opt/DSC07218-1000h.jpg",
    count: "8 vehicles",
  },
  {
    label: "Boston",
    value: "Boston",
    image: "https://www.bu.edu/admissions/files/2018/07/17-2005-AERIALS-101-cropped-e1535295662889-1200x675.jpg",
    count: "1 vehicle",
  },
  {
    label: "Miami",
    value: "Miami",
    image: "https://www.jetbluevacations.com/cdn-cgi/image/f=auto,width=1920,height=1080/https://www.jetbluevacations.com/media/MIA_downtown_miami_38d2ff7562/MIA_downtown_miami_38d2ff7562.jpg",
    count: "1 vehicle",
  },
  {
    label: "Atlanta",
    value: "Atlanta",
    image: "https://media.cntraveler.com/photos/68d58043d2572d5127695fe6/16:9/w_2992,h_1683,c_limit/092525-Unwritten-Rules-Atlanta-GettyImages-1365974686webres-final.jpg",
    count: "3 vehicles",
  },
  {
    label: "Los Angeles",
    value: "Los Angeles",
    image: "https://www.civitatis.com/blog/wp-content/uploads/2025/01/los-angeles-scaled.jpg",
    count: "3 vehicles",
  },
];

const navLinks = [
  { name: "Rental Vehicles", path: "/fleet", hasDropdown: true },
  { name: "Chauffeur Services", id: "chauffeur" },
  { name: "PhotoShoot Rentals", id: "photoshoot" },
  { name: "Requirements", id: "services" },
  { name: "About", id: "about" },
  { name: "FAQs", id: "faq" },
  { name: "Shop", id: "shop" },
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

  const handleNavClick = (link: { name: string; id?: string; path?: string }) => {
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
  };

  const handleCityClick = (city: string) => {
    setFleetDropdownOpen(false);
    if (city === "all") {
      navigate("/fleet");
    } else {
      navigate(`/fleet?city=${encodeURIComponent(city)}`);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const isHomePage = location.pathname === "/";

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${!isHomePage || scrolled
        ? "bg-black backdrop-blur-md lg:pb-4"
        : "bg-black lg:bg-transparent"
        }`}
    >
      {/* Promo Top Bar */}
      <div className="w-full bg-black py-2 text-center border-b border-white/10">
        <span className="text-white text-[10px] md:text-xs font-bold tracking-widest uppercase">
          🔥 LIMITED TIME: Book 3 Days &amp; Your 4th Day Is FREE! 🔥
        </span>
      </div>

      <div className={`w-full px-4 sm:px-6 lg:px-8 transition-all duration-300 ${scrolled ? "mt-2 sm:mt-4" : "mt-4 sm:mt-6"}`}>
        <div className="max-w-[1400px] mx-auto border border-white/20 bg-black lg:bg-white/5 backdrop-blur-sm rounded-none md:rounded-sm flex items-stretch min-h-[70px]">

          {/* Logo Section */}
          <div
            className="flex items-center px-6 border-r border-white/20 cursor-pointer"
            onClick={() => handleNavClick({ name: "Home", id: "home" })}
          >
            <img
              src="https://lirp.cdn-website.com/eccf826b/dms3rep/multi/opt/noBgColor--282-29-e9c2541f-1920w.png"
              alt="88 Exotic Car Rentals Boston"
              className="h-12 w-auto object-contain transition-all duration-300"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 justify-end items-center px-8 border-r border-white/20">
            <nav className="flex items-center gap-6">
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
                          <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500 font-bold mb-4">Browse by City</p>
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
          <div className="hidden lg:block">
            <button
              onClick={() => handleNavClick({ name: "Contact", id: "contact" })}
              className="h-full px-10 bg-black hover:bg-gray-900 border-l border-white/20 text-white font-bold text-sm uppercase tracking-widest transition-colors flex items-center justify-center whitespace-nowrap"
            >
              Reserve Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex-1 flex justify-end items-center px-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:bg-white/10"
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
          <div className="bg-black border-b border-white/10 flex items-center justify-between px-4 py-4 min-h-[90px] flex-shrink-0">
            <img
              src="https://lirp.cdn-website.com/eccf826b/dms3rep/multi/opt/noBgColor--282-29-e9c2541f-1920w.png"
              alt="88 Exotic"
              className="h-10 w-auto object-contain"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/10"
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
                    className="block w-full text-left text-xl font-bold text-white border-b border-white/10 py-5 uppercase tracking-wide hover:text-gray-300 transition-colors"
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
                          className="flex items-center justify-between w-full text-sm text-gray-400 hover:text-white transition-colors py-2"
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
                className="w-full bg-white text-black py-6 text-base font-bold uppercase tracking-wider rounded-none hover:bg-gray-100"
                onClick={() => handleNavClick({ name: "Contact", id: "contact" })}
              >
                Reserve Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;