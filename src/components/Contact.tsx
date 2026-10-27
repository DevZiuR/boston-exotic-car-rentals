import { useState } from "react";
import { Button } from "./ui/button";
import { CheckCircle2 } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";

const LOCATIONS = ["New York Tri-State", "Atlanta, GA", "Miami, FL", "Nationwide"];
const SERVICES = ["Chauffeur Service", "Airport Transfer", "Photoshoot / Content", "Special Event / Birthday"];

const Contact = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    location: "New York Tri-State",
    service: "Chauffeur Service",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const inputClass = "w-full bg-transparent border-b border-white/20 h-12 min-h-[48px] px-0 py-3 text-[16px] text-white focus:outline-none focus:border-white placeholder:text-zinc-500 transition-colors rounded-none font-sans";
  const labelClass = "block text-xs font-mono uppercase tracking-widest text-zinc-300 mb-1 mt-6";

  if (isSuccess) {
    return (
      <section id="contact" className="py-24 bg-[#07070a] flex items-center justify-center min-h-[600px] overflow-hidden">
        <div className="bg-white/[0.04] backdrop-blur-md p-12 shadow-2xl text-center max-w-lg mx-4 border border-white/20 rounded-xl text-white">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-400" />
          </div>
          <h3 className="text-3xl font-medium font-sans text-white mb-4 tracking-tight">Request Received</h3>
          <p className="text-zinc-300 font-sans mb-8 text-lg">
            Thank you! A member of our team will reach out shortly to confirm your reservation parameters.
          </p>
          <Button
            onClick={() => setIsSuccess(false)}
            className="bg-[#b3122e] hover:bg-[#8e0e24] text-white px-8 py-6 rounded-none font-bold transition-all tracking-widest uppercase text-xs shadow-lg"
          >
            Submit Another Request
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-14 lg:py-20 bg-[#07070a] overflow-hidden relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto bg-white/[0.03] backdrop-blur-md border border-white/20 p-6 sm:p-10 lg:p-14 shadow-2xl relative rounded-xl">
          
          {/* Header (Follows the section divider) */}
          <RevealOnScroll isHeading>
            <div className="mb-8">
              <p className="text-sm font-mono uppercase tracking-widest text-zinc-400 mb-4 font-medium">
                // GET IN TOUCH
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-normal leading-[1.1] text-white tracking-tight font-sans">
                For any inquiries or to secure the luxury vehicle of your choice, contact our team by filling out the form below — or book instantly online.
              </h2>
              <a
                href="https://smooveluxurybooking.as.me/schedule/b24e2156"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-5 text-sm font-mono uppercase tracking-widest font-bold text-white border-b-2 border-white pb-1 hover:text-[#b3122e] hover:border-[#b3122e] transition-colors"
              >
                Book Online Now →
              </a>
            </div>
          </RevealOnScroll>

          <div className="w-full h-px bg-white/10 mb-6"></div>

          {/* Minimalist Form */}
          <RevealOnScroll delay={200}>
            <form onSubmit={handleSubmit} className="space-y-3">

              <div>
                <label className={labelClass}>Name *</label>
                <input
                  required
                  placeholder="John Smith"
                  className={inputClass}
                  value={formState.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Email *</label>
                <input
                  required
                  type="email"
                  placeholder="john@gmail.com"
                  className={inputClass}
                  value={formState.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Phone *</label>
                <input
                  required
                  type="tel"
                  placeholder="(555) 000-0000"
                  className={inputClass}
                  value={formState.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>

              <div className="pt-2">
                <label className={labelClass}>What area are you booking in?</label>
                <div className="flex flex-wrap gap-3 mt-3">
                  {LOCATIONS.map((loc) => (
                    <div
                      key={loc}
                      onClick={() => handleInputChange('location', loc)}
                      className="bg-white/5 border border-white/10 hover:border-white/30 px-4 py-3 min-h-[48px] cursor-pointer flex items-center transition-all shadow-sm group rounded-sm"
                    >
                      <div className={`w-5 h-5 flex-shrink-0 rounded-full border flex items-center justify-center mr-3 transition-colors ${formState.location === loc ? 'border-[#b3122e]' : 'border-white/30'}`}>
                        {formState.location === loc && <div className="w-3 h-3 bg-[#b3122e] rounded-full" />}
                      </div>
                      <span className="text-base font-sans text-zinc-200 group-hover:text-white">{loc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <label className={labelClass}>What service are you most interested in?</label>
                <div className="flex flex-wrap gap-3 mt-3">
                  {SERVICES.map((srv) => (
                    <div
                      key={srv}
                      onClick={() => handleInputChange('service', srv)}
                      className="bg-white/5 border border-white/10 hover:border-white/30 px-4 py-3 min-h-[48px] cursor-pointer flex items-center transition-all shadow-sm group rounded-sm"
                    >
                      <div className={`w-5 h-5 flex-shrink-0 rounded-full border flex items-center justify-center mr-3 transition-colors ${formState.service === srv ? 'border-[#b3122e]' : 'border-white/30'}`}>
                        {formState.service === srv && <div className="w-3 h-3 bg-[#b3122e] rounded-full" />}
                      </div>
                      <span className="text-base font-sans text-zinc-200 group-hover:text-white">{srv}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 pb-2">
                <label className={labelClass}>Message &amp; Preferred Vehicle *</label>
                <textarea
                  required
                  placeholder="Hello, I'm interested in..."
                  className="w-full bg-white/5 border border-white/20 min-h-[120px] p-4 text-[16px] text-white focus:outline-none focus:border-white placeholder:text-zinc-500 transition-colors rounded-none font-sans mt-3"
                  value={formState.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto h-14 min-h-[48px] px-12 bg-[#b3122e] hover:bg-[#8e0e24] text-white text-xs font-mono font-bold tracking-[0.2em] uppercase rounded-none transition-all duration-300 shadow-xl flex items-center justify-center"
                >
                  {isSubmitting ? "Sending..." : "Submit Inquiry"}
                </Button>
              </div>

            </form>
          </RevealOnScroll>

        </div>
      </div>
    </section>
  );
};

export default Contact;