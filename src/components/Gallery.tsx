import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";

const fleet = [
  {
    id: 1,
    location: "Boston",
    src: "https://lirp.cdn-website.com/eccf826b/dms3rep/multi/opt/IMG_1053-412c3995-9a0f2a9c-1920w.png",
    title: "Lamborghini Huracán LP 580",
    price: "$1,099/day",
    description: "Boston Inventory",
  },
  {
    id: 2,
    location: "Miami",
    src: "https://lirp.cdn-website.com/eccf826b/dms3rep/multi/opt/DSC07218-1000h.jpg",
    title: "Lamborghini Urus Performante",
    price: "$1,499/day",
    description: "Miami Inventory",
  },
  {
    id: 3,
    location: "Atlanta",
    src: "https://lirp.cdn-website.com/eccf826b/dms3rep/multi/opt/DSC08377-1920w.png",
    title: "Rolls Royce Ghost",
    price: "$1,699/day",
    description: "Atlanta Inventory",
  },
  {
    id: 4,
    location: "Atlanta",
    src: "https://lirp.cdn-website.com/eccf826b/dms3rep/multi/opt/DSC02471-1920w.jpeg",
    title: "Lamborghini Urus S",
    price: "$1,299/day",
    description: "Atlanta Inventory",
  },
  {
    id: 5,
    location: "Atlanta",
    src: "https://lirp.cdn-website.com/eccf826b/dms3rep/multi/opt/DSC05499-1920w.jpeg",
    title: "McLaren 570s",
    price: "$1,379/day",
    description: "Atlanta Inventory",
  },
  {
    id: 6,
    location: "Los Angeles",
    src: "https://lirp.cdn-website.com/eccf826b/dms3rep/multi/opt/P2240094-1920w.jpeg",
    title: "Tesla Cyber Truck",
    price: "$999/day",
    description: "Los Angeles Inventory",
  },
  {
    id: 7,
    location: "Los Angeles",
    src: "https://lirp.cdn-website.com/eccf826b/dms3rep/multi/opt/P2217147-1920w.jpeg",
    title: "Rolls Royce Dawn",
    price: "$1,599/day",
    description: "Los Angeles Inventory",
  },
  {
    id: 8,
    location: "Los Angeles",
    src: "https://lirp.cdn-website.com/eccf826b/dms3rep/multi/opt/P2217165-1920w.jpeg",
    title: "Lamborghini Urus S",
    price: "$1,399/day",
    description: "Los Angeles Inventory",
  }
];

const cities = ["All", "Boston", "Miami", "Atlanta", "Los Angeles"];

const Gallery = () => {
  const [activeCity, setActiveCity] = useState("All");

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="rooms" className="py-20 md:py-32 bg-[#111111] text-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 gap-8">
          <div className="flex flex-col space-y-6">
            <span className="w-fit inline-block px-3 py-1 border border-gray-700 text-[10px] md:text-xs font-bold tracking-widest uppercase">
              OUR FLEET
            </span>
            <div className="space-y-2">
              <h2 className="text-4xl md:text-5xl lg:text-5xl font-normal text-white leading-tight tracking-tight">
                Exotic Vehicles Designed for the Drive
              </h2>
              <p className="text-gray-400 text-lg md:text-xl font-medium tracking-wide">
                Experience unparalleled power, luxury, and prestige.
              </p>
            </div>
          </div>

          <div className="flex items-center h-full">
            <div className="hidden md:block h-20 w-[1px] bg-gray-800 mr-8"></div>
            <button
              onClick={scrollToContact}
              className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-gray-300 transition-colors "
            >
              RESERVAR AHORA <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </div>
        </div>

        {/* City Filter */}
        <div className="flex flex-wrap gap-4 mb-10">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setActiveCity(city)}
              className={`px-5 py-2 border text-[11px] font-bold uppercase tracking-widest transition-colors ${activeCity === city
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-gray-400 border-gray-700 hover:border-white hover:text-white"
                }`}
            >
              {city}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {(activeCity === "All" ? fleet : fleet.filter(car => car.location === activeCity)).map((car) => (
            <RevealOnScroll key={car.id} animation="slide-up">
              <div className="group relative flex flex-col space-y-4">
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-gray-900 flex items-center justify-center">
                  <img
                    src={car.src}
                    alt={car.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-white text-black px-3 py-1 text-sm font-bold">
                    {car.price}
                  </div>
                  {/* Subtle Overlay */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                    {car.title}
                  </h3>
                  <p className="text-gray-500 text-sm font-medium">
                    {car.description}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 text-base">
            All rentals include 100 miles per day and 24/7 roadside assistance.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Gallery;