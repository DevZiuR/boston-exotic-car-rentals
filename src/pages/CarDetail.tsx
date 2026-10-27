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

const getExtras = (carSmokingFee?: number): Extra[] => [
    { id: "bottle",     label: "Bottle Package",            desc: "Premium bottle service on board",              price: 150, icon: <Zap className="w-5 h-5" /> },
    { id: "roses",      label: "Red Roses",                 desc: "Fresh red roses for that special someone",     price: 200, icon: <Star className="w-5 h-5" /> },
    { id: "photoshoot", label: "Lifestyle Photoshoot",      desc: "1-hour photoshoot add-on",                    price: 120, icon: <Car className="w-5 h-5" /> },
    { id: "smoking",    label: "Smoking Fee",               desc: "Smoking permitted inside the vehicle",         price: carSmokingFee ?? 130, icon: <Clock className="w-5 h-5" /> },
    { id: "tolls",      label: "Tolls Separate",            desc: "Bridge, tunnel and highway tolls add-on",      price: 80,  icon: <MapPin className="w-5 h-5" /> },
];

const STEPS = ["Date & Time", "Add-Ons", "Your Info", "Confirm"];

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
    const [bookingDate, setBookingDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [hours, setHours] = useState(4);
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

    // Extras based on vehicle
    const extras = getExtras(car.smokingFee);

    // Related cars
    const related = cars.filter(c => c.id !== car.id).slice(0, 3);

    // Pricing
    const basePrice = car.priceNum * hours;
    const extrasTotal = selectedExtras.reduce((sum, id) => {
        const e = extras.find(x => x.id === id);
        return sum + (e ? e.price : 0);
    }, 0);
    const grandTotal = basePrice + extrasTotal;

    const toggleExtra = (id: string) =>
        setSelectedExtras(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

    const goNext = () => { setDir("forward"); setStep(s => Math.min(3, s + 1)); };
    const goBack = () => { setDir("back"); setStep(s => Math.max(0, s - 1)); };

    const handleSubmit = () => setSubmitted(true);

    const canProceed = () => {
        if (step === 0) return bookingDate && startTime && pickupLocation;
        if (step === 2) return contact.name && contact.phone && contact.email;
        return true;
    };

    const formatDate = (d: string) => d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";

    return (
        <div className="min-h-screen bg-[#07070a] text-white">
            <Header />

            {/* ── HERO ── */}
            <section className="relative h-[85vh] min-h-[600px] w-full bg-black overflow-hidden">
                {car.image ? (
                    <img src={car.image} alt={car.title} className="absolute inset-0 w-full h-full object-cover opacity-75" />
                ) : (
                    <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center text-neutral-600">
                        <Car className="w-24 h-24 stroke-[1]" />
                    </div>
                )}
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
                                        <MapPin className="w-3 h-3 text-[#b3122e]" /> {car.location}
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 bg-green-500/20 border border-green-500/40 text-green-400 text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm">
                                        ✓ Available Now
                                    </span>
                                    {car.hot && (
                                        <span className="inline-flex items-center gap-1.5 bg-orange-500/20 border border-orange-500/40 text-orange-400 text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm">
                                            <Flame className="w-3 h-3 text-[#b3122e]" /> Hot Pick
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
                                <p className="text-6xl md:text-7xl font-extrabold text-white leading-none">{car.price || "Ask for Rate"}</p>
                                <p className="text-gray-400 text-base mt-1">{car.price ? "per hour " : ""}<span className="text-white/40 text-sm">/ 3–4 hr min</span></p>
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
                                { icon: <Shield className="w-5 h-5 text-[#b3122e]" />, label: "Fully Insured" },
                                { icon: <Clock className="w-5 h-5 text-[#b3122e]" />, label: "24/7 Support" },
                                { icon: <Check className="w-5 h-5 text-[#b3122e]" />, label: "No Hidden Fees" },
                                { icon: <Zap className="w-5 h-5 text-[#b3122e]" />, label: "Instant Booking" },
                            ].map(b => (
                                <div key={b.label} className="flex flex-col items-center justify-center gap-2 border border-white/10 rounded-sm p-4 text-center text-sm font-semibold text-zinc-300 bg-white/5">
                                    <span>{b.icon}</span>
                                    {b.label}
                                </div>
                            ))}
                        </div>

                        {/* Description */}
                        <div>
                            <h2 className="text-2xl font-extrabold text-white mb-4 border-b border-white/10 pb-3">About This Vehicle</h2>
                            <p className="text-zinc-300 text-lg leading-relaxed">{car.description}</p>
                        </div>

                        {/* Specs */}
                        <div>
                            <h2 className="text-2xl font-extrabold text-white mb-6 border-b border-white/10 pb-3">Specifications</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {car.specs.map(s => (
                                    <div key={s.label} className="bg-white/5 border border-white/10 p-4 rounded-sm">
                                        <p className="text-[11px] uppercase tracking-widest text-zinc-400 font-bold mb-1">{s.label}</p>
                                        <p className="text-lg font-extrabold text-white">{s.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Features */}
                        <div>
                            <h2 className="text-2xl font-extrabold text-white mb-6 border-b border-white/10 pb-3">What's Included</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {car.features.map(f => (
                                    <div key={f} className="flex items-center gap-3 text-zinc-300">
                                        <span className="w-5 h-5 rounded-full bg-[#b3122e] flex items-center justify-center flex-shrink-0">
                                            <Check className="w-3 h-3 text-white" />
                                        </span>
                                        <span className="font-medium">{f}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reviews */}
                        <div className="bg-[#141416] border border-white/10 text-white p-8 rounded-sm">
                            <div className="flex items-center gap-2 mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-[#b3122e] text-[#b3122e]" />
                                ))}
                                <span className="text-white/60 text-sm ml-1">5.0 · 2,500+ Rides</span>
                            </div>
                            <p className="text-xl italic text-gray-300 leading-relaxed">
                                "Absolutely incredible experience. The car was immaculate, delivered on time, and the team was professional throughout. Would 100% rent again."
                            </p>
                            <p className="mt-4 text-sm text-gray-400 font-bold uppercase tracking-wider">— Verified Renter, {car.location}</p>
                        </div>
                    </div>

                    {/* RIGHT: Multi-step Wizard */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-36">
                            <div className="border border-white/10 rounded-sm overflow-hidden shadow-2xl bg-[#141416]">

                                {/* Wizard Header */}
                                <div className="bg-black text-white p-6 border-b border-white/10">
                                    <p className="text-xs uppercase tracking-widest text-zinc-400 mb-1 font-mono">Reserve Your</p>
                                    <h3 className="text-xl font-extrabold leading-tight text-white">{car.title}</h3>
                                    <div className="flex items-baseline gap-2 mt-3">
                                        <span className="text-4xl font-extrabold text-[#b3122e]">{car.price || "Ask for rate"}</span>
                                        {car.price && <span className="text-zinc-400 text-sm">/ hour</span>}
                                    </div>
                                </div>

                                {!submitted ? (
                                    <div className="bg-[#141416] p-6 text-white">
                                        <StepBar step={step} />

                                        <div className={`transition-all duration-300 ${dir === "forward" ? "animate-[slideInRight_0.3s_ease]" : "animate-[slideInLeft_0.3s_ease]"}`}
                                             key={step}>

                                            {/* ── STEP 0: Date, Time & Location ── */}
                                            {step === 0 && (
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-2 text-white font-extrabold text-sm uppercase tracking-wider mb-4">
                                                        <CalendarDays className="w-4 h-4 text-[#b3122e]" /> Select Your Date & Duration
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5 font-mono">Booking Date</label>
                                                        <input type="date"
                                                            value={bookingDate}
                                                            min={new Date().toISOString().split("T")[0]}
                                                            onChange={e => setBookingDate(e.target.value)}
                                                            className="w-full border border-white/20 h-12 min-h-[48px] p-3 text-[16px] font-medium focus:outline-none focus:border-white transition-colors rounded-sm bg-[#1c1c20] text-white"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                        <div>
                                                            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5 font-mono">Start Time</label>
                                                            <input type="time"
                                                                value={startTime}
                                                                onChange={e => setStartTime(e.target.value)}
                                                                className="w-full border border-white/20 h-12 min-h-[48px] p-3 text-[16px] font-medium focus:outline-none focus:border-white transition-colors rounded-sm bg-[#1c1c20] text-white"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5 font-mono">Duration (hours)</label>
                                                            <select value={hours} onChange={e => setHours(Number(e.target.value))}
                                                                className="w-full border border-white/20 h-12 min-h-[48px] p-3 text-[16px] font-medium focus:outline-none focus:border-white transition-colors rounded-sm bg-[#1c1c20] text-white">
                                                                {[3, 4, 5, 6, 8, 10, 12].map(h => (
                                                                    <option key={h} value={h} className="bg-[#1c1c20] text-white">{h} hour{h > 1 ? "s" : ""}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5 font-mono">Pickup Area</label>
                                                        <select value={pickupLocation} onChange={e => setPickupLocation(e.target.value)}
                                                            className="w-full border border-white/20 h-12 min-h-[48px] p-3 text-[16px] font-medium focus:outline-none focus:border-white transition-colors rounded-sm bg-[#1c1c20] text-white">
                                                            <option value="" className="bg-[#1c1c20] text-white">Select area...</option>
                                                            <option className="bg-[#1c1c20] text-white">New York — NYC / New Jersey</option>
                                                            <option className="bg-[#1c1c20] text-white">New York — Connecticut / Pennsylvania</option>
                                                            <option className="bg-[#1c1c20] text-white">Atlanta, GA</option>
                                                            <option className="bg-[#1c1c20] text-white">Miami, FL</option>
                                                            <option className="bg-[#1c1c20] text-white">Nationwide (all 50 states)</option>
                                                        </select>
                                                    </div>
                                                    {bookingDate && (
                                                        <div className="bg-white/5 border border-white/10 rounded-sm p-3 text-sm">
                                                            <span className="text-zinc-400">Duration: </span>
                                                            <span className="font-extrabold text-white">{hours} hour{hours > 1 ? "s" : ""}</span>
                                                            <span className="text-zinc-500 ml-2">· Base: <strong className="text-[#b3122e]">${basePrice.toLocaleString()}</strong></span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* ── STEP 1: Extras ── */}
                                            {step === 1 && (
                                                <div className="space-y-3">
                                                    <div className="flex items-center gap-2 text-white font-extrabold text-sm uppercase tracking-wider mb-4">
                                                        <Settings2 className="w-4 h-4 text-[#b3122e]" /> Customize Your Experience
                                                    </div>
                                                    {extras.map(ex => {
                                                        const active = selectedExtras.includes(ex.id);
                                                        return (
                                                            <button key={ex.id} type="button" onClick={() => toggleExtra(ex.id)}
                                                                className={`w-full flex items-start gap-3 p-3.5 rounded-sm border text-left transition-all duration-200 ${
                                                                    active ? "border-[#b3122e] bg-[#b3122e]/10 text-white" : "border-white/10 bg-white/5 hover:border-white/25 text-white"
                                                                }`}>
                                                                <span className={`mt-0.5 flex-shrink-0 ${active ? "text-[#b3122e]" : "text-zinc-400"}`}>{ex.icon}</span>
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="font-extrabold text-sm text-white">{ex.label}</p>
                                                                    <p className={`text-xs mt-0.5 ${active ? "text-zinc-300" : "text-zinc-400"}`}>{ex.desc}</p>
                                                                </div>
                                                                <div className="flex-shrink-0 text-right">
                                                                    <p className="font-extrabold text-sm text-[#b3122e]">+${ex.price}</p>
                                                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center mt-1 ml-auto transition-all ${
                                                                        active ? "bg-[#b3122e] border-[#b3122e]" : "border-white/30"
                                                                    }`}>
                                                                        {active && <Check className="w-2.5 h-2.5 text-white" />}
                                                                    </div>
                                                                </div>
                                                            </button>
                                                        );
                                                    })}
                                                    {selectedExtras.length === 0 && (
                                                        <p className="text-center text-xs text-zinc-500 py-2">Skip to continue with no add-ons</p>
                                                    )}
                                                </div>
                                            )}

                                            {/* ── STEP 2: Contact Info ── */}
                                            {step === 2 && (
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-2 text-white font-extrabold text-sm uppercase tracking-wider mb-4">
                                                        <User className="w-4 h-4 text-[#b3122e]" /> Your Information
                                                    </div>
                                                    {[
                                                        { key: "name", label: "Full Name", type: "text", icon: <User className="w-4 h-4" />, placeholder: "John Smith" },
                                                        { key: "phone", label: "Phone Number", type: "tel", icon: <Phone className="w-4 h-4" />, placeholder: "+1 (555) 000-0000" },
                                                        { key: "email", label: "Email Address", type: "email", icon: <Mail className="w-4 h-4" />, placeholder: "john@example.com" },
                                                    ].map(f => (
                                                        <div key={f.key}>
                                                            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5 font-mono">{f.label}</label>
                                                            <div className="relative">
                                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">{f.icon}</span>
                                                                <input type={f.type} placeholder={f.placeholder}
                                                                    value={contact[f.key as keyof typeof contact]}
                                                                    onChange={e => setContact(prev => ({ ...prev, [f.key]: e.target.value }))}
                                                                    className="w-full border border-white/20 h-12 min-h-[48px] pl-10 pr-3 py-3 text-[16px] font-medium focus:outline-none focus:border-white transition-colors rounded-sm bg-[#1c1c20] text-white"
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* ── STEP 3: Confirm ── */}
                                            {step === 3 && (
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-2 text-white font-extrabold text-sm uppercase tracking-wider mb-4">
                                                        <Check className="w-4 h-4 text-[#b3122e]" /> Review & Confirm
                                                    </div>

                                                    {/* Summary card */}
                                                    <div className="bg-white/5 border border-white/10 rounded-sm divide-y divide-white/10 text-sm overflow-hidden">
                                                        <div className="px-4 py-3">
                                                            <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-0.5 font-mono">Vehicle</p>
                                                            <p className="font-extrabold text-white">{car.title}</p>
                                                        </div>
                                                        <div className="px-4 py-3 grid grid-cols-2 gap-2">
                                                            <div>
                                                                <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-0.5 font-mono">Date</p>
                                                                <p className="font-bold text-white">{formatDate(bookingDate)}</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-0.5 font-mono">Start Time</p>
                                                                <p className="font-bold text-white">{startTime || "—"}</p>
                                                            </div>
                                                        </div>
                                                        <div className="px-4 py-3">
                                                            <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-0.5 font-mono">Duration</p>
                                                            <p className="font-bold text-white">{hours} hour{hours > 1 ? "s" : ""}</p>
                                                        </div>
                                                        <div className="px-4 py-3">
                                                            <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-0.5 font-mono">Location</p>
                                                            <p className="font-bold text-white">{pickupLocation}</p>
                                                        </div>
                                                        {selectedExtras.length > 0 && (
                                                            <div className="px-4 py-3">
                                                                <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-1 font-mono">Add-ons</p>
                                                                {selectedExtras.map(id => {
                                                                    const ex = EXTRAS.find(x => x.id === id)!;
                                                                    return <p key={id} className="text-zinc-300">• {ex.label} <span className="text-[#b3122e]">+${ex.price}</span></p>;
                                                                })}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Price breakdown */}
                                                    <div className="space-y-2 text-sm">
                                                        <div className="flex justify-between text-zinc-400">
                                                            <span>{car.price} × {hours} hour{hours > 1 ? "s" : ""}</span>
                                                            <span className="text-white">${basePrice.toLocaleString()}</span>
                                                        </div>
                                                        {selectedExtras.map(id => {
                                                            const ex = extras.find(x => x.id === id)!;
                                                            return (
                                                                <div key={id} className="flex justify-between text-zinc-400">
                                                                    <span>{ex.label}</span>
                                                                    <span className="text-white">+${ex.price}</span>
                                                                </div>
                                                            );
                                                        })}
                                                        <div className="flex justify-between text-zinc-400">
                                                            <span>Tolls &amp; Fees</span>
                                                            <span className="text-zinc-500">Billed separately</span>
                                                        </div>
                                                        <div className="flex justify-between font-extrabold text-white text-lg border-t border-white/10 pt-2">
                                                            <span>Estimated Total</span>
                                                            <span className="text-[#b3122e]">${grandTotal.toLocaleString()}*</span>
                                                        </div>
                                                        <p className="text-[10px] text-zinc-500">*Excluding tolls &amp; applicable fees</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Navigation Buttons */}
                                        <div className={`mt-6 flex gap-3 ${step > 0 ? "justify-between" : "justify-end"}`}>
                                            {step > 0 && (
                                                <Button type="button" variant="outline" onClick={goBack}
                                                    className="cta-btn flex items-center gap-1.5 border-white/20 text-zinc-300 hover:bg-white/10 uppercase rounded-sm h-12 px-4">
                                                    <ChevronLeft className="w-4 h-4" /> Back
                                                </Button>
                                            )}
                                            {step < 3 ? (
                                                <Button type="button" onClick={goNext} disabled={!canProceed()}
                                                    className="cta-btn flex-1 bg-[#b3122e] hover:bg-[#8e0e24] disabled:bg-white/10 disabled:text-zinc-500 text-white h-12 uppercase rounded-sm flex items-center justify-center gap-2 transition-all">
                                                    Continue <ChevronRight className="w-4 h-4" />
                                                </Button>
                                            ) : (
                                                <Button type="button" onClick={handleSubmit}
                                                    className="cta-btn flex-1 bg-[#b3122e] hover:bg-[#8e0e24] text-white h-12 uppercase rounded-sm">
                                                    Confirm Reservation
                                                </Button>
                                            )}
                                        </div>

                                        <p className="text-center text-[10px] text-zinc-500 mt-3">
                                            No charge today · Free cancellation up to 48 hrs
                                        </p>
                                    </div>
                                ) : (
                                    /* ── SUCCESS STATE ── */
                                    <div className="p-8 bg-[#141416] text-center space-y-4 text-white">
                                        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
                                            <Check className="w-8 h-8 text-green-400" />
                                        </div>
                                        <h3 className="text-xl font-extrabold text-white">Reservation Received!</h3>
                                        <p className="text-zinc-300 text-sm leading-relaxed">
                                            Hey <strong>{contact.name}</strong>! Our team will call you at <strong>{contact.phone}</strong> within <strong>2 hours</strong> to finalize your <strong>{car.title}</strong> booking in {pickupLocation}.
                                        </p>
                                        <div className="bg-white/5 border border-white/10 rounded-sm p-4 text-left text-sm space-y-1.5 text-zinc-300">
                                            <p>📅 <strong>{formatDate(bookingDate)}</strong> at <strong>{startTime || "—"}</strong> · <strong>{hours} hr{hours > 1 ? "s" : ""}</strong></p>
                                            <p>📍 {pickupLocation}</p>
                                            <p>💰 Est. <strong className="text-[#b3122e]">${grandTotal.toLocaleString()}</strong> (excl. tolls)</p>
                                        </div>
                                        <a href="https://smooveluxurybooking.as.me/schedule/b24e2156" target="_blank" rel="noopener noreferrer" className="block w-full bg-[#b3122e] text-white font-bold py-3 text-sm uppercase tracking-wider text-center rounded-sm hover:bg-[#8e0e24] transition-colors">
                                            Book Online Now
                                        </a>
                                        <button onClick={() => { setSubmitted(false); setStep(0); }} className="text-xs text-zinc-400 underline hover:text-white">
                                            Start a new booking
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Contact nudge */}
                            <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-sm text-sm text-zinc-300 text-center">
                                Questions? Book online at{" "}
                                <a href="https://smooveluxurybooking.as.me/schedule/b24e2156" target="_blank" rel="noopener noreferrer" className="font-bold text-white hover:text-[#b3122e] hover:underline">smooveluxurybooking.as.me</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Vehicles */}
                {related.length > 0 && (
                    <div className="mt-20">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-extrabold text-white">More in {car.location}</h2>
                            <button onClick={() => navigate("/fleet")} className="flex items-center gap-1 text-sm font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors">
                                View All <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {related.map(rc => (
                                <div key={rc.id} onClick={() => navigate(`/fleet/${rc.slug}`)}
                                    className="group border border-neutral-800 hover:border-[#b3122e]/50 hover:shadow-xl transition-all duration-300 cursor-pointer bg-[#141416] overflow-hidden rounded-sm">
                                    <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
                                        {rc.image ? (
                                            <img src={rc.image} alt={rc.title}
                                                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-neutral-600">
                                                <Car className="w-12 h-12 stroke-[1]" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute bottom-4 left-4 text-white">
                                            <p className="text-xs text-zinc-400 uppercase tracking-wider mb-0.5">{rc.location}</p>
                                            <h3 className="font-extrabold text-lg leading-tight text-white">{rc.title}</h3>
                                        </div>
                                    </div>
                                    <div className="p-4 flex justify-between items-center">
                                        <div>
                                            <p className="text-[11px] uppercase tracking-wider text-zinc-400 font-bold font-mono">Price/Hour</p>
                                            <p className="text-2xl font-extrabold text-[#b3122e]">{rc.price || "Ask for rate"}</p>
                                        </div>
                                        <Button className="bg-[#b3122e] hover:bg-[#8e0e24] text-white text-xs font-bold px-4 h-9 rounded-sm uppercase tracking-wider">
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
