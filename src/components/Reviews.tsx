import { Star, ChevronLeft, ChevronRight, Instagram } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback } from "react";
import RevealOnScroll from "./RevealOnScroll";

// Review screenshots from /public/images/reviews/
const reviewImages = [
  "/images/reviews/snapgram.io_1j8alqkrf4bu.jpg",
  "/images/reviews/snapgram.io_2zbndyy28i8b.jpg",
  "/images/reviews/snapgram.io_5qewmr9jk2n1.jpg",
  "/images/reviews/snapgram.io_6l31hl9r4kn8.jpg",
  "/images/reviews/snapgram.io_87xhfi7vv5ux.jpg",
  "/images/reviews/snapgram.io_b3ybhhgi2fub.jpg",
  "/images/reviews/snapgram.io_hnkad0rgqn4a.jpg",
  "/images/reviews/snapgram.io_hpk1nj8zwtdp.jpg",
  "/images/reviews/snapgram.io_o1wj1vnmep3w.jpg",
  "/images/reviews/snapgram.io_qen9afu3ubjf.jpg",
  "/images/reviews/snapgram.io_qw74fmgbvgtp.jpg",
  "/images/reviews/snapgram.io_yabs99kr8ueg.jpg",
];

const Reviews = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 3500, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section id="reviews" className="py-24 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header & Controls (Follows the section divider) */}
        <RevealOnScroll isHeading>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 md:mb-20">
            <div>
              <div className="flex items-center gap-1.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#b3122e] text-[#b3122e]" />
                ))}
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal text-white leading-tight tracking-tight">
                What Our Clients Say
              </h2>

              <p className="text-gray-400 text-sm md:text-base font-sans mt-3 max-w-xl">
                Authentic feedback, direct messages, and 5-star experiences shared directly by our riders.
              </p>
            </div>

            {/* Carousel Arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={scrollPrev}
                aria-label="Previous review"
                className="w-12 h-12 rounded-full border border-white/20 hover:border-white hover:bg-white hover:text-black flex items-center justify-center text-white transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollNext}
                aria-label="Next review"
                className="w-12 h-12 rounded-full border border-white/20 hover:border-white hover:bg-white hover:text-black flex items-center justify-center text-white transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </RevealOnScroll>

        {/* Carousel with Staggered Cards */}
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex -ml-4 md:-ml-6">
            {reviewImages.map((imgSrc, idx) => (
              <div
                key={idx}
                className="flex-[0_0_80%] sm:flex-[0_0_48%] md:flex-[0_0_32%] lg:flex-[0_0_24%] pl-4 md:pl-6"
              >
                <RevealOnScroll staggerIndex={idx % 4} className="h-full">
                  <div className="group relative aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl bg-neutral-900 border border-white/10 hover:border-white/30 transition-all duration-500 hover:-translate-y-2">
                    <img
                      src={imgSrc}
                      alt={`Client review ${idx + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </RevealOnScroll>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <RevealOnScroll delay={250} className="mt-16 text-center">
          <a
            href="https://instagram.com/smooveluxurytransportation"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-sm transition-all duration-300 hover:border-white"
          >
            <Instagram className="w-4 h-4 text-[#b3122e]" />
            Follow us on Instagram
          </a>
        </RevealOnScroll>

      </div>
    </section>
  );
};

export default Reviews;