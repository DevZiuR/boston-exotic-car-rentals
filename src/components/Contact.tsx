import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { CheckCircle2, ArrowUpRight, Car, ShieldCheck, Clock, Star } from "lucide-react";

const Contact = () => {
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    email: "",
    pickupDate: "",
    returnDate: "",
    vehicle: "",
    location: "",
    driversAge: "",
    purpose: "",
    source: "",
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

  const inputClass = "bg-white border-[#e5e7eb] focus:border-black rounded-none h-14 px-4 text-base transition-colors placeholder:text-gray-400";
  const selectClass = "w-full h-14 px-4 bg-white border border-[#e5e7eb] focus:border-black rounded-none text-base outline-none text-gray-900 transition-colors appearance-none";
  const labelClass = "text-base font-normal text-gray-500";

  if (isSuccess) {
    return (
      <section id="contact" className="py-24 bg-black flex items-center justify-center min-h-[600px]">
        <div className="bg-white p-12 rounded-none shadow-xl text-center max-w-lg mx-4 animate-fade-in border border-gray-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-3xl font-bold font-onest text-gray-900 mb-4">Request Received!</h3>
          <p className="text-gray-600 font-sans mb-8">
            Thank you! A member of our team will reach out within 24 hours to confirm your reservation.
          </p>
          <Button
            onClick={() => setIsSuccess(false)}
            className="bg-black text-white px-8 py-3 rounded-none font-bold hover:bg-gray-900 transition-all tracking-widest uppercase"
          >
            Submit Another Request
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 lg:py-28 bg-black overflow-hidden relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

          {/* Left Column: Content */}
          <div className="space-y-8 pt-10 sticky top-24">
            <div className="inline-block px-4 py-2 border border-gray-600 rounded-full">
              <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Reserve Your Vehicle</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-5xl font-normal font-onest text-white leading-[1.1]">
              Ready to Drive <br />
              Something Exotic?
            </h2>

            <p className="text-lg text-gray-400 font-sans max-w-md leading-relaxed font-normal">
              Fill out the form and one of our specialists will craft a personalized rental experience for you. Available in Boston, Miami, Atlanta &amp; Los Angeles.
            </p>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 gap-5 pt-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-gray-700 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold uppercase tracking-wider">Fully Insured Fleet</p>
                  <p className="text-gray-500 text-xs">Every vehicle is covered &amp; maintained</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-gray-700 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold uppercase tracking-wider">24/7 Support</p>
                  <p className="text-gray-500 text-xs">Our team is always a call away</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-gray-700 flex items-center justify-center flex-shrink-0">
                  <Star className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold uppercase tracking-wider">5-Star Experience</p>
                  <p className="text-gray-500 text-xs">Hundreds of verified Google reviews</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-gray-700 flex items-center justify-center flex-shrink-0">
                  <Car className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold uppercase tracking-wider">Premium Fleet</p>
                  <p className="text-gray-500 text-xs">Lamborghini, Ferrari, Porsche &amp; more</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-white rounded-[4px] p-8 sm:p-10 shadow-lg relative">

            <div className="mb-8">
              <h3 className="text-3xl font-medium font-onest text-gray-900 tracking-tight">Start Your Reservation</h3>
              <p className="text-gray-500 text-sm mt-2">Complete the form below — we'll get back to you within 24 hours.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
                <div className="space-y-2">
                  <label className={labelClass}>Full Name</label>
                  <Input
                    required
                    placeholder="Your full name"
                    className={inputClass}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Phone Number</label>
                  <Input
                    required
                    type="tel"
                    placeholder="(000) 000-0000"
                    className={inputClass}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
              </div>

              {/* Row 2: Email & Driver's Age */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
                <div className="space-y-2">
                  <label className={labelClass}>Email Address</label>
                  <Input
                    required
                    type="email"
                    placeholder="you@email.com"
                    className={inputClass}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Driver's Age</label>
                  <select
                    required
                    className={selectClass}
                    onChange={(e) => handleInputChange('driversAge', e.target.value)}
                  >
                    <option value="">Select age range...</option>
                    <option value="21-24">21 – 24</option>
                    <option value="25-29">25 – 29</option>
                    <option value="30-39">30 – 39</option>
                    <option value="40+">40+</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Pickup & Return Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
                <div className="space-y-2">
                  <label className={labelClass}>Pickup Date</label>
                  <Input
                    required
                    type="date"
                    className={inputClass}
                    onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Return Date</label>
                  <Input
                    required
                    type="date"
                    className={inputClass}
                    onChange={(e) => handleInputChange('returnDate', e.target.value)}
                  />
                </div>
              </div>

              {/* Row 4: Vehicle & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
                <div className="space-y-2">
                  <label className={labelClass}>Desired Vehicle</label>
                  <select
                    required
                    className={selectClass}
                    onChange={(e) => handleInputChange('vehicle', e.target.value)}
                  >
                    <option value="">Select a vehicle...</option>
                    <option value="Lamborghini Urus">Lamborghini Urus</option>
                    <option value="Lamborghini Huracán">Lamborghini Huracán</option>
                    <option value="Ferrari 488">Ferrari 488</option>
                    <option value="Ferrari Roma">Ferrari Roma</option>
                    <option value="Porsche 911">Porsche 911</option>
                    <option value="Porsche Cayenne">Porsche Cayenne</option>
                    <option value="Rolls-Royce Cullinan">Rolls-Royce Cullinan</option>
                    <option value="Bentley Bentayga">Bentley Bentayga</option>
                    <option value="McLaren 720S">McLaren 720S</option>
                    <option value="Other / Unsure">Other / Not Sure Yet</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>Pickup Location</label>
                  <select
                    required
                    className={selectClass}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                  >
                    <option value="">Select a city...</option>
                    <option value="Boston, MA">Boston, MA</option>
                    <option value="Miami, FL">Miami, FL</option>
                    <option value="Atlanta, GA">Atlanta, GA</option>
                    <option value="Los Angeles, CA">Los Angeles, CA</option>
                  </select>
                </div>
              </div>

              {/* Rental Purpose */}
              <div className="space-y-2">
                <label className={labelClass}>Rental Purpose</label>
                <select
                  className={selectClass}
                  onChange={(e) => handleInputChange('purpose', e.target.value)}
                >
                  <option value="">What's the occasion?</option>
                  <option value="Weekend Getaway">Weekend Getaway</option>
                  <option value="Special Event">Special Event (Wedding / Birthday)</option>
                  <option value="PhotoShoot">PhotoShoot / Content Creation</option>
                  <option value="Chauffeur">Chauffeur Service</option>
                  <option value="Business">Business / Corporate</option>
                  <option value="Vacation">Vacation / Travel</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* How did you hear */}
              <div className="space-y-2">
                <label className={labelClass}>How Did You Hear About Us?</label>
                <select
                  className={selectClass}
                  onChange={(e) => handleInputChange('source', e.target.value)}
                >
                  <option value="">Select a source...</option>
                  <option value="Google">Google Search</option>
                  <option value="Instagram">Instagram</option>
                  <option value="TikTok">TikTok</option>
                  <option value="Referral">Friend / Referral</option>
                  <option value="Repeat">Returning Client</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className={labelClass}>Additional Notes (Optional)</label>
                <Textarea
                  placeholder="Any special requests, questions, or details about your rental?"
                  className="bg-white border-[#e5e7eb] focus:border-black rounded-none min-h-[130px] p-4 text-base resize-none transition-colors placeholder:text-gray-400"
                  onChange={(e) => handleInputChange('message', e.target.value)}
                />
              </div>

              {/* Submit */}
              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-16 px-10 bg-[#161616] hover:bg-black text-white text-base font-bold uppercase tracking-widest rounded-none shadow-none transition-all duration-300 flex items-center gap-3 group"
                >
                  <span className="relative z-10 border-b border-white pb-0.5 leading-none">
                    {isSubmitting ? "Sending..." : "Reserve Now"}
                  </span>
                  {!isSubmitting && <ArrowUpRight size={20} />}
                </Button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;