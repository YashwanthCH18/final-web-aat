import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

export default function Footer() {
  const [location] = useLocation();
  const isHomePage = location === "/";

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Adjust for the fixed navbar height
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  interface NavItem {
    id?: string;
    href?: string;
    label: string;
    path?: string;
  }

  const navItems: NavItem[] = [
    { id: "home", label: "Home", path: "/#home" },
    { id: "about", label: "About Us", path: "/#about" },
    { id: "pricing", label: "Pricing", path: "/#pricing" },
    { href: "/blog", label: "Blog" },
    { id: "contact", label: "Contact Us", path: "/#contact" }
  ];

  return (
    <footer className="bg-gray-100 border-t mt-auto pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          {/* Company Info */}
          <div>
            <Link href="/">
              <span className="text-xl font-bold text-primary cursor-pointer">
                BlogGen AI
              </span>
            </Link>
            <p className="text-gray-600 mt-3 mb-4 text-sm max-w-md">
              AI-powered blog generation platform that helps businesses create high-quality content efficiently.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" className="text-gray-500 hover:text-primary transition-colors">
                <Facebook size={18} />
              </a>
              <a href="https://twitter.com" className="text-gray-500 hover:text-primary transition-colors">
                <Twitter size={18} />
              </a>
              <a href="https://instagram.com" className="text-gray-500 hover:text-primary transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://linkedin.com" className="text-gray-500 hover:text-primary transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
            
            {/* Contact Information */}
            <div className="mt-5 space-y-2">
              <div className="flex items-center">
                <Mail size={16} className="text-primary mr-2" />
                <a
                  href="mailto:contact@bloggenai.com"
                  className="text-sm text-gray-600 hover:text-primary transition-colors"
                >
                  contact@bloggenai.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone size={16} className="text-primary mr-2" />
                <span className="text-sm text-gray-600">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <MapPin size={16} className="text-primary mr-2" />
                <span className="text-sm text-gray-600">123 AI Street, San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Main Navigation */}
          <div className="flex flex-col md:items-end">
            <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4 md:text-right">Navigation</h3>
            <ul className="space-y-2 md:text-right">
              {navItems.map((item) => (
                <li key={item.id || item.href}>
                  {item.href ? (
                    <Link href={item.href}>
                      <span className="text-gray-600 hover:text-primary transition-colors text-sm cursor-pointer">
                        {item.label}
                      </span>
                    </Link>
                  ) : isHomePage ? (
                    <span 
                      onClick={() => scrollToSection(item.id!)}
                      className="text-gray-600 hover:text-primary transition-colors text-sm cursor-pointer"
                    >
                      {item.label}
                    </span>
                  ) : (
                    <Link href={item.path!}>
                      <span className="text-gray-600 hover:text-primary transition-colors text-sm cursor-pointer">
                        {item.label}
                      </span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-200 mt-4 pt-5 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} BlogGen AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
