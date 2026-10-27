import { useState, useMemo } from "react";
import { ArrowUpRight, MapPin, Car as CarIcon } from "lucide-react";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/RevealOnScroll";
import { useNavigate } from "react-router-dom";
import { cars as allFleet, Car } from "@/data/fleet";

const BOOKING_URL = "https://smooveluxurybooking.as.me/schedule/b24e2156";

const cleanTitle = (title: string) => title.replace(/\s*\((ATL|MIA)\)/gi, "").trim();

const formatSeatsMin = (car: Car) => {
  const seatsRaw = (car.seats || "4-6").replace(/\s*(Seats|Seat|Max|Passengers|Pax)\s*/gi, "").trim();
  const minRaw = (car.minHours || "3-4").replace(/\s*(Hours|Hour)\s*/gi, "").trim();
  return `${seatsRaw} seats · ${minRaw} hr min`;
};

// 12 curated flagship vehicles (one card per vehicle, zero duplicates, 9-12 vehicles)
const SELECTED_VEHICLE_IDS = [1, 2, 3, 14, 12, 13, 5, 6, 7, 8, 9, 10];

type FilterKey = "all" | "tristate" | "atlanta" | "miami" | "suv" | "sprinter" | "exotics";

interface FilterTab {
  key: FilterKey;
  label: string;
}

const FILTER_TABS: FilterTab[] = [
  { key: "all", label: "All Vehicles" },
  { key: "tristate", label: "Tri-State" },
  { key: "atlanta", label: "Atlanta" },
  { key: "miami", label: "Miami" },
  { key: "suv", label: "SUV" },
  { key: "sprinter", label: "Sprinter" },
  { key: "exotics", label: "Maybach / Rolls-Royce" },
];

const getLocationLabel = (car: Car) => {
  if (car.location === "Atlanta") return "Atlanta, GA";
  if (car.location === "Miami") return "Miami, FL";
  if (car.location === "New York") return "Tri-State";
  return "Nationwide";
};

