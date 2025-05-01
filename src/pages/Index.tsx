import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ScrollAnimationSection from "@/components/ScrollAnimationSection";
import ScrollAnimationSection2 from "@/components/ScrollAnimationSection2";
import ServiceCategories from "@/components/ServiceCategories";
import SimpleVideoSection from "@/components/SimpleVideoSection";
import RecentProjects from "@/components/RecentProjects";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <HeroSection />
        <ServiceCategories />
        <SimpleVideoSection />
        <AboutSection />
        <RecentProjects />
        <ScrollAnimationSection />
        <ScrollAnimationSection2 />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
