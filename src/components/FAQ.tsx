import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
    const faqs = [
        {
            question: "What types of cars are available for rent?",
            answer: "We offer a curated fleet of high-performance vehicles, including brands like Lamborghini, Ferrari, and Porsche, ensuring a thrilling driving experience."
        },
        {
            question: "What is the cancellation policy?",
            answer: "Yes, you may cancel your reservation. While we do not offer refunds, we provide an in-house credit that can be applied toward any future reservation."
        },
        {
            question: "Are there any age restrictions for renting a car?",
            answer: "Yes, drivers must be at least 25 years old and possess a valid driver's license. Some exceptions may apply. Additional requirements may apply depending on the vehicle type."
        },
        {
            question: "Do you offer insurance?",
            answer: "Insurance is available for purchase for international drivers exclusively through a third party. Domestic drivers must provide their own car insurance."
        },
        {
            question: "Can I extend my rental period?",
            answer: "Yes, you can extend your rental period based on availability. Please contact our team for assistance with modifications."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all forms of payment methods including all major credit cards, debit cards, wire transfers, Bitcoin, Ethereum, USDC, and cash."
        },
        {
            question: "Are the cars manual or automatic?",
            answer: "All of our vehicles have automatic transmission systems. Many also have paddle shifters which are very easy to operate. If you have any questions or concerns, your sales representative can give you a driving tutorial."
        },
        {
            question: "Can there be multiple drivers?",
            answer: "Yes, each additional driver must be over the age of 21 and must provide us with a valid driver's license and full coverage insurance."
        },
        {
            question: "Can I drive my rented car anywhere?",
            answer: "Rented vehicles may not be driven outside the state without prior written approval."
        },
        {
            question: "How many miles come with the rental?",
            answer: "Each reservation comes with 100 miles per day. Anything over has an additional cost which varies by vehicle. Reach out to us for specific per-mile pricing."
        },
        {
            question: "I'm under 21 and need a car for prom — can a family member rent it for me?",
            answer: "No, all drivers must meet our rental criteria. However, if you would like to arrange for a Chauffeur service, we're happy to accommodate."
        }
    ];

    return (
        <section className="py-24 lg:py-32 bg-[#FDF8F3]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                    {/* Left Column: Heading */}
                    <div className="lg:col-span-4 space-y-6">
                        <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase block">
                            FAQ
                        </span>

                        <h2 className="text-5xl md:text-6xl lg:text-6xl font-serif font-normal text-[#1a2a3a] leading-[1.1]">
                            Frequently<br />
                            Asked
                        </h2>
                    </div>

                    {/* Right Column: Accordion */}
                    <div className="lg:col-span-8">
                        <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="border-0 mb-3"
                                >
                                    <AccordionTrigger className="bg-[#F5EDE6] hover:bg-[#EFE5DC] px-6 py-5 rounded-lg text-sm md:text-base font-bold tracking-[0.05em] uppercase text-[#1a2a3a] text-left transition-colors [&[data-state=open]]:rounded-b-none">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="bg-[#F5EDE6] px-6 pb-6 pt-0 rounded-b-lg text-gray-700 font-sans text-base leading-relaxed">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FAQ;
