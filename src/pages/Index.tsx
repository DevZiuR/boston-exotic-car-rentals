import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Process from "@/components/Process";
import Locations from "@/components/Locations";
import EmergencyCall from "@/components/EmergencyCall";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";
import MobileCTA from "@/components/MobileCTA";
import IntroSection from "@/components/IntroSection";
import PreFooterCTA from "@/components/PreFooterCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-16 lg:pb-0 bg-black">
      <Header />
      <main>
        <RevealOnScroll animation="fade-in" className="mb-0">
          <Hero />
        </RevealOnScroll>

        <IntroSection />

        <RevealOnScroll animation="slide-up" className="mb-16 lg:mb-0">
          <Services />
        </RevealOnScroll>
        <RevealOnScroll animation="slide-up" className="mb-16 lg:mb-0">
          <About />
        </RevealOnScroll>
        <RevealOnScroll animation="slide-up" className="mb-16 lg:mb-0">
          <Gallery />
        </RevealOnScroll>
        {/* <RevealOnScroll animation="slide-up" className="mb-16 lg:mb-0">
          <Process />
        </RevealOnScroll> */}
        <RevealOnScroll animation="slide-up" className="mb-16 lg:mb-0">
          <Locations />
        </RevealOnScroll>
        <RevealOnScroll animation="slide-up" className="mb-16 lg:mb-0">
          <EmergencyCall />
        </RevealOnScroll>
        <RevealOnScroll animation="slide-up" className="mb-16 lg:mb-0">
          <Reviews />
        </RevealOnScroll>
        <RevealOnScroll animation="slide-up" className="mb-16 lg:mb-0">
          <Contact />
        </RevealOnScroll>
        <RevealOnScroll animation="fade-in" className="mb-16 lg:mb-0">
          <FAQ />
        </RevealOnScroll>
        <PreFooterCTA />
      </main>
      <Footer />
      <MobileCTA />
    </div>
  );
};

export default Index;
