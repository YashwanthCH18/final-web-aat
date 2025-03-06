import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import BlogPreview from "@/components/BlogPreview";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <PricingSection />
      <BlogPreview />
      <ContactSection />
    </main>
  );
}
