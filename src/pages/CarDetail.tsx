import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { cars } from "@/data/fleet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PreFooterCTA from "@/components/PreFooterCTA";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft, MapPin, Check, ChevronRight, Star,
    Shield, Clock, Zap, Car, CalendarDays, Settings2,
    User, Phone, Mail, ChevronLeft, Flame
} from "lucide-react";

/* ─── Booking wizard types ─── */
interface Extra {
    id: string;
    label: string;
    desc: string;
    price: number;
    icon: React.ReactNode;
}

const EXTRAS: Extra[] = [
    { id: "chauffeur", label: "Professional Chauffeur", desc: "Licensed driver for your full rental period", price: 299, icon: <Car className="w-5 h-5" /> },
    { id: "delivery",  label: "Vehicle Delivery",       desc: "We bring the car directly to your address",  price: 149, icon: <MapPin className="w-5 h-5" /> },
    { id: "insurance", label: "Premium Insurance",       desc: "Full comprehensive coverage included",        price: 199, icon: <Shield className="w-5 h-5" /> },
    { id: "detailing", label: "Post-Rental Detailing",   desc: "Skip the hassle — we clean it for you",     price: 99,  icon: <Zap className="w-5 h-5" /> },
];

const STEPS = ["Dates", "Extras", "Your Info", "Confirm"];

