import { Phone, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const MobileCTA = () => {
    const scrollToContact = () => {
        const element = document.getElementById("contact");
        if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    const navigate = useNavigate();

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden flex h-16 bg-black shadow-[0_-1px_0_rgba(255,255,255,0.1)]">
            <Button
                onClick={scrollToContact}
                className="flex-1 bg-black hover:bg-gray-900 text-white font-black font-montserrat uppercase h-full rounded-none text-sm tracking-wider border-r border-white/10"
            >
                Reserve Now
            </Button>
            <Button
                onClick={() => navigate("/fleet")}
                className="flex-1 bg-black hover:bg-gray-900 text-[#D4AF37] font-black font-montserrat uppercase h-full rounded-none text-sm tracking-wider"
            >
                View Fleet
            </Button>
        </div>
    );
};

export default MobileCTA;
