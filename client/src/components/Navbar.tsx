import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [location] = useLocation();

  const navItems = [
    { href: "/#about", label: "About Us" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
    { href: "/#contact", label: "Contact Us" }
  ];

  return (
    <motion.nav 
      className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <a className="text-2xl font-bold text-primary">BlogGen AI</a>
          </Link>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
              >
                <a className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location === item.href ? "text-primary" : "text-gray-600"
                )}>
                  {item.label}
                </a>
              </Link>
            ))}
          </div>

          <Link href="/#pricing">
            <a className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
              Get Started
            </a>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
