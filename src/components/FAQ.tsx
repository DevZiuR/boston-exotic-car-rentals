import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "./RevealOnScroll";

const faqs = [
    {
        question: "How does booking work?",
        answer: "Pick your vehicle, choose a date and time, select any add-ons, and pay the 50% deposit to confirm. Appointments without a deposit are not confirmed."
    },
    {
        question: "How is pricing calculated?",
        answer: "By the hour. Each vehicle has its own hourly rate and minimum — shown on its card — ranging from 3 to 5 hours for most vehicles and 1 hour for photoshoots. Tolls are billed separately."
    },
    {
        question: "Where do you operate?",
        answer: "Tri-State (NYC, NJ, PA, CT), Atlanta and Miami. Photoshoots are available in all 50 states."
    },
    {
        question: "How many passengers can each vehicle take?",
        answer: "It depends on the vehicle. Maybachs and the Rolls-Royce seat 2 to 3, SUVs seat 4 to 6, and Sprinters seat 7 to 18. Seat counts are listed on each vehicle's page."
    },
    {
        question: "How far ahead should I book a Sprinter?",
        answer: "Book 3 to 4 weeks ahead due to high demand. Other vehicles can be booked closer to the date, subject to availability."
    },
    {
        question: "Can I smoke in the vehicle?",
        answer: "Smoking is strictly prohibited unless the optional smoking fee add-on is selected and paid when booking (fees range from $105 to $200 depending on vehicle class). This fee covers comprehensive post-trip interior detailing and ozone sanitization. Unauthorized smoking incurs an automatic detailing penalty."
    },
    {
        question: "How do photoshoots work?",
        answer: "Choose a photoshoot listing, then provide the address, date and time. Bring your own photographer — except for the Atlanta photoshoot package, which includes one."
    },
    {
        question: "What if I need to cancel or I'm running late?",
        answer: "Cancel at least 24 hours ahead or the deposit is forfeited. No-call/no-shows are charged 100% of the service total. If you're more than 60 minutes late, the appointment is canceled and rebooking requires a new deposit."
    },
];

const FAQ = () => {
    return (
        <section id="faq" className="py-24 lg:py-32 bg-[#f5f2ed] text-[#0b0b0e] overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                    {/* Left Column: Heading */}
                    <div className="lg:col-span-4">
                        <RevealOnScroll isHeading className="space-y-6">
                            <span className="text-xs font-bold tracking-[0.2em] text-[#b3122e] font-mono uppercase block">
                                FAQ
                            </span>

                            <h2 className="text-5xl md:text-6xl lg:text-6xl font-serif font-normal text-[#0b0b0e] leading-[1.1]">
                                Frequently<br />
                                Asked
                            </h2>
                        </RevealOnScroll>
                    </div>

                    {/* Right Column: Accordion with Luxury Sequential Stagger */}
                    <div className="lg:col-span-8">
                        <StaggerContainer staggerDelay={0.07} className="w-full">
                            <Accordion type="single" collapsible className="w-full">
                                {faqs.map((faq, index) => (
                                    <StaggerItem key={index} className="mb-3">
                                        <AccordionItem
                                            value={`item-${index}`}
                                            className="border-0 shadow-none bg-white rounded-xl overflow-hidden"
                                        >
                                            <AccordionTrigger className="bg-white hover:bg-black/[0.02] border-0 shadow-none px-6 py-5 rounded-xl text-sm md:text-base font-bold tracking-[0.05em] uppercase text-[#0b0b0e] text-left transition-colors [&[data-state=open]]:rounded-b-none [&[data-state=open]]:border-b [&[data-state=open]]:border-[rgba(0,0,0,0.08)] [&>svg]:text-[#0b0b0e]">
                                                {faq.question}
                                            </AccordionTrigger>
                                            <AccordionContent className="bg-white border-0 shadow-none px-6 pb-6 pt-3 rounded-b-xl text-[#5b5b63] font-sans text-base leading-relaxed">
                                                {faq.answer}
                                            </AccordionContent>
                                        </AccordionItem>
                                    </StaggerItem>
                                ))}
                            </Accordion>
                        </StaggerContainer>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FAQ;
