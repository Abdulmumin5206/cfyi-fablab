import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductSlider from "@/components/ProductSlider";
import AboutSection from "@/components/AboutSection";
import QuoteSection from "@/components/QuoteSection";
import ScrollAnimationSection from "@/components/ScrollAnimationSection";
import ScrollAnimationSection2 from "@/components/ScrollAnimationSection2";
import ServiceCategories from "@/components/ServiceCategories";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <HeroSection />
        <ServiceCategories />
        <AboutSection />
        <ProductSlider />
        <ScrollAnimationSection />
        <ScrollAnimationSection2 />
        <QuoteSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
