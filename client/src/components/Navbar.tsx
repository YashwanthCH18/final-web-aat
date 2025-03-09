import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const isHomePage = location === "/";

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const scrollToSection = (sectionId: string) => {
    // First close the mobile menu
    setIsMobileMenuOpen(false);
    
    // Use setTimeout to allow the menu closing animation to complete
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        // Adjust for the fixed navbar height
        const yOffset = -70;
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 300); // Match this with your animation duration
  };

  const navItems = [
    { id: "home", label: "Home", path: "/#home" },
    { id: "about", label: "About Us", path: "/#about" },
    { id: "pricing", label: "Pricing", path: "/#pricing" },
    { href: "/blog", label: "Blog" },
    { id: "contact", label: "Contact Us", path: "/#contact" }
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
            <span className="text-2xl font-bold text-primary cursor-pointer">
              BlogGen AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <span
                key={item.id || item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary cursor-pointer",
                  location === (item.href || item.path)
                    ? "text-primary"
                    : "text-gray-600"
                )}
              >
                {item.href ? (
                  <Link href={item.href}>
                    <span>{item.label}</span>
                  </Link>
                ) : isHomePage ? (
                  <span onClick={() => scrollToSection(item.id)}>
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.path}>
                    <span>{item.label}</span>
                  </Link>
                )}
              </span>
            ))}
          </div>

          {/* Desktop Get Started Button */}
          {isHomePage ? (
            <span
              onClick={() => scrollToSection("pricing")}
              className="hidden md:inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors cursor-pointer"
            >
              Get Started
            </span>
          ) : (
            <Link href="/#pricing">
              <span className="hidden md:inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors cursor-pointer">
                Get Started
              </span>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 focus:outline-none"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                // Close icon
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Hamburger icon
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-white border-t"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-2 space-y-2">
              {navItems.map((item) => (
                <div key={item.id || item.href} className="border-b py-2">
                  {item.href ? (
                    <Link href={item.href}>
                      <span
                        className={cn(
                          "block text-base font-medium transition-colors hover:text-primary cursor-pointer",
                          location === (item.href || item.path)
                            ? "text-primary"
                            : "text-gray-600"
                        )}
                      >
                        {item.label}
                      </span>
                    </Link>
                  ) : isHomePage ? (
                    <span
                      onClick={() => scrollToSection(item.id)}
                      className="block text-base font-medium transition-colors hover:text-primary cursor-pointer"
                    >
                      {item.label}
                    </span>
                  ) : (
                    <Link href={item.path}>
                      <span className="block text-base font-medium transition-colors hover:text-primary cursor-pointer">
                        {item.label}
                      </span>
                    </Link>
                  )}
                </div>
              ))}
              {isHomePage ? (
                <span
                  onClick={() => scrollToSection("pricing")}
                  className="block text-center bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors cursor-pointer"
                >
                  Get Started
                </span>
              ) : (
                <Link href="/#pricing">
                  <span className="block text-center bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors cursor-pointer">
                    Get Started
                  </span>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}