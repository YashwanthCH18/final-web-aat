import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollToPricing = () => {
    const element = document.getElementById('pricing');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#dfdefd] to-white">
      <div className="container mx-auto px-4 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Generate Blog Content with
            <span className="text-primary"> AI Magic</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform your content creation process with our AI-powered blog generator. 
            Create, optimize, and publish engaging content in minutes.
          </p>

          <Button
            size="lg"
            onClick={scrollToPricing}
            className="text-lg px-8 py-6"
          >
            Get Started
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
