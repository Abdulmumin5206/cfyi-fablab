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
  const organizationSchema = {
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
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+998770884977",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://facebook.com/fablabcfyi",
      "https://instagram.com/fablabcfyi",
      "https://twitter.com/fablabcfyi"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "FabLab CFYI Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "3D Printing",
          "description": "Professional 3D printing services",
          "url": "https://fablab-cfyi.uz/3d-printing"
        },
        {
          "@type": "Offer",
          "name": "Molding & Production",
          "description": "Injection molding and production services",
          "url": "https://fablab-cfyi.uz/mould"
        },
        {
          "@type": "Offer",
          "name": "Digital Fabrication",
          "description": "Advanced digital fabrication services",
          "url": "https://fablab-cfyi.uz/digital-fabrication"
        },
        {
          "@type": "Offer",
          "name": "3D Scanning",
          "description": "High-precision 3D scanning services",
          "url": "https://fablab-cfyi.uz/3d-scanning-services"
        },
        {
          "@type": "Offer",
          "name": "Educational Courses",
          "description": "Digital fabrication training courses",
          "url": "https://fablab-cfyi.uz/courses"
        }
      ]
    },
    "offers": {
      "@type": "Offer",
      "description": "3D Printing, 3D Scanning, Digital Fabrication services",
      "availability": "https://schema.org/InStock"
    }
  };

  // Define LocalBusiness schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "FabLab CFYI",
    "image": "https://fablab-cfyi.uz/main/scrolling2.webp",
    "url": "https://fablab-cfyi.uz",
    "telephone": "+998770884977",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Uzbekistan",
      "addressLocality": "Tashkent",
      "addressRegion": "Tashkent"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.311081,
      "longitude": 69.240562
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Saturday"
        ],
        "opens": "10:00",
        "closes": "15:00"
      }
    ],
    "priceRange": "$$"
  };

  // Combine schemas for SEO
  const homeSchema = [organizationSchema, localBusinessSchema];

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
      <main className="bg-[#f5f5f7]">
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
