import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServiceCategories from "@/components/ServiceCategories";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollImageSlider from "@/components/ScrollImageSlider";
import ImageFabLabTour from "@/components/ImageFabLabTour";
import AboutUsSection from "@/components/AboutUsSection";
import MembershipSection from "@/components/MembershipSection";
import TrainingSection from "@/components/TrainingSection";
import SEOHelmet from "@/components/SEOHelmet";
import HorizontalScrollSection from "@/components/HorizontalScrollSection";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();
  
  // Define JSON-LD schema for homepage
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FabLab CFYI",
    "url": "https://fablab-cfyi.uz",
    "logo": "https://fablab-cfyi.uz/fablab/logo.png",
    "description": "Digital fabrication laboratory providing 3D printing, prototyping, engineering solutions and manufacturing services in Uzbekistan.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Uzbekistan",
      "addressLocality": "Tashkent"
    },
    "sameAs": [
      "https://facebook.com/fablabcfyi",
      "https://instagram.com/fablabcfyi",
      "https://twitter.com/fablabcfyi"
    ],
    "offers": {
      "@type": "Offer",
      "description": "3D Printing, 3D Scanning, Digital Fabrication services",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHelmet
        title="FabLab CFYI - Innovation Hub"
        description="Welcome to FabLab CFYI - Your innovation hub for digital fabrication, 3D printing, prototyping and engineering solutions in Uzbekistan."
        keywords="FabLab, CFYI, Uzbekistan, digital fabrication, 3D printing, innovation hub, engineering, prototyping, manufacturing"
        image="/main/scrolling2.webp"
        schema={homeSchema}
        canonicalPath="/"
      />
      <Header />
      <main>
        <HeroSection />
        <ServiceCategories />
        <HorizontalScrollSection />
        <AboutUsSection />
        <ScrollImageSlider />
        <ImageFabLabTour />
        <MembershipSection />
        <TrainingSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
