import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border pb-24 md:pb-0">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <img src={logo} alt="Rangla Charkha" className="h-10 w-auto" />
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Premium lawn and casual wear for modern women in Pakistan. Affordable luxury fashion.
            </p>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/share/1NMaMvd1Hm/" target="_blank" rel="noopener noreferrer" className="p-2 border border-border rounded-sm hover:border-primary/40 text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/rangla_charkha?igsh=MWN3d3RkcHVuOGF4cA==" target="_blank" rel="noopener noreferrer" className="p-2 border border-border rounded-sm hover:border-primary/40 text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg text-primary mb-4">Quick Links</h4>
            <div className="space-y-2">
              {[
                { label: "Home", path: "/" },
                { label: "Lawn Collection", path: "/lawn-collection" },
                { label: "Casual Wear", path: "/casual-wear" },
                { label: "Track Order", path: "/track-order" },
                { label: "About Us", path: "/about" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <Link key={link.path} to={link.path} className="block font-body text-sm text-muted-foreground hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-display text-lg text-primary mb-4">Policies</h4>
            <div className="space-y-2 font-body text-sm text-muted-foreground">
              <p>Shipping: 3–5 working days</p>
              <p>7-day easy exchange policy</p>
              <p>Nationwide delivery across Pakistan</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg text-primary mb-4">Contact</h4>
            <div className="space-y-3 font-body text-sm text-muted-foreground">
              <a href="mailto:ranglacharkha@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4" /> ranglacharkha@gmail.com
              </a>
              <a href="tel:03209417086" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-4 h-4" /> 0320-9417086
              </a>
              <a href="https://wa.me/923209417086" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                WhatsApp: 0320-9417086
              </a>
              <p>Mon – Sat: 10 AM – 8 PM</p>
            </div>
          </div>
        </div>

        <div className="section-divider mt-8 mb-6" />

        <p className="text-center font-body text-xs text-muted-foreground">
          © 2026 Rangla Charkha. All rights reserved. | Premium Lawn & Casual Wear Pakistan
        </p>
      </div>
    </footer>
  );
};

export default Footer;
