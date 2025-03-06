import { useEffect } from "react";
import { useLocation } from "wouter";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import BlogPreview from "@/components/BlogPreview";

export default function Home() {
  const [location] = useLocation();

  useEffect(() => {
    // Handle scroll to section after navigation
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

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