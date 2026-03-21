import { ArrowUpRight } from "lucide-react";

const Process = () => {
    const processSteps = [
        {
            number: "#01",
            title: "SETUP",
            description:
                "Before we start your renovation, we take the steps necessary to protect your flooring, furniture and other items. This would include covering the floor with drop cloths and moving all items to the center of the floor where we cover them with plastic sheeting.",
        },
        {
            number: "#02",
            title: "PREPARATION",
            description:
                "Next, our team of professionals prepares all surfaces, so by the end they will look as good as new. This step may also include sealing stains, scuff sanding the surface, and filling holes and cracks in the wall.",
        },
        {
            number: "#03",
            title: "PAINTING",
            description:
                "Once all surfaces are properly prepared, it’s time to begin the heart of your project. Your space will begin to take on a new life.",
        },
        {
            number: "#04",
            title: "CLEAN UP",
            description:
                "After everything has dried and set, we remove our tools and move everything back to where you request. We’ll also vacuum and sweep your floors to ensure the room is as clean, if not cleaner, than before we started your project.",
        },
    ];

    const scrollToContact = () => {
        const element = document.querySelector("#contact");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section id="process" className="py-20 md:py-32 bg-black text-white overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                    {/* Left Column: Fixed Content */}
                    <div className="flex flex-col space-y-12 lg:sticky lg:top-32">
                        <div>
                            <span className="inline-block px-3 py-1 border border-gray-700 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-8">
                                WHAT WE DO
                            </span>
                            <h2 className="text-4xl md:text-5xl lg:text-5xl font-normal text-white mb-8 leading-[1.1] tracking-tight">
                                Our Seamless <br />
                                Painting Process
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                                At Super Heros Painting LLC, we offer a systematic approach to painting tailored to meet the
                                unique needs of our clients. From initial setup to final touches, our
                                skilled team is dedicated to delivering excellence in every project.
                            </p>
                        </div>

                        <button
                            onClick={scrollToContact}
                            className="w-fit flex items-center gap-2 bg-[#AC96B6] text-black px-8 py-4 font-bold text-xs uppercase tracking-widest hover:bg-gray-200 transition-all group"
                        >
                            MORE SERVICES <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </button>
                    </div>

                    {/* Right Column: Process Steps */}
                    <div className="flex flex-col">
                        {processSteps.map((step, index) => (
                            <div
                                key={index}
                                className="border-t border-gray-800 py-12 md:py-16 first:border-t-0"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4">
                                    {/* Number */}
                                    <div className="md:col-span-2">
                                        <span className="text-sm font-bold text-gray-500 font-mono">
                                            {step.number}
                                        </span>
                                    </div>
                                    {/* Title */}
                                    <div className="md:col-span-4">
                                        <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-white/90">
                                            {step.title}
                                        </h3>
                                    </div>
                                    {/* Description */}
                                    <div className="md:col-span-6">
                                        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Bottom Border */}
                        <div className="border-t border-gray-800 w-full"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Process;
