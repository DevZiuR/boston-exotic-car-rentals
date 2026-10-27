import RevealOnScroll from "./RevealOnScroll";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#07070a] text-white pt-24 pb-12 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-24">

          {/* Navigation Column */}
          <div className="md:col-span-3">
            <RevealOnScroll staggerIndex={0}>
              <h4 className="text-xs font-bold tracking-[0.2em] text-[#b3122e] uppercase mb-8 font-mono">
                Navigate
              </h4>
              <ul className="space-y-2">
                {[
                  { label: "Fleet", href: "#fleet" },
                  { label: "Reserve Fleet", href: "/fleet" },
                  { label: "FAQ", href: "#faq" },
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="font-heading text-4xl md:text-5xl font-normal hover:italic hover:text-gray-300 transition-all duration-300 block uppercase"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
          </div>

          {/* Locations Column */}
          <div className="md:col-span-3">
            <RevealOnScroll staggerIndex={1}>
              <h4 className="text-xs font-bold tracking-[0.2em] text-[#b3122e] uppercase mb-8 font-mono">
                Locations
              </h4>
              <ul className="space-y-2">
                {[
                  "New York",
                  "New Jersey",
                  "Connecticut",
                  "Pennsylvania",
                  "Atlanta",
                  "Miami",
                ].map((city) => (
                  <li key={city}>
                    <span className="font-heading text-4xl md:text-5xl font-normal hover:italic hover:text-gray-300 transition-all duration-300 block cursor-default uppercase">
                      {city}
                    </span>
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
          </div>

          {/* Contact Grid */}
          <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-12">

            {/* Book Online */}
            <div>
              <RevealOnScroll staggerIndex={2}>
                <h4 className="text-xs font-bold tracking-[0.2em] text-[#b3122e] uppercase mb-6 font-mono">
                  Book Online
                </h4>
                <a
                  href="https://smooveluxurybooking.as.me/schedule/b24e2156"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-gray-300 leading-relaxed font-sans hover:text-white transition-colors"
                >
                  smooveluxurybooking.as.me
                </a>
              </RevealOnScroll>
            </div>

            {/* Social */}
            <div>
              <RevealOnScroll staggerIndex={3}>
                <h4 className="text-xs font-bold tracking-[0.2em] text-[#b3122e] uppercase mb-8 font-mono">
                  Follow Us
                </h4>
                <ul className="space-y-2">
                  {[
                    { label: "Instagram", href: "https://instagram.com/smooveluxurytransportation" },
                    { label: "TikTok", href: "https://www.tiktok.com/@smooveluxurytransportation" },
                  ].map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-heading text-4xl md:text-5xl font-normal hover:italic hover:text-gray-300 transition-all duration-300 block uppercase"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </RevealOnScroll>
            </div>

          </div>
        </div>

        {/* Footer Bottom */}
        <RevealOnScroll delay={250}>
          <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 relative">

            <span className="text-xs font-bold tracking-[0.1em] text-gray-400 uppercase order-2 md:order-1">
              Made with <span className="text-red-500">♥</span> in New York
            </span>

            <div className="order-1 md:order-2 bg-black px-8 -mt-20 md:-mt-24 z-10 text-center">
              <img
                src="/images/logo.png"
                alt="Smoove Luxury Transportation"
                className="h-36 w-auto object-contain mx-auto"
              />
            </div>

            <span className="text-xs font-bold tracking-[0.1em] text-gray-400 uppercase order-3 text-right">
              © {currentYear} Smoove Luxury Transportation
            </span>
          </div>
        </RevealOnScroll>
      </div>
    </footer>
  );
};

export default Footer;