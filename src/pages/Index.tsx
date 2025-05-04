import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServiceCategories from "@/components/ServiceCategories";
import SimpleVideoSection from "@/components/SimpleVideoSection";
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
        <SimpleVideoSection />
        <AboutSection />
        <ScrollImageSlider />
        <RecentProjects />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