/* ─── Step progress bar ─── */
const StepBar = ({ step }: { step: number }) => (
    <div className="flex items-center w-full mb-6">
        {STEPS.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold transition-all duration-300 ${
                        i < step ? "bg-black text-white" :
                        i === step ? "bg-black text-white ring-2 ring-offset-2 ring-black" :
                        "bg-gray-100 text-gray-400"
                    }`}>
                        {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
                    </div>
                    <span className={`text-[9px] mt-1 uppercase tracking-wider font-bold ${i === step ? "text-black" : "text-gray-400"}`}>
                        {s}
                    </span>
                </div>
                {i < STEPS.length - 1 && (
                    <div className={`flex-1 h-[2px] mx-1 mb-4 transition-all duration-500 ${i < step ? "bg-black" : "bg-gray-100"}`} />
                )}
            </div>
        ))}
    </div>
);

/* ─── Main Component ─── */
const CarDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const car = cars.find((c) => c.slug === slug);

    // Wizard state
    const [step, setStep] = useState(0);
    const [pickupDate, setPickupDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [pickupLocation, setPickupLocation] = useState("");
    const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
    const [contact, setContact] = useState({ name: "", phone: "", email: "" });
    const [submitted, setSubmitted] = useState(false);
    const [dir, setDir] = useState<"forward" | "back">("forward");

    if (!car) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Vehicle Not Found</h1>
                    <button onClick={() => navigate("/fleet")} className="underline text-gray-400 mt-2">Back to Fleet</button>
                </div>
            </div>
        );
    }

    // Related cars
    const related = cars.filter(c => c.location === car.location && c.id !== car.id).slice(0, 3);

    // Pricing
    const getDays = () => {
        if (!pickupDate || !returnDate) return 1;
        const diff = Math.ceil((new Date(returnDate).getTime() - new Date(pickupDate).getTime()) / 86400000);
        return Math.max(1, diff);
    };
    const days = getDays();
    const basePrice = car.priceNum * days;
    const extrasTotal = selectedExtras.reduce((sum, id) => {
        const e = EXTRAS.find(x => x.id === id);
        return sum + (e ? e.price : 0);
    }, 0);
    const grandTotal = basePrice + extrasTotal;

    const toggleExtra = (id: string) =>
        setSelectedExtras(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

    const goNext = () => { setDir("forward"); setStep(s => Math.min(3, s + 1)); };
    const goBack = () => { setDir("back"); setStep(s => Math.max(0, s - 1)); };

    const handleSubmit = () => setSubmitted(true);

    const canProceed = () => {
        if (step === 0) return pickupDate && returnDate && pickupLocation;
        if (step === 2) return contact.name && contact.phone && contact.email;
        return true;
    };

    const formatDate = (d: string) => d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";

    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* ── HERO ── */}
            <section className="relative h-[85vh] min-h-[600px] w-full bg-black overflow-hidden">
                <img src={car.image} alt={car.title} className="absolute inset-0 w-full h-full object-cover opacity-75" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

                <button
                    onClick={() => navigate("/fleet")}
                    className="absolute top-36 left-6 md:left-12 flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium z-10"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Fleet
                </button>

                <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-12 md:pb-20">
                    <div className="max-w-[1400px] mx-auto">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                            <div>
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 backdrop-blur-sm text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm">
                                        <MapPin className="w-3 h-3" /> {car.location}
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 bg-green-500/20 border border-green-500/40 text-green-400 text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm">
                                        ✓ Available Now
                                    </span>
                                    {car.hot && (
                                        <span className="inline-flex items-center gap-1.5 bg-orange-500/20 border border-orange-500/40 text-orange-400 text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm">
                                            <Flame className="w-3 h-3" /> Hot Pick
                                        </span>
                                    )}
                                </div>
                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-none tracking-tight mb-3">
                                    {car.title}
                                </h1>
                                <p className="text-gray-300 text-lg md:text-xl font-light">{car.year} · {car.bodyStyle} · {car.make}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-400 text-sm uppercase tracking-widest font-bold mb-1">Starting From</p>
                                <p className="text-6xl md:text-7xl font-extrabold text-white leading-none">{car.price}</p>
                                <p className="text-gray-400 text-base mt-1">per day <span className="text-white/40 text-sm">/ 24 hrs</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── MAIN ── */}
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

                    {/* LEFT */}
                    <div className="lg:col-span-2 space-y-14">
                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { icon: <Shield className="w-5 h-5" />, label: "Fully Insured" },
                                { icon: <Clock className="w-5 h-5" />, label: "24/7 Support" },
                                { icon: <Check className="w-5 h-5" />, label: "No Hidden Fees" },
                                { icon: <Zap className="w-5 h-5" />, label: "Instant Booking" },
                            ].map(b => (
                                <div key={b.label} className="flex flex-col items-center justify-center gap-2 border border-gray-200 rounded-sm p-4 text-center text-sm font-semibold text-gray-700">
                                    <span className="text-black">{b.icon}</span>
                                    {b.label}
                                </div>
                            ))}
                        </div>

                        {/* Description */}
                        <div>
                            <h2 className="text-2xl font-extrabold text-black mb-4 border-b pb-3">About This Vehicle</h2>
                            <p className="text-gray-600 text-lg leading-relaxed">{car.description}</p>
                        </div>

                        {/* Specs */}
                        <div>
                            <h2 className="text-2xl font-extrabold text-black mb-6 border-b pb-3">Specifications</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {car.specs.map(s => (
                                    <div key={s.label} className="bg-gray-50 p-4 rounded-sm">
                                        <p className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-1">{s.label}</p>
                                        <p className="text-lg font-extrabold text-black">{s.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Features */}
                        <div>
                            <h2 className="text-2xl font-extrabold text-black mb-6 border-b pb-3">What's Included</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {car.features.map(f => (
                                    <div key={f} className="flex items-center gap-3 text-gray-700">
                                        <span className="w-5 h-5 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                                            <Check className="w-3 h-3 text-white" />
                                        </span>
                                        <span className="font-medium">{f}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reviews */}
                        <div className="bg-black text-white p-8 rounded-sm">
                            <div className="flex items-center gap-2 mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                                <span className="text-white/60 text-sm ml-1">5.0 · 88+ Reviews</span>
                            </div>
                            <p className="text-xl italic text-gray-300 leading-relaxed">
                                "Absolutely incredible experience. The car was immaculate, delivered on time, and the team was professional throughout. Would 100% rent again."
                            </p>
                            <p className="mt-4 text-sm text-gray-500 font-bold uppercase tracking-wider">— Verified Renter, {car.location}</p>
                        </div>
                    </div>

                    {/* RIGHT: Multi-step Wizard */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-36">
                            <div className="border-2 border-black rounded-sm overflow-hidden shadow-2xl">

                                {/* Wizard Header */}
                                <div className="bg-black text-white p-6">
                                    <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Reserve Your</p>
                                    <h3 className="text-xl font-extrabold leading-tight">{car.title}</h3>
                                    <div className="flex items-baseline gap-2 mt-3">
                                        <span className="text-4xl font-extrabold">{car.price}</span>
                                        <span className="text-gray-400 text-sm">/ day</span>
                                    </div>
                                </div>

                                {!submitted ? (
                                    <div className="bg-white p-6">
                                        <StepBar step={step} />

                                        <div className={`transition-all duration-300 ${dir === "forward" ? "animate-[slideInRight_0.3s_ease]" : "animate-[slideInLeft_0.3s_ease]"}`}
                                             key={step}>

                                            {/* ── STEP 0: Dates & Location ── */}
                                            {step === 0 && (
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-2 text-black font-extrabold text-sm uppercase tracking-wider mb-4">
                                                        <CalendarDays className="w-4 h-4" /> Select Your Dates
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Pickup Date</label>
                                                        <input type="date"
                                                            value={pickupDate}
                                                            min={new Date().toISOString().split("T")[0]}
                                                            onChange={e => setPickupDate(e.target.value)}
                                                            className="w-full border border-gray-200 p-3 text-sm font-medium focus:outline-none focus:border-black transition-colors rounded-sm"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Return Date</label>
                                                        <input type="date"
                                                            value={returnDate}
                                                            min={pickupDate || new Date().toISOString().split("T")[0]}
                                                            onChange={e => setReturnDate(e.target.value)}
                                                            className="w-full border border-gray-200 p-3 text-sm font-medium focus:outline-none focus:border-black transition-colors rounded-sm"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Pickup Location</label>
                                                        <select value={pickupLocation} onChange={e => setPickupLocation(e.target.value)}
                                                            className="w-full border border-gray-200 p-3 text-sm font-medium focus:outline-none focus:border-black transition-colors rounded-sm bg-white">
                                                            <option value="">Select city...</option>
                                                            <option>Boston, MA</option>
                                                            <option>Miami, FL</option>
                                                            <option>Atlanta, GA</option>
                                                            <option>Los Angeles, CA</option>
                                                        </select>
                                                    </div>
                                                    {pickupDate && returnDate && (
                                                        <div className="bg-gray-50 border border-gray-100 rounded-sm p-3 text-sm">
                                                            <span className="text-gray-500">Duration: </span>
                                                            <span className="font-extrabold text-black">{days} day{days > 1 ? "s" : ""}</span>
                                                            <span className="text-gray-400 ml-2">· Base: <strong className="text-black">${basePrice.toLocaleString()}</strong></span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* ── STEP 1: Extras ── */}
                                            {step === 1 && (
                                                <div className="space-y-3">
                                                    <div className="flex items-center gap-2 text-black font-extrabold text-sm uppercase tracking-wider mb-4">
                                                        <Settings2 className="w-4 h-4" /> Customize Your Experience
                                                    </div>
                                                    {EXTRAS.map(ex => {
                                                        const active = selectedExtras.includes(ex.id);
                                                        return (
                                                            <button key={ex.id} type="button" onClick={() => toggleExtra(ex.id)}
                                                                className={`w-full flex items-start gap-3 p-3.5 rounded-sm border-2 text-left transition-all duration-200 ${
                                                                    active ? "border-black bg-black text-white" : "border-gray-100 bg-gray-50 hover:border-gray-300 text-black"
                                                                }`}>
                                                                <span className={`mt-0.5 flex-shrink-0 ${active ? "text-white" : "text-gray-500"}`}>{ex.icon}</span>
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="font-extrabold text-sm">{ex.label}</p>
                                                                    <p className={`text-xs mt-0.5 ${active ? "text-gray-300" : "text-gray-500"}`}>{ex.desc}</p>
                                                                </div>
                                                                <div className="flex-shrink-0 text-right">
                                                                    <p className="font-extrabold text-sm">+${ex.price}</p>
                                                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mt-1 ml-auto transition-all ${
                                                                        active ? "bg-white border-white" : "border-gray-300"
                                                                    }`}>
                                                                        {active && <Check className="w-2.5 h-2.5 text-black" />}
                                                                    </div>
                                                                </div>
                                                            </button>
                                                        );
                                                    })}
                                                    {selectedExtras.length === 0 && (
                                                        <p className="text-center text-xs text-gray-400 py-2">Skip to continue with no add-ons</p>
                                                    )}
                                                </div>
                                            )}

                                            {/* ── STEP 2: Contact Info ── */}
                                            {step === 2 && (
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-2 text-black font-extrabold text-sm uppercase tracking-wider mb-4">
                                                        <User className="w-4 h-4" /> Your Information
                                                    </div>
                                                    {[
                                                        { key: "name", label: "Full Name", type: "text", icon: <User className="w-4 h-4" />, placeholder: "John Smith" },
                                                        { key: "phone", label: "Phone Number", type: "tel", icon: <Phone className="w-4 h-4" />, placeholder: "+1 (555) 000-0000" },
                                                        { key: "email", label: "Email Address", type: "email", icon: <Mail className="w-4 h-4" />, placeholder: "john@example.com" },
                                                    ].map(f => (
                                                        <div key={f.key}>
                                                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">{f.label}</label>
                                                            <div className="relative">
                                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{f.icon}</span>
                                                                <input type={f.type} placeholder={f.placeholder}
                                                                    value={contact[f.key as keyof typeof contact]}
                                                                    onChange={e => setContact(prev => ({ ...prev, [f.key]: e.target.value }))}
                                                                    className="w-full border border-gray-200 pl-10 pr-3 py-3 text-sm font-medium focus:outline-none focus:border-black transition-colors rounded-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* ── STEP 3: Confirm ── */}
                                            {step === 3 && (
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-2 text-black font-extrabold text-sm uppercase tracking-wider mb-4">
                                                        <Check className="w-4 h-4" /> Review & Confirm
                                                    </div>

                                                    {/* Summary card */}
                                                    <div className="bg-gray-50 border border-gray-100 rounded-sm divide-y divide-gray-100 text-sm overflow-hidden">
                                                        <div className="px-4 py-3">
                                                            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">Vehicle</p>
                                                            <p className="font-extrabold text-black">{car.title}</p>
                                                        </div>
                                                        <div className="px-4 py-3 grid grid-cols-2 gap-2">
                                                            <div>
                                                                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">Pickup</p>
                                                                <p className="font-bold text-black">{formatDate(pickupDate)}</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">Return</p>
                                                                <p className="font-bold text-black">{formatDate(returnDate)}</p>
                                                            </div>
                                                        </div>
                                                        <div className="px-4 py-3">
                                                            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">Location</p>
                                                            <p className="font-bold text-black">{pickupLocation}</p>
                                                        </div>
                                                        {selectedExtras.length > 0 && (
                                                            <div className="px-4 py-3">
                                                                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Add-ons</p>
                                                                {selectedExtras.map(id => {
                                                                    const ex = EXTRAS.find(x => x.id === id)!;
                                                                    return <p key={id} className="text-gray-700">• {ex.label} <span className="text-gray-400">+${ex.price}</span></p>;
                                                                })}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Price breakdown */}
                                                    <div className="space-y-2 text-sm">
                                                        <div className="flex justify-between text-gray-500">
                                                            <span>{car.price} × {days} day{days > 1 ? "s" : ""}</span>
                                                            <span>${basePrice.toLocaleString()}</span>
                                                        </div>
                                                        {selectedExtras.map(id => {
                                                            const ex = EXTRAS.find(x => x.id === id)!;
                                                            return (
                                                                <div key={id} className="flex justify-between text-gray-500">
                                                                    <span>{ex.label}</span>
                                                                    <span>+${ex.price}</span>
                                                                </div>
                                                            );
                                                        })}
                                                        <div className="flex justify-between text-gray-500">
                                                            <span>Security Deposit</span>
                                                            <span className="text-gray-400">Refundable</span>
                                                        </div>
                                                        <div className="flex justify-between font-extrabold text-black text-lg border-t border-gray-200 pt-2">
                                                            <span>Estimated Total</span>
                                                            <span>${grandTotal.toLocaleString()}*</span>
                                                        </div>
                                                        <p className="text-[10px] text-gray-400">*Excluding deposit & applicable fees</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Navigation Buttons */}
                                        <div className={`mt-6 flex gap-3 ${step > 0 ? "justify-between" : "justify-end"}`}>
                                            {step > 0 && (
                                                <Button type="button" variant="outline" onClick={goBack}
                                                    className="flex items-center gap-1.5 border-gray-300 text-gray-600 hover:bg-gray-50 font-bold uppercase tracking-wider text-xs rounded-sm h-12 px-4">
                                                    <ChevronLeft className="w-4 h-4" /> Back
                                                </Button>
                                            )}
                                            {step < 3 ? (
                                                <Button type="button" onClick={goNext} disabled={!canProceed()}
                                                    className="flex-1 bg-black hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-400 text-white font-extrabold h-12 text-xs uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 transition-all">
                                                    Continue <ChevronRight className="w-4 h-4" />
                                                </Button>
                                            ) : (
                                                <Button type="button" onClick={handleSubmit}
                                                    className="flex-1 bg-black hover:bg-gray-900 text-white font-extrabold h-12 text-sm uppercase tracking-widest rounded-sm">
                                                    Confirm Reservation
                                                </Button>
                                            )}
                                        </div>

                                        <p className="text-center text-[10px] text-gray-400 mt-3">
                                            No charge today · Free cancellation up to 48 hrs
                                        </p>
                                    </div>
                                ) : (
                                    /* ── SUCCESS STATE ── */
                                    <div className="p-8 bg-white text-center space-y-4">
                                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                                            <Check className="w-8 h-8 text-green-600" />
                                        </div>
                                        <h3 className="text-xl font-extrabold text-black">Reservation Received!</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed">
                                            Hey <strong>{contact.name}</strong>! Our team will call you at <strong>{contact.phone}</strong> within <strong>2 hours</strong> to finalize your <strong>{car.title}</strong> booking in {pickupLocation}.
                                        </p>
                                        <div className="bg-gray-50 rounded-sm p-4 text-left text-sm space-y-1.5 text-gray-600">
                                            <p>📅 <strong>{formatDate(pickupDate)}</strong> → <strong>{formatDate(returnDate)}</strong></p>
                                            <p>📍 {pickupLocation}</p>
                                            <p>💰 Est. <strong>${grandTotal.toLocaleString()}</strong> (excl. deposit)</p>
                                        </div>
                                        <a href="tel:8572778709" className="block w-full bg-black text-white font-bold py-3 text-sm uppercase tracking-wider text-center rounded-sm hover:bg-gray-800 transition-colors">
                                            Call Us: (857) 277-8709
                                        </a>
                                        <button onClick={() => { setSubmitted(false); setStep(0); }} className="text-xs text-gray-400 underline hover:text-gray-600">
                                            Start a new booking
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Contact nudge */}
                            <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-sm text-sm text-gray-600 text-center">
                                Questions? Call us at{" "}
                                <a href="tel:8572778709" className="font-bold text-black hover:underline">(857) 277-8709</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Vehicles */}
                {related.length > 0 && (
                    <div className="mt-20">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-extrabold text-black">More in {car.location}</h2>
                            <button onClick={() => navigate("/fleet")} className="flex items-center gap-1 text-sm font-bold uppercase tracking-wider text-gray-500 hover:text-black transition-colors">
                                View All <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {related.map(rc => (
                                <div key={rc.id} onClick={() => navigate(`/fleet/${rc.slug}`)}
                                    className="group border hover:shadow-xl transition-all duration-300 cursor-pointer bg-white overflow-hidden rounded-sm">
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <img src={rc.image} alt={rc.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute bottom-4 left-4 text-white">
                                            <p className="text-xs text-gray-300 uppercase tracking-wider mb-0.5">{rc.location}</p>
                                            <h3 className="font-extrabold text-lg leading-tight">{rc.title}</h3>
                                        </div>
                                    </div>
                                    <div className="p-4 flex justify-between items-center">
                                        <div>
                                            <p className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">Price/Day</p>
                                            <p className="text-2xl font-extrabold text-black">{rc.price}</p>
                                        </div>
                                        <Button className="bg-black text-white text-xs font-bold px-4 h-9 rounded-sm uppercase tracking-wider">
                                            View
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <PreFooterCTA />
            <Footer />
        </div>
    );
};

export default CarDetail;
