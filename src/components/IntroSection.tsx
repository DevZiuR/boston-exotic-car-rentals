import RevealOnScroll from "./RevealOnScroll";

const IntroSection = () => {
    return (
        <section className="py-16 md:py-12 bg-white">
            <div className="container mx-auto px-4">
                <RevealOnScroll animation="fade-in">
                    <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                        <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-gray-500 uppercase mb-6">
                            Boston's Premier Exotic Experience
                        </span>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal leading-tight md:leading-snug text-black mb-0 font-serif max-w-3xl">
                            Where the thrill of the open road meets white-glove luxury. From Lamborghinis to Rolls-Royces — your extraordinary ride awaits.
                        </h2>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};

export default IntroSection;
