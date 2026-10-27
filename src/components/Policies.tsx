import {
  CircleDollarSign,
  Laptop,
  Car,
  Cigarette,
  Clock,
  CalendarX2,
  Sparkles
} from "lucide-react";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "./RevealOnScroll";

interface PolicyItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}

const policies: PolicyItem[] = [
  {
    id: "deposit",
    icon: <CircleDollarSign className="w-7 h-7 text-[#b3122e]" />,
    title: "50% Deposit & Accepted Payments",
    content: (
      <p className="text-gray-300 text-sm md:text-base leading-relaxed">
        A <span className="text-white font-bold">50% non-refundable deposit</span> is required to secure your reservation.
        The remaining balance must be paid no later than <span className="text-white font-semibold">5 hours prior</span> to your scheduled pickup time.
        <span className="block mt-2 font-semibold text-white">Accepted payment methods include Zelle, Apple Pay, and Cash App only.</span>
      </p>
    ),
  },
  {
    id: "expedited",
    icon: <Laptop className="w-7 h-7 text-[#b3122e]" />,
    title: "Expedited & Cash Handling Fees",
    content: (
      <p className="text-gray-300 text-sm md:text-base leading-relaxed">
        Reservations made <span className="text-white font-semibold">within 24 hours</span> of the scheduled pickup will incur a <span className="text-white font-bold">$20 expedited booking fee</span>.
        For bookings requiring the business owner to collect cash in person, an additional <span className="text-white font-bold">$20 handling fee</span> will be applied.
      </p>
    ),
  },
  {
    id: "tolls",
    icon: <Car className="w-7 h-7 text-[#b3122e]" />,
    title: "NYC Congestion & State Line Tolls",
    content: (
      <p className="text-gray-300 text-sm md:text-base leading-relaxed">
        Trips that involve travel to or through New York City will include a <span className="text-white font-bold">$9 congestion/toll surcharge</span>.
        Long-distance travel or trips across state lines will be assessed an <span className="text-white font-semibold">additional mileage and toll fee</span>, discussed at the time of booking.
      </p>
    ),
  },
  {
    id: "smoking",
    icon: <Cigarette className="w-7 h-7 text-[#b3122e]" />,
    title: "Smoking Policy ($180 Fee)",
    content: (
      <p className="text-gray-300 text-sm md:text-base leading-relaxed">
        Smoking is permitted inside the vehicle <span className="text-white font-semibold">upon request</span> and will incur a <span className="text-white font-bold">$180 smoking fee</span>.
        This fee covers mandatory deep cleaning and air sanitization to maintain the vehicle's pristine luxury standards.
      </p>
    ),
  },
  {
    id: "time",
    icon: <Clock className="w-7 h-7 text-[#b3122e]" />,
    title: "Time-Based Bookings & Delays",
    content: (
      <p className="text-gray-300 text-sm md:text-base leading-relaxed">
        <span className="text-white font-bold">All bookings are time-based.</span> If your trip exceeds the reserved time, an additional hour will automatically be charged.
        Please allow for traffic delays when scheduling your reservation, as time cannot be adjusted due to unforeseen congestion.
      </p>
    ),
  },
  {
    id: "cancellation",
    icon: <CalendarX2 className="w-7 h-7 text-[#b3122e]" />,
    title: "Cancellations & Deposit Credits",
    content: (
      <p className="text-gray-300 text-sm md:text-base leading-relaxed">
        Deposits are non-refundable but may be <span className="text-white font-semibold">credited toward a future booking</span> if advance notice is provided.
        Last-minute cancellations or failure to remit final payment on time will result in <span className="text-white font-bold">forfeiture of the deposit</span>.
      </p>
    ),
  },
];

const Policies = () => {
  return (
    <section id="policies" className="py-20 md:py-32 bg-black text-white overflow-hidden relative">

      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#b3122e]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header (Follows the section divider) */}
        <RevealOnScroll isHeading>
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-20">


            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white uppercase tracking-wide leading-tight">
              Policies &amp; Booking Guidelines
            </h2>

            <div className="w-16 h-[2px] bg-[#b3122e] mt-6" />
          </div>
        </RevealOnScroll>

        {/* Policies Grid with Luxury Sequential Stagger */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {policies.map((policy) => (
            <StaggerItem key={policy.id} className="h-full">
              <div
                className="group relative bg-[#0b0b0b] border border-white/10 rounded-2xl p-7 sm:p-9 transition-all duration-300 hover:border-white/30 hover:bg-[#111111] hover:shadow-2xl hover:-translate-y-1 flex flex-col h-full"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center flex-shrink-0 transition-all duration-300">
                    {policy.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-onest text-white tracking-tight leading-snug">
                    {policy.title}
                  </h3>
                </div>

                <div className="pl-0 sm:pl-2">
                  {policy.content}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Note / Disclaimer */}
        <RevealOnScroll delay={250} className="mt-14 max-w-3xl mx-auto text-center pt-4">
          <p className="text-xs sm:text-sm text-gray-400 font-sans leading-relaxed">
            Please review all policies prior to booking. For special inquiries, custom routes, or corporate arrangements,
            feel free to reach out to our team at{" "}
            <a
              href="https://smooveluxurybooking.as.me/schedule/b24e2156"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline hover:text-[#b3122e] transition-colors"
            >
              our scheduling portal
            </a>.
          </p>
        </RevealOnScroll>

      </div>
    </section>
  );
};

export default Policies;
