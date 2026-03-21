import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import RevealOnScroll from "@/components/RevealOnScroll";

const Services = () => {
  const services = [
    {
      image: "https://lirp.cdn-website.com/eccf826b/dms3rep/multi/opt/Lambo+2-1200h.jpg",
      title: "Exotic Car Rentals",
      description: "Choose from our curated fleet of Lamborghinis, Ferraris, Porsches, Rolls-Royces, and more. 100 miles per day included with every reservation."
    },
    {
      image: "https://lirp.cdn-website.com/eccf826b/dms3rep/multi/opt/rolls-royce-phantom-rental-chauffeur-services-mph-club-1920w.webp",
      title: "Chauffeur Services",
      description: "Arrive in style with our professional chauffeur service. Perfect for events, airport transfers, proms, and special occasions."
    },
    {
      image: "https://lirp.cdn-website.com/eccf826b/dms3rep/multi/opt/pexels-photo-34248933-1920w.jpeg",
      title: "PhotoShoot Rentals",
      description: "Elevate your creative vision. Rent our exotic vehicles for photo shoots, music videos, brand campaigns, and content creation."
    }
  ];

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToRooms = () => {
    const element = document.querySelector("#rooms");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-20 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section - Inspired by reference */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-end">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-black font-bold tracking-widest text-sm uppercase flex items-center gap-2 font-onest">
              <span className="w-8 h-[2px] bg-primary"></span>
              Our Services
            </span>
            <h2 className="text-4xl md:text-6xl font-normal font-onest text-black leading-[0.9] tracking-tighter">
              What We <br />
              <span className="text-black">Offer.</span>
            </h2>
          </div>

          <div className="lg:col-span-5 space-y-8">
            <p className="text-lg text-gray-600 font-sans leading-relaxed max-w-md">
              From exotic car rentals to chauffeur services and photoshoot experiences, we deliver
              the extraordinary. Choose <span className="font-bold">88 Exotic Car Rentals.</span>
            </p>
            <div className="flex flex-wrap gap-8 items-center">
              <button
                onClick={scrollToRooms}
                className="group flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-black border-b-2 border-black pb-1 hover:text-primary hover:border-primary transition-all duration-300"
              >
                View Fleet <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={scrollToContact}
                className="group flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-black border-b-2 border-black pb-1 hover:text-secondary hover:border-secondary transition-all duration-300"
              >
                Reserve Now <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-y-[-2px] group-hover:translate-x-[2px]" />
              </button>
            </div>
          </div>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <RevealOnScroll key={index} animation="slide-up" delay={index * 150}>
              <div
                className="group relative h-[400px] sm:h-[450px] overflow-hidden rounded-[2.5rem] bg-gray-100 flex flex-col justify-end p-8 w-full"
              >
                {/* Background Image */}
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col gap-4">
                  <h3 className="text-lg sm:text-xl font-bold font-onest text-white leading-tight">
                    {service.title}
                  </h3>

                  <p className="text-gray-300 font-sans text-xs opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-32 transition-all duration-500 overflow-hidden leading-relaxed">
                    {service.description}
                  </p>

                  <div className="flex justify-start">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center transition-transform duration-500 group-hover:bg-primary group-hover:rotate-45">
                      <ArrowUpRight className="w-5 h-5 text-black group-hover:text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;