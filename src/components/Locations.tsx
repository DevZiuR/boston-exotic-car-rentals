import { ChevronRight, Check } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";

const Locations = () => {
    const marinaFeatures = [
        "Muelle de 300 metros",
        "Capacidad para 40 embarcaciones de placer",
        "Uso de muelle para huéspedes navegantes",
        "Mantenimiento náutico profesional",
        "Personal especializado disponible",
        "Storage locker individual por embarcación",
        "Conexiones eléctricas 220V y 110V",
        "Baños equipados para tripulación"
    ];

    return (
        <>

            {/* Marina Section */}
            <section id="marina" className="hidden py-20 md:py-32 bg-[#111111] text-white overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                        {/* Left Column: Image */}
                        <RevealOnScroll animation="fade-in" className="order-2 lg:order-1">
                            <div className="relative rounded-sm overflow-hidden border border-gray-800 shadow-lg h-[450px] md:h-[550px]">
                                <img
                                    src="https://aquavisuites.com.ve/wp-content/uploads/2021/01/Hotel-Aqua-Vi-83--scaled.jpg"
                                    alt="Marina Aqua Vi"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 pointer-events-none border-[15px] border-white/5"></div>

                                {/* Overlay Label */}
                                <div className="absolute top-6 left-6 bg-white px-4 py-2 shadow-xl border border-gray-100">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-900 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-black animate-pulse"></span>
                                        Marina 5 Estrellas
                                    </span>
                                </div>
                            </div>
                        </RevealOnScroll>

                        {/* Right Column: Content */}
                        <div className="flex flex-col space-y-8 order-1 lg:order-2">
                            <div className="space-y-6">
                                <span className="inline-block px-3 py-1 border border-gray-700 text-[10px] md:text-xs font-bold tracking-widest uppercase text-white">
                                    MARINA AQUA VI
                                </span>
                                <h2 className="text-4xl md:text-5xl lg:text-5xl font-normal text-white leading-tight tracking-tight">
                                    Tu Puerta al <br />
                                    Paraíso
                                </h2>
                                <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
                                    Amplia marina cinco estrellas con todo lo que tu embarcación necesita. Desde nuestro muelle, zarpa directamente hacia las aguas cristalinas y paisajes inolvidables de las Islas del Parque Nacional Mochima.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {marinaFeatures.map((feature, index) => (
                                    <div key={index} className="flex items-center space-x-3 text-gray-300">
                                        <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                                        <span className="text-sm font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Location Section */}
            <section id="locations" className="py-20 md:py-32 bg-white overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                        {/* Left Column: Map */}
                        <RevealOnScroll animation="fade-in" className="order-2 lg:order-1">
                            <div className="relative rounded-sm overflow-hidden border border-gray-200 shadow-lg h-[450px] md:h-[550px]">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26245053.499814555!2d-92.77681005000001!3d36.5844375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87e5c995ed9c291d%3A0x56d5780fd81da9e2!2s88%20Exotic%20Car%20Rentals%20Boston!5e0!3m2!1sen!2sus!4v1773027862345!5m2!1sen!2sus"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, filter: "grayscale(0.2) contrast(1.1)" }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="w-full h-full"
                                ></iframe>
                                <div className="absolute inset-0 pointer-events-none border-[15px] border-white/10"></div>

                                {/* Overlay Label */}
                                <div className="absolute top-6 left-6 bg-white px-4 py-2 shadow-xl border border-gray-100">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-900 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-black animate-pulse"></span>
                                        Our Locations
                                    </span>
                                </div>
                            </div>
                        </RevealOnScroll>

                        {/* Right Column: Content */}
                        <div className="flex flex-col space-y-8 order-1 lg:order-2">
                            <div className="space-y-6">
                                <span className="inline-block px-3 py-1 border border-gray-300 text-[10px] md:text-xs font-bold tracking-widest uppercase text-gray-900">
                                    LOCATIONS
                                </span>
                                <h2 className="text-4xl md:text-5xl lg:text-5xl font-normal text-gray-900 leading-tight tracking-tight">
                                    Find Us In <br />
                                    Premier Destinations
                                </h2>
                                <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
                                    88 Exotic Car Rentals is available in four major cities, bringing world-class exotic vehicles right to your door. Whether you're in
                                    <span className="font-bold"> Boston, Miami, Atlanta, or Los Angeles</span>— we've got you covered.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start space-x-4 p-4 bg-gray-50 border border-gray-100">
                                    <div className="w-10 h-10 bg-black text-white flex items-center justify-center flex-shrink-0">
                                        <ChevronRight className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">Main Location</h4>
                                        <p className="text-gray-600">Boston, MA 02116</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4 p-4 bg-gray-50 border border-gray-100">
                                    <div className="w-10 h-10 bg-black text-white flex items-center justify-center flex-shrink-0">
                                        <ChevronRight className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">Additional Cities</h4>
                                        <p className="text-gray-600">Miami, FL &nbsp;•&nbsp; Atlanta, GA &nbsp;•&nbsp; Los Angeles, CA</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default Locations;
