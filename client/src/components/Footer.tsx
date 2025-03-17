import { Link, useLocation } from "wouter";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
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
                <span className="text-sm text-gray-600">+60 14-282 2749</span>
              </div>
              <div className="flex items-center">
                <MapPin size={16} className="text-primary mr-2" />
                <span className="text-sm text-gray-600">Hasim, Malaysia</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-200 mt-4 pt-5 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} BlogGen AI. All rights reserved.</p>
          <p>Website Created By Yashwanth C H, Sakshi Manoj Pawaskar, Yuska Maharjan, Sandrin</p>
        </div>
      </div>
    </footer>
  );
}