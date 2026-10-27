import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MobileCTA from "@/components/MobileCTA";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Policies from "@/components/Policies";
import Photoshoots from "@/components/Photoshoots";
import EmergencyCall from "@/components/EmergencyCall";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import PreFooterCTA from "@/components/PreFooterCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#07070a] text-white pb-16 lg:pb-0 overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <About />
        <Gallery />

        <Policies />
        <Photoshoots />
        <EmergencyCall />
        <Reviews />
        <Contact />
        <FAQ />
        <PreFooterCTA />
      </main>

      <Footer />
      <MobileCTA />
    </div>
  );
};

export default Index;