const Gallery = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  // Keep exactly the 12 selected vehicles with no duplicates
  const homeFleet: Car[] = useMemo(() => {
    const map = new Map<number, Car>();
    allFleet.forEach((car) => {
      if (SELECTED_VEHICLE_IDS.includes(car.id)) {
        map.set(car.id, car);
      }
    });
    return SELECTED_VEHICLE_IDS.map((id) => map.get(id)!).filter(Boolean);
  }, []);

  const matchesFilter = (car: Car, filter: FilterKey): boolean => {
    switch (filter) {
      case "tristate":
        return car.location === "New York" || car.location === "Nationwide";
      case "atlanta":
        return car.location === "Atlanta" || car.location === "Nationwide";
      case "miami":
        return car.location === "Miami" || car.location === "Nationwide";
      case "suv":
        return (
          car.bodyStyle.includes("SUV") ||
          car.title.includes("Escalade") ||
          car.title.includes("Suburban") ||
          car.title.includes("Yukon") ||
          car.title.includes("G-Wagon")
        );
      case "sprinter":
        return car.bodyStyle.includes("Sprinter") || car.title.toLowerCase().includes("sprinter");
      case "exotics":
        return (
          car.make === "Rolls-Royce" ||
          car.make === "Mercedes-Maybach" ||
          car.title.toLowerCase().includes("rolls") ||
          car.title.toLowerCase().includes("maybach")
        );
      case "all":
      default:
        return true;
    }
  };

  const filteredFleet = useMemo(() => {
    return homeFleet.filter((car) => matchesFilter(car, activeFilter));
  }, [homeFleet, activeFilter]);

  return (
    <section id="fleet" className="py-20 md:py-32 bg-[#f5f2ed] text-[#0b0b0e] overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">

        {/* Section Header */}
        <RevealOnScroll isHeading>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-12 gap-6">
            <div className="flex flex-col space-y-4">
              <div className="space-y-2">
                <h2 className="text-4xl md:text-5xl lg:text-5xl font-normal text-[#0b0b0e] leading-tight tracking-tight">
                  Luxury Vehicles for Every Occasion
                </h2>
                <p className="text-[#5b5b63] text-base md:text-lg font-medium tracking-wide max-w-2xl">
                  Chauffeur-driven comfort, power, and prestige across the Tri-State, Atlanta, and Miami.
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <button
                onClick={() => navigate("/fleet")}
                className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#b3122e] hover:text-[#0b0b0e] transition-colors py-2"
              >
                VIEW FULL FLEET <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </div>
          </div>
        </RevealOnScroll>

        {/* Filter Tabs with Active Filter Underline Crimson #b3122e */}
        <RevealOnScroll delay={80} className="overflow-hidden">
          <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto pb-3 mb-10 scrollbar-none border-b border-[rgba(0,0,0,0.08)]">
            {FILTER_TABS.map((tab) => {
              const count =
                tab.key === "all"
                  ? homeFleet.length
                  : homeFleet.filter((car) => matchesFilter(car, tab.key)).length;
              const isActive = activeFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveFilter(tab.key)}
                  className={`relative flex-shrink-0 min-h-[44px] pb-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors duration-200 flex items-center gap-2 bg-transparent border-0 shadow-none outline-none ${isActive
                    ? "text-[#0b0b0e]"
                    : "text-[#5b5b63] hover:text-[#0b0b0e]"
                    }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full transition-colors ${isActive
                      ? "bg-[#b3122e] text-white font-extrabold"
                      : "bg-[rgba(0,0,0,0.06)] text-[#5b5b63]"
                      }`}
                  >
                    {count}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#b3122e]" />
                  )}
                </button>
              );
            })}
          </div>
        </RevealOnScroll>

        {/* Vehicle Cards Grid (No card borders or shadows) */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredFleet.map((car) => (
            <StaggerItem key={car.id} className="h-full">
              <div
                className="group relative flex flex-col bg-white rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer h-full border-0 shadow-none"
                onClick={() => navigate(`/fleet/${car.slug}`)}
              >
                {/* 16:10 Photo Ratio Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-200">
                  {car.image ? (
                    <img
                      src={car.image}
                      alt={cleanTitle(car.title)}
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/fleet/galaxy-starlight.jpg";
                      }}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-100 text-neutral-500">
                      <CarIcon className="w-10 h-10 mb-2 stroke-[1.5] text-neutral-500" />
                      <span className="text-[11px] uppercase tracking-widest font-mono text-neutral-500">Photo Coming Soon</span>
                    </div>
                  )}

                  {/* Gradient Scrim for Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                  {/* Top-Left: Location Pill */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-1 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider text-white">
                    <MapPin className="w-3 h-3 text-[#b3122e]" />
                    <span>{getLocationLabel(car)}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex flex-col flex-1 justify-between gap-4 bg-white">
                  <div>
                    {/* Vehicle Name (without (ATL)/(MIA)) */}
                    <h3 className="text-xl font-bold text-[#0b0b0e] tracking-tight group-hover:text-[#b3122e] transition-colors line-clamp-1">
                      {cleanTitle(car.title)}
                    </h3>

                    {/* One Muted Line: N seats · N hr min */}
                    <p className="text-xs text-[#5b5b63] font-sans mt-1">
                      {formatSeatsMin(car)}
                    </p>
                  </div>

                  {/* Bottom Action Row: "$X/hr" and Book Now Button */}
                  <div className="flex items-center justify-between gap-3 pt-3 border-t border-[rgba(0,0,0,0.08)] mt-auto">
                    <div>
                      {car.price ? (
                        <div className="text-lg font-bold text-[#0b0b0e]">
                          <span className="text-[#b3122e]">{car.price}</span>
                          <span className="text-xs text-[#5b5b63] font-normal">/hr</span>
                        </div>
                      ) : (
                        <span className="text-sm font-bold text-[#5b5b63]">Ask for rate</span>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!car.price || car.bookingUrl === "#contact") {
                          const el = document.getElementById("contact");
                          if (el) {
                            el.scrollIntoView({ behavior: "smooth" });
                          } else {
                            navigate("/#contact");
                          }
                        } else {
                          window.open(car.bookingUrl || BOOKING_URL, "_blank", "noopener,noreferrer");
                        }
                      }}
                      className="cta-btn px-4 py-2.5 min-h-[44px] bg-[#b3122e] hover:bg-[#8e0e24] text-white uppercase rounded-lg transition-all duration-300 flex items-center gap-1.5 flex-shrink-0 border-0 shadow-none"
                    >
                      <span>{car.price ? "Book Now" : "Ask for Rate"}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Footer Note */}
        <RevealOnScroll delay={150} className="mt-12 text-center">
          <p className="text-[#5b5b63] text-sm md:text-base">
            All vehicles are chauffeur-driven with professional uniformed drivers. 50% deposit confirms reservation. Tolls billed separately.
          </p>
        </RevealOnScroll>

      </div>
    </section>
  );
};

export default Gallery;