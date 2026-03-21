import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PreFooterCTA from "@/components/PreFooterCTA";
import { Plus, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { cars } from "@/data/fleet";
import { useEffect, useRef } from "react";


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
        <div className="min-h-screen bg-white">
            <Header />
            <main className="pt-32 lg:pt-40 pb-16 px-4 md:px-8 max-w-[1600px] mx-auto">
                <div className="flex flex-col lg:flex-row gap-8 mt-8 text-black">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-64 flex-shrink-0">
                        <div className="mb-4">
                            <div className="inline-flex items-center gap-2 bg-red-600 text-white px-3 py-1 text-sm font-medium rounded-sm mb-4">
                                Available
                                <button className="hover:text-gray-200">✕</button>
                            </div>
                            <div className="flex justify-between items-center text-sm border-b pb-4">
                                <span className="font-medium text-gray-700">1 applied</span>
                                <button className="text-red-600 font-medium hover:underline">[Clear]</button>
                            </div>
                        </div>

                        <div className="space-y-0 text-sm">
                            {filters.map((filter) => (
                                <div key={filter} className="border-b py-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors">
                                    <span className="font-semibold text-gray-900">{filter}</span>
                                    <Plus className="w-4 h-4 text-gray-900" />
                                </div>
                            ))}
                        </div>
                    </aside>

                    {/* Grid */}
                    <div className="flex-1">
                        <div className="bg-gray-200 border border-gray-200 p-4 mb-8 text-sm text-gray-700 space-y-1 rounded-sm">
                            <p className="font-semibold text-black uppercase tracking-wide mb-2 text-sm">Important Information</p>
                            <p className="text-sm">• Click any vehicle below to <span className="font-bold">book an appointment</span> with our rental agency.</p>
                            <p className="text-sm">• Rates displayed below are for <span className="font-bold">daily/24-hour rentals</span>; extra fees/coverage may apply.</p>
                            <p className="text-sm">• Security deposit <span className="font-bold">required</span> on all vehicles.</p>
                        </div>

                        {["Boston", "Miami", "Atlanta", "Los Angeles"].map((city, index) => (
                            <div
                                key={city}
                                className={index > 0 ? "mt-12" : ""}
                                ref={el => { cityRefs.current[city] = el; }}
                            >
                                <h2 className={`text-4xl font-bold mb-6 border-b pb-2 transition-colors ${selectedCity === city ? "text-black border-black" : ""}`}>
                                    {city} Inventory
                                    {selectedCity === city && (
                                        <span className="ml-3 text-sm font-semibold bg-black text-white px-2 py-0.5 rounded-sm uppercase tracking-wider align-middle">Selected</span>
                                    )}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {cars.filter(car => car.location === city).map((car) => (
                                        <div
                                            key={`${city}-${car.id}`}
                                            className="border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white flex flex-col cursor-pointer group"
                                            onClick={() => navigate(`/fleet/${car.slug}`)}
                                        >
                                            <div className="relative aspect-[4/3] overflow-hidden">
                                                <img src={car.image} alt={car.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                                {car.hot && (
                                                    <div className="absolute top-3 left-3 bg-white text-black px-3 py-1.5 text-xs font-bold rounded-full flex items-center gap-1.5 shadow-sm">
                                                        <Flame className="w-4 h-4" />
                                                        Hot
                                                    </div>
                                                )}
                                            </div>

                                            <div className="p-5 flex flex-col flex-1 h-full">
                                                <div className="mb-1">
                                                    <span className="text-xs font-semibold text-gray-800 tracking-wide uppercase">Available</span>
                                                </div>
                                                <h3 className="text-[17px] font-extrabold leading-tight text-black mb-1 mt-1">
                                                    {car.title}
                                                </h3>

                                                {car.bodyStyle && (
                                                    <div className="flex justify-between text-sm text-gray-600 border-t pt-4 mb-4 mt-auto">
                                                        <span>Body Style</span>
                                                        <span>{car.bodyStyle}</span>
                                                    </div>
                                                )}

                                                <div className="mt-auto border-t border-gray-100 pt-3">
                                                    <div className="text-[13px] font-semibold text-gray-900 uppercase tracking-wide mb-1">
                                                        Price/Day
                                                    </div>
                                                    <div className="text-3xl font-bold tracking-tight text-black mb-5 flex items-start gap-1">
                                                        {car.price} <span className="text-lg">*</span>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-3 mt-auto">
                                                        <Button
                                                            className="w-full bg-black hover:bg-gray-800 text-white font-bold rounded-sm h-12 text-sm uppercase tracking-wider"
                                                            onClick={e => { e.stopPropagation(); navigate(`/fleet/${car.slug}`); }}
                                                        >
                                                            Rent Now
                                                        </Button>
                                                        <Button
                                                            variant="secondary"
                                                            className="w-full bg-gray-100 hover:bg-gray-200 text-black font-bold rounded-sm h-12 text-sm uppercase tracking-wider"
                                                            onClick={e => { e.stopPropagation(); navigate(`/fleet/${car.slug}`); }}
                                                        >
                                                            Details
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
