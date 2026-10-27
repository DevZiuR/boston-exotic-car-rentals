import { useState, useMemo } from "react";
import { ArrowUpRight, Search, Wine, Sparkles, Users, Flame, Clock, CalendarCheck } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";
import { bookingServices, bookingAddons } from "@/data/bookingServices";

type CategoryFilter = "all" | "tristate" | "exotics" | "sprinters" | "photoshoots" | "atlanta" | "miami";

const categoryTabs: { key: CategoryFilter; label: string }[] = [
  { key: "all", label: "All Services" },
  { key: "tristate", label: "Tri-State Chauffeur" },
  { key: "exotics", label: "Rolls-Royce & Maybach" },
  { key: "sprinters", label: "Sprinter Vans" },
  { key: "photoshoots", label: "Photoshoots & Media" },
  { key: "atlanta", label: "Atlanta Fleet" },
  { key: "miami", label: "Miami Packages" },
];

const addonIcons: Record<number, any> = {
  6534614: Users,
  6403479: Wine,
  6534638: Sparkles,
  6845340: Flame,
  7149637: Clock,
};

const Services = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = useMemo(() => {
    return bookingServices.filter((service) => {
      const matchesCategory = activeCategory === "all" || service.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="services" className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header (Reveals right after section divider) */}
        <RevealOnScroll isHeading>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-14">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-black"></span>
                Live Booking Directory
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-black font-serif leading-[1.05] tracking-tight">
                Book Our Services.
              </h2>
              <p className="text-gray-600 text-base md:text-lg font-sans leading-relaxed pt-1">
                Select any vehicle, chauffeur route, photoshoot, or celebration package below for instant 24/7 online scheduling.
              </p>
            </div>

            {/* Search Box */}
            <div className="w-full lg:w-80 relative">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by vehicle, city, service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 text-sm text-black placeholder:text-gray-400 rounded-full focus:outline-none focus:border-black transition-colors"
              />
            </div>
          </div>
        </RevealOnScroll>

        {/* Category Filter Tabs */}
        <RevealOnScroll delay={150}>
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none border-b border-gray-100">
            {categoryTabs.map((tab) => {
              const count =
                tab.key === "all"
                  ? bookingServices.length
                  : bookingServices.filter((s) => s.category === tab.key).length;
              const isActive = activeCategory === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveCategory(tab.key)}
                  className={`flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? "bg-black text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-black"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive ? "bg-white/20 text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </RevealOnScroll>

        {/* Services List / Cards Grid with 80ms Stagger */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-200">
            <p className="text-gray-500 text-base">No services found matching "{searchQuery}".</p>
            <button
              onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
              className="mt-4 text-xs font-bold uppercase tracking-wider underline hover:text-black"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {filteredServices.map((service, index) => (
              <RevealOnScroll
                key={service.id}
                staggerIndex={index % 9}
                className="h-full"
              >
                <div
                  className="group h-full bg-white border border-gray-200 rounded-2xl p-5 hover:border-black hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Thumbnail Image */}
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-gray-100 mb-4">
                      <img
                        src={service.image}
                        alt={service.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/images/services/vip service.jpg";
                        }}
                      />
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-black shadow-sm">
                        {service.categoryLabel}
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm">
                        {service.priceDisplay}
                      </div>
                    </div>

                    {/* Service Title */}
                    <h3 className="text-lg font-bold text-black font-serif leading-snug mb-2 group-hover:text-black">
                      {service.name}
                    </h3>

                    {/* Duration / Min Booking Tag */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md">
                        <CalendarCheck className="w-3 h-3 text-black" />
                        {service.durationDisplay}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-xs leading-relaxed line-clamp-3 mb-4">
                      {service.description}
                    </p>
                  </div>

                  {/* Book Button */}
                  <div className="pt-4 border-t border-gray-100 mt-auto">
                    <button
                      onClick={() => window.open(service.bookingUrl, "_blank", "noopener,noreferrer")}
                      className="cta-btn w-full py-3 bg-black text-white hover:bg-neutral-800 uppercase rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span>Book Online</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        )}

        {/* Curated VIP Add-Ons Section */}
        <div className="rounded-3xl bg-neutral-950 border border-neutral-800 text-white p-8 sm:p-12 overflow-hidden relative">
          <RevealOnScroll isHeading className="relative z-10 mb-8 max-w-2xl">
            <span className="inline-block px-3 py-1 bg-white/10 text-white text-[10px] font-bold tracking-widest uppercase rounded-full mb-3">
              ✦ Available at Checkout
            </span>
            <h3 className="text-2xl sm:text-4xl font-normal font-serif leading-tight mb-2">
              VIP Add-Ons &amp; Enhancements
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Add any of these signature amenities directly to your booking when reserving on our scheduling portal.
            </p>
          </RevealOnScroll>

          {/* Add-ons grid staggered by 80ms */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {bookingAddons.map((addon, index) => {
              const IconComponent = addonIcons[addon.id] || Sparkles;
              return (
                <RevealOnScroll
                  key={addon.id}
                  staggerIndex={index}
                  className="h-full"
                >
                  <div
                    className="h-full p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition-all duration-300"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white mb-3">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h4 className="font-semibold text-sm text-white mb-1.5 leading-snug">
                        {addon.name}
                      </h4>
                      <p className="text-gray-400 text-xs leading-relaxed mb-4">
                        {addon.description}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider">Fee</span>
                      <span className="text-sm font-bold text-white">{addon.priceDisplay}</span>
                    </div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>

          <RevealOnScroll delay={300} className="relative z-10 mt-10 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-400">
              All appointments include a professional uniformed chauffeur, fuel, and complimentary bottled water.
            </p>
            <button
              onClick={() => window.open("https://smooveluxurybooking.as.me/schedule/b24e2156", "_blank", "noopener,noreferrer")}
              className="cta-btn flex-shrink-0 px-6 py-3 bg-white text-black uppercase rounded-sm hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              Open Full Schedule <ArrowUpRight className="w-4 h-4" />
            </button>
          </RevealOnScroll>
        </div>

      </div>
    </section>
  );
};

export default Services;