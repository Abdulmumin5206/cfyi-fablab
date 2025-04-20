import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductSlider from "@/components/ProductSlider";
import ProductCategories from "@/components/ProductCategories";
import AboutSection from "@/components/AboutSection";
import QuoteSection from "@/components/QuoteSection";
import ScrollAnimationSection from "@/components/ScrollAnimationSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ProductSlider />
        <ScrollAnimationSection />
        <ProductCategories />
        <QuoteSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
