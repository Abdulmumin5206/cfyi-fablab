import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServiceCategories from "@/components/ServiceCategories";
import RecentProjects from "@/components/RecentProjects";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollImageSlider from "@/components/ScrollImageSlider";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <HeroSection />
        <ServiceCategories />
        <ScrollImageSlider />
        <RecentProjects />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
