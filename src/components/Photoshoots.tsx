import { BOOKING_URL } from "@/components/Header";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "./RevealOnScroll";

// All photoshoot photos from /public/images/photoshoots/
const photoshootImages = [
  "/images/photoshoots/2.jpg",
  "/images/photoshoots/3.jpg",
  "/images/photoshoots/4.jpg",
  "/images/photoshoots/5.jpg",
  "/images/photoshoots/6.jpg",
  "/images/photoshoots/1.jpg",
];

const Photoshoots = () => {
  return (
    <section id="photoshoots" className="py-20 md:py-32 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header (Follows the section divider) */}
        <RevealOnScroll isHeading>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-12 sm:mb-16">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold tracking-[0.25em] text-[#b3122e] uppercase block font-mono">
                LIFESTYLE PHOTOSHOOTS
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal text-white leading-[1.05] tracking-tight">
                Shoot the Night.
              </h2>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-sans md:hidden">
                Book a Maybach, Rolls-Royce, Cullinan or Escalade by the hour for your next shoot. Choose your vehicle, bring your own photographer, and send us the address, date and time. Shoots available in all states.
              </p>
              <div>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-btn inline-flex items-center justify-center px-10 py-4 bg-[#b3122e] hover:bg-[#8e0e24] text-white uppercase rounded-sm transition-colors shadow-lg"
                >
                  Book a Shoot
                </a>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Photos Grid with Sequential Stagger */}
        {photoshootImages && photoshootImages.length > 0 ? (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {photoshootImages.map((imgSrc, idx) => (
              <StaggerItem key={idx}>
                <div
                  className="group relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl bg-neutral-950 transition-all duration-500 hover:-translate-y-2 hover:shadow-white/10"
                >
                  <img
                    src={imgSrc}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none rounded-2xl" />
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5].map((n) => (
              <StaggerItem key={n}>
                <div
                  className="relative aspect-[4/5] sm:aspect-[3/4] rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center p-6 text-center text-xs text-neutral-500 font-mono"
                >
                  <span>// ADD CLIENT PHOTOS</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

      </div>
    </section>
  );
};

export default Photoshoots;
