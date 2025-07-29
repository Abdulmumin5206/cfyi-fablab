import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHelmet from "@/components/SEOHelmet";
import { useTranslation } from "react-i18next";

const AboutUs = () => {
  const { t } = useTranslation();
  
  // Define JSON-LD schema for about us page
  const aboutUsSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FabLab CFYI",
    "url": "https://fablab-cfyi.uz/about-us",
    "logo": "https://fablab-cfyi.uz/fablab/logo.png",
    "description": "About FabLab CFYI - Digital fabrication laboratory providing 3D printing, prototyping, engineering solutions and manufacturing services in Uzbekistan.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Uzbekistan",
      "addressLocality": "Tashkent"
    }
  };

  return (
    <>
      <SEOHelmet 
        title={t('header.aboutUs')}
        description="Learn more about FabLab CFYI - Uzbekistan's first official FabLab providing digital fabrication services and innovation opportunities."
        schema={aboutUsSchema}
        canonicalPath="/about-us"
      />
      
      <Header />
      
      {/* Main content area - minimal for now */}
      <main className="pt-16 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32 min-h-screen bg-white">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-[1200px] py-12">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              {t('header.aboutUs')}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Content coming soon...
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default AboutUs; 