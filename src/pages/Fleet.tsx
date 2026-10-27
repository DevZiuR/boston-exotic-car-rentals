import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PreFooterCTA from "@/components/PreFooterCTA";
import { Plus, Flame, MapPin, Car as CarIcon, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { cars } from "@/data/fleet";
import { useEffect, useRef } from "react";
import RevealOnScroll from "@/components/RevealOnScroll";

const cleanTitle = (title: string) => title.replace(/\s*\((ATL|MIA)\)/gi, "").trim();

const formatSeatsMin = (car: { seats?: string; minHours?: string }) => {
    const seatsRaw = (car.seats || "4-6").replace(/\s*(Seats|Seat|Max|Passengers|Pax)\s*/gi, "").trim();
    const minRaw = (car.minHours || "3-4").replace(/\s*(Hours|Hour)\s*/gi, "").trim();
    return `${seatsRaw} seats · ${minRaw} hr min`;
};


const filters = [
    "Year", "Make", "Model", "Trim", "Price", "Body Style", "Mileage",
    "Exterior", "Interior", "Drivetrain", "Transmission", "Fuel Type", "MPG City", "Type"
];

const Fleet = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const selectedCity = searchParams.get("city") || "";
    const cityRefs = useRef<Record<string, HTMLDivElement | null>>({});

    // Auto-scroll to the selected city section when arriving from dropdown
    useEffect(() => {
        if (selectedCity && cityRefs.current[selectedCity]) {
            setTimeout(() => {
                cityRefs.current[selectedCity]?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 300);
        }
    }, [selectedCity]);
    return (
        <div className="min-h-screen bg-[#07070a] text-white">
            <Header />
            <main className="pt-32 lg:pt-40 pb-16 px-4 md:px-8 max-w-[1600px] mx-auto">
                <div className="flex flex-col lg:flex-row gap-8 mt-8 text-white">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-64 flex-shrink-0">
                        <div className="mb-4">
                            <div className="inline-flex items-center gap-2 bg-[#b3122e] text-white px-3 py-1 text-sm font-medium rounded-sm mb-4">
                                Available
                                <button className="hover:text-gray-200">✕</button>
                            </div>
                            <div className="flex justify-between items-center text-sm border-b border-white/10 pb-4">
                                <span className="font-medium text-zinc-300">1 applied</span>
                                <button className="text-[#b3122e] font-medium hover:underline">[Clear]</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-1 gap-x-4 lg:gap-x-0 text-sm">
                            {filters.map((filter) => (
                                <div key={filter} className="border-b border-white/10 py-4 flex justify-between items-center cursor-pointer hover:bg-white/5 transition-colors">
                                    <span className="font-semibold text-zinc-200 truncate pr-2">{filter}</span>
                                    <Plus className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                                </div>
                            ))}
                        </div>
                    </aside>

                    {/* Grid */}
                    <div className="flex-1">
                        <div className="bg-white/5 border border-white/10 p-4 mb-8 text-sm text-zinc-300 space-y-1 rounded-sm">
                            <p className="font-semibold text-white uppercase tracking-wide mb-2 text-sm">Important Information</p>
                            <p className="text-sm">• Click any vehicle below to <span className="font-bold text-white">book</span> with a professional chauffeur.</p>
                            <p className="text-sm">• Rates are <span className="font-bold text-white">per hour</span>; most vehicles have a 3–4 hour minimum. Tolls and fees may apply.</p>
                            <p className="text-sm">• All vehicles are <span className="font-bold text-white">chauffeur-driven</span> — no self-drive rentals.</p>
                        </div>

                        {["New York", "Miami", "Atlanta", "Nationwide"].map((city, index) => (
                            <div
                                key={city}
                                className={index > 0 ? "mt-12" : ""}
                                ref={el => { cityRefs.current[city] = el; }}
                            >
                                <h2 className={`text-4xl font-bold mb-6 border-b border-white/10 pb-2 transition-colors ${selectedCity === city ? "text-white border-[#b3122e]" : "text-white"}`}>
                                    {city} Inventory
                                    {selectedCity === city && (
                                        <span className="ml-3 text-sm font-semibold bg-[#b3122e] text-white px-2 py-0.5 rounded-sm uppercase tracking-wider align-middle">Selected</span>
                                    )}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {cars.filter(car => car.location === city || car.location === "Nationwide" || city === "Nationwide").map((car, carIndex) => (
                                        <RevealOnScroll key={`${city}-${car.id}`} staggerIndex={carIndex % 6} className="h-full">
                                            <div
                                                className="border border-neutral-800 hover:border-[#b3122e]/50 hover:shadow-2xl hover:shadow-black/70 transition-all duration-300 bg-[#161616] flex flex-col cursor-pointer group h-full rounded-xl overflow-hidden"
                                                onClick={() => navigate(`/fleet/${car.slug}`)}
                                            >
                                                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                                                    {car.image ? (
                                                        <img src={car.image} alt={cleanTitle(car.title)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                                    ) : (
                                                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-950 text-neutral-500">
                                                            <CarIcon className="w-10 h-10 mb-2 stroke-[1.5] text-neutral-600" />
                                                            <span className="text-[11px] uppercase tracking-widest font-mono text-neutral-400">Photo Coming Soon</span>
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                                                    {/* Location Badge */}
                                                    <div className="absolute top-3.5 left-3.5 flex items-center gap-1 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 text-[11px] font-bold uppercase tracking-wider text-white">
                                                        <MapPin className="w-3 h-3 text-[#b3122e]" />
                                                        <span>{car.location === "New York" ? "Tri-State" : car.location}</span>
                                                    </div>

                                                    {car.hot && (
                                                        <div className="absolute top-3.5 right-3.5 bg-black/75 backdrop-blur-md text-white border border-white/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md flex items-center gap-1 shadow-sm">
                                                            <Flame className="w-3 h-3 text-[#b3122e]" />
                                                            Hot
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                                                    <div>
                                                        <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-[#b3122e] transition-colors line-clamp-1">
                                                            {cleanTitle(car.title)}
                                                        </h3>
                                                        <p className="text-xs text-zinc-400 font-sans mt-1">
                                                            {formatSeatsMin(car)}
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center justify-between gap-3 pt-3 border-t border-neutral-800/80 mt-auto">
                                                        <div>
                                                            {car.price ? (
                                                                <div className="text-lg font-bold text-white">
                                                                    <span className="text-[#b3122e]">{car.price}</span>
                                                                    <span className="text-xs text-zinc-400 font-normal">/hr</span>
                                                                </div>
                                                            ) : (
                                                                <span className="text-sm font-bold text-zinc-300">Ask for rate</span>
                                                            )}
                                                        </div>

                                                        <Button
                                                            className="cta-btn px-4 py-2.5 min-h-[44px] bg-[#b3122e] hover:bg-[#8e0e24] text-white uppercase rounded-lg transition-all duration-300 flex items-center gap-1.5 shadow-md flex-shrink-0 h-auto"
                                                            onClick={e => {
                                                                e.stopPropagation();
                                                                if (!car.price || car.bookingUrl === "#contact") {
                                                                    navigate("/#contact");
                                                                } else {
                                                                    window.open(car.bookingUrl || "https://smooveluxurybooking.as.me/schedule/b24e2156", "_blank", "noopener,noreferrer");
                                                                }
                                                            }}
                                                        >
                                                            <span>{car.price ? "Book Now" : "Ask for Rate"}</span>
                                                            <ArrowUpRight className="w-3.5 h-3.5" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </RevealOnScroll>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <PreFooterCTA />
            <Footer />
        </div>
    );
};

export default Fleet;
