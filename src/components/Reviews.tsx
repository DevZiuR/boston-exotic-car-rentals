import { Star, Quote, ArrowUpRight } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";

const reviews = [
  {
    id: 1,
    source: "Google",
    sourceColor: "text-[#4285F4]",
    text: "Amazing service and amazing experience with 88 Exotic rentals in Miami. Thank you so much for everything. The car was absolutely smooth and great drive for my week stay. Thank you again and definitely looking forward to renting with you guys. Next time I come back.",
    author: "RAFAEL 'REY' REYES",
    details: "Google Review",
    avatar: null
  },
  {
    id: 2,
    source: "Google",
    sourceColor: "text-[#4285F4]",
    text: "I had an absolutely phenomenal experience with this exotic car rental business! From the moment I walked in, I was greeted with top-notch service. The selection of exotic cars they offer is simply stunning; I felt like a kid in a candy store. The staff was incredibly knowledgeable and helped me choose the perfect car for my special occasion.",
    author: "JOSHUA RAMOTAR",
    details: "Google Review",
    avatar: null
  },
  {
    id: 3,
    source: "Google",
    sourceColor: "text-[#4285F4]",
    text: "Great experience overall. The car was amazing and Mona and Eduardo were super easy to work with. They were clear with their communications and very helpful through the whole process. I would definitely rent again.",
    author: "JIMMY HOLLISTER",
    details: "Google Review",
    avatar: null
  },
  {
    id: 4,
    source: "Google",
    sourceColor: "text-[#4285F4]",
    text: "Absolutely incredible experience! Rented the Urus for a weekend and was NOT disappointed. Car was clean, and drove like an absolute dream. Customer service was also very respectful and made the entire process simple.",
    author: "DYLAN SMITH",
    details: "Google Review",
    avatar: null
  }
];

const Reviews = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({ delay: 4000, stopOnInteraction: false })]);

  return (
    <section className="py-24 bg-[#F9F8FD]">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#6B5B95] text-[#6B5B95]" />
            ))}
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal font-serif text-[#1a1a1a] mb-6">
            What Our Clients Say
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-sans">
            Real experiences from real drivers — all verified on Google
          </p>
        </div>

        {/* Carousel */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-6 md:-ml-8">
              {reviews.map((review) => (
                <div key={review.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-6 md:pl-8">
                  <div className="bg-white p-10 md:p-12 h-full flex flex-col rounded-xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300">

                    {/* Source Logo/Text */}
                    <div className={`text-xl font-bold mb-8 flex items-center gap-2 ${review.sourceColor}`}>
                      {/* Simple icon representation */}
                      <span className="font-bold tracking-tight">{review.source}</span>
                    </div>

                    {/* Review Text */}
                    <p className="text-xl md:text-2xl text-gray-800 font-sans font-light leading-relaxed mb-12 flex-grow">
                      "{review.text}"
                    </p>

                    {/* Author Info */}
                    <div className="mt-auto flex items-center gap-4">
                      {review.avatar && (
                        <img
                          src={review.avatar}
                          alt={review.author}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <h4 className="text-xs font-bold tracking-[0.2em] text-gray-900 uppercase mb-2">
                          {review.author}
                        </h4>
                        <p className="text-[10px] md:text-xs font-bold tracking-[0.1em] text-gray-400 uppercase">
                          {review.details}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* View More Reviews CTA */}
        <div className="mt-16 text-center animate-fade-in relative z-10">
          <a
            href="https://maps.app.goo.gl/7Km7zf1edbvgBjss6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#1a1a1a] hover:bg-[#333] text-white px-10 py-5 text-sm font-bold uppercase tracking-[0.2em] rounded-none transition-all duration-300 hover:shadow-xl group"
          >
            Read All Reviews On Google
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default Reviews