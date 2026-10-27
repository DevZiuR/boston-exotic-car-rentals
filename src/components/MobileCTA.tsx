import { Phone, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const BOOKING_URL = "https://smooveluxurybooking.as.me/schedule/b24e2156";

const MobileCTA = () => {
    const navigate = useNavigate();

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden flex h-16 bg-black shadow-[0_-1px_0_rgba(255,255,255,0.1)]">
            <Button
                onClick={() => window.open(BOOKING_URL, "_blank", "noopener,noreferrer")}
                className="cta-btn flex-1 bg-[#b3122e] hover:bg-[#8e0e24] text-white uppercase h-full rounded-none border-r border-white/10"
            >
                Book Now
            </Button>
            <Button
                onClick={() => navigate("/fleet")}
                className="cta-btn flex-1 bg-black hover:bg-gray-900 text-white uppercase h-full rounded-none"
            >
                View Fleet
            </Button>
        </div>
    );
};

export default MobileCTA;
