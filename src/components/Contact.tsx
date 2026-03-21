import { useState } from "react";
import { Button } from "./ui/button";
import { CheckCircle2 } from "lucide-react";

const Contact = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    location: "Boston, MA",
    service: "Daily Rental",
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

  const inputClass = "w-full bg-transparent border-b border-black py-4 text-xl focus:outline-none placeholder:text-gray-400 transition-colors rounded-none font-sans";
  const labelClass = "block text-xs font-mono uppercase tracking-widest text-black mb-2 mt-10";
  
  const locations = ["Boston, MA", "Miami, FL", "Atlanta, GA", "Los Angeles, CA"];
  const services = ["Daily Rental", "Chauffeur Service", "Photo / Video Shoot", "Special Event"];

  if (isSuccess) {
    return (
      <section id="contact" className="py-24 bg-[#f4f4f4] flex items-center justify-center min-h-[600px]">
        <div className="bg-white p-12 shadow-sm text-center max-w-lg mx-4 animate-fade-in border border-gray-200">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-3xl font-medium font-sans text-black mb-4 tracking-tight">Request Received</h3>
          <p className="text-gray-600 font-sans mb-8 text-lg">
            Thank you! A member of our team will reach out shortly to confirm your reservation parameters.
          </p>
          <Button
            onClick={() => setIsSuccess(false)}
            className="bg-black text-white px-8 py-6 rounded-none font-bold hover:bg-gray-800 transition-all tracking-widest uppercase text-xs"
          >
            Submit Another Request
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 lg:py-32 bg-black overflow-hidden relative border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto bg-[#f4f4f4] p-8 sm:p-16 lg:p-20 shadow-2xl relative">
          
          {/* Header */}
          <div className="mb-16">
            <p className="text-sm font-mono uppercase tracking-widest text-black mb-8 font-medium">
              // GET IN TOUCH
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-normal leading-[1.1] text-[#111] tracking-tight font-sans">
              For any inquiries or to secure the exotic vehicle of your choice, we invite you to contact our team by filling out the form below.
            </h2>
          </div>

          <div className="w-full h-px bg-gray-300 mb-10"></div>

          {/* Minimalist Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

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

            <div className="pt-6">
              <label className={labelClass}>What location are you renting in?</label>
              <div className="flex flex-wrap gap-4 mt-6">
                {locations.map((loc) => (
                  <div
                    key={loc}
                    onClick={() => handleInputChange('location', loc)}
                    className="bg-white px-6 py-4 cursor-pointer flex items-center border border-transparent hover:border-black/5 transition-all shadow-sm group"
                  >
                    <div className={`w-5 h-5 flex-shrink-0 rounded-full border flex items-center justify-center mr-3 transition-colors ${formState.location === loc ? 'border-[#F2A900]' : 'border-gray-300'}`}>
                      {formState.location === loc && <div className="w-3 h-3 bg-[#F2A900] rounded-full" />}
                    </div>
                    <span className="text-base font-sans text-gray-800">{loc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <label className={labelClass}>What service are you most interested in?</label>
              <div className="flex flex-wrap gap-4 mt-6">
                {services.map((srv) => (
                  <div
                    key={srv}
                    onClick={() => handleInputChange('service', srv)}
                    className="bg-white px-6 py-4 cursor-pointer flex items-center border border-transparent hover:border-black/5 transition-all shadow-sm group"
                  >
                    <div className={`w-5 h-5 flex-shrink-0 rounded-full border flex items-center justify-center mr-3 transition-colors ${formState.service === srv ? 'border-[#F2A900]' : 'border-gray-300'}`}>
                      {formState.service === srv && <div className="w-3 h-3 bg-[#F2A900] rounded-full" />}
                    </div>
                    <span className="text-base font-sans text-gray-800">{srv}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 pb-4">
              <label className={labelClass}>Message &amp; Preferred Vehicle *</label>
              <textarea
                required
                placeholder="Hello, I'm interested in..."
                className="w-full bg-white/50 border border-[#F2A900] min-h-[160px] p-5 text-xl focus:outline-none placeholder:text-gray-400 transition-colors rounded-none font-sans mt-4"
                value={formState.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
              />
            </div>

            <div className="pt-8">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto h-16 px-12 bg-black hover:bg-gray-800 text-white text-xs font-mono font-bold tracking-[0.2em] uppercase rounded-none transition-all duration-300"
              >
                {isSubmitting ? "Sending..." : "Submit Inquiry"}
              </Button>
            </div>

          </form>

        </div>
      </div>
    </section>
  );
};

export default Contact;