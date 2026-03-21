const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-24 pb-12 overflow-hidden border-t border-white/10">
      <div className="container mx-auto px-4 md:px-8">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-24">

          {/* Navigation Column */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-8">
              Navigate
            </h4>
            <ul className="space-y-2">
              {[
                { label: "About Us", href: "#about" },
                { label: "Contact Us", href: "#contact" },
                { label: "Rent a Car", href: "#rent" },
                { label: "Shop", href: "#shop" },
                { label: "FAQ", href: "#faq" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-4xl md:text-5xl font-normal hover:italic hover:text-gray-300 transition-all duration-300 block"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations Column */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-8">
              Locations
            </h4>
            <ul className="space-y-2">
              {[
                "Boston, MA",
                "Miami, FL",
                "Atlanta, GA",
                "Los Angeles, CA",
              ].map((city) => (
                <li key={city}>
                  <span className="text-4xl md:text-5xl font-normal hover:italic hover:text-gray-300 transition-all duration-300 block cursor-default">
                    {city}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Grid */}
          <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-12">

            {/* Sales */}
            <div>
              <h4 className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-6">
                Sales
              </h4>
              <p className="text-lg text-gray-300 leading-relaxed font-sans">
                <a href="tel:8572778709" className="hover:text-white transition-colors block">
                  (857) 277-8709
                </a>
                <a href="tel:8575060531" className="hover:text-white transition-colors block">
                  (857) 506-0531
                </a>
              </p>
            </div>

            {/* Email */}
            <div>
              <h4 className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-6">
                Email Us
              </h4>
              <a
                href="mailto:bookings@88exoticrentals.com"
                className="text-lg text-gray-300 leading-relaxed font-sans hover:text-white transition-colors"
              >
                bookings@88exoticrentals.com
              </a>
            </div>

            {/* Main Location */}
            <div>
              <h4 className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-6">
                Main Location
              </h4>
              <p className="text-lg text-gray-300 leading-relaxed font-sans max-w-xs">
                Boston, MA 02116
              </p>
            </div>

            {/* Hours */}
            <div>
              <h4 className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-6">
                Hours
              </h4>
              <ul className="text-sm text-gray-300 leading-relaxed font-sans space-y-1">
                <li className="flex justify-between gap-4"><span>Monday</span><span>9:00AM–10:00PM</span></li>
                <li className="flex justify-between gap-4"><span>Tuesday</span><span>9:00AM–10:00PM</span></li>
                <li className="flex justify-between gap-4"><span>Wednesday</span><span>9:00AM–10:00PM</span></li>
                <li className="flex justify-between gap-4"><span>Thursday</span><span>9:00AM–10:00PM</span></li>
                <li className="flex justify-between gap-4"><span>Friday</span><span>9:00AM–10:00PM</span></li>
                <li className="flex justify-between gap-4"><span>Saturday</span><span>9:00AM–10:00PM</span></li>
                <li className="flex justify-between gap-4"><span>Sunday</span><span>9:00AM–10:00PM</span></li>
              </ul>
            </div>

          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 relative">

          <span className="text-xs font-bold tracking-[0.1em] text-gray-400 uppercase order-2 md:order-1">
            Made with <span className="text-red-500">♥</span> in Boston
          </span>

          <div className="order-1 md:order-2 bg-black px-8 -mt-20 md:-mt-24 z-10 text-center">
            <img 
              src="https://lirp.cdn-website.com/eccf826b/dms3rep/multi/opt/noBgColor--282-29-e9c2541f-1920w.png" 
              alt="88 Exotic Car Rentals" 
              className="h-16 w-auto object-contain mx-auto"
            />
          </div>

          <span className="text-xs font-bold tracking-[0.1em] text-gray-400 uppercase order-3 text-right">
            © {currentYear} Luxury Car Rental Co.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;