import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Laptop, Coins, Cloud, Share2 } from "lucide-react";
import type { BlogSector } from "@shared/schema";

const sectors: { id: BlogSector; icon: any; color: string; title: string }[] = [
  {
    id: "Edtech",
    icon: Laptop,
    color: "#4f46e5",
    title: "Educational Technology"
  },
  {
    id: "Fintech",
    icon: Coins,
    color: "#059669",
    title: "Financial Technology"
  },
  {
    id: "SAAS",
    icon: Cloud,
    color: "#0ea5e9",
    title: "Software as a Service"
  },
  {
    id: "Social Media",
    icon: Share2,
    color: "#db2777",
    title: "Social Media"
  }
];

export default function BlogSectors() {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#dfdefd] to-white">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Blogs by Sector
          </h1>
          <p className="text-xl text-gray-600">
            Discover insights across different technology domains
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sectors.map((sector, index) => (
            <motion.div
              key={sector.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/blog/${sector.id.toLowerCase()}`}>
                <Card
                  className="cursor-pointer h-full hover:shadow-xl transition-all"
                  style={{ borderColor: sector.color }}
                >
                  <CardContent className="p-6 text-center">
                    <sector.icon
                      className="w-16 h-16 mx-auto mb-4"
                      style={{ color: sector.color }}
                    />
                    <h2 className="text-2xl font-semibold mb-2">{sector.title}</h2>
                    <p className="text-gray-600">
                      Explore the latest trends and insights in {sector.title}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
