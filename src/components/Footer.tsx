import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import logo from "@/assets/logo.png";

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const iconLinkClass =
  "p-2.5 border border-border rounded-sm text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-200 hover:scale-110 focus:scale-105";

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
                <Mail className="w-4 h-4 shrink-0" /> ranglacharkha@gmail.com
              </a>
              <a href="tel:03209417086" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-4 h-4 shrink-0" /> 0320-9417086
              </a>
              <a href="https://wa.me/923209417086" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                Message Rangla Charkha on WhatsApp. https://wa.me/923209417086
              </a>
              <p>Mon – Sat: 10 AM – 8 PM</p>
              <div className="flex gap-2 pt-2">
                <a href="https://www.facebook.com/share/1NMaMvd1Hm/" target="_blank" rel="noopener noreferrer" className={iconLinkClass} aria-label="Facebook">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/rangla_charkha?igsh=MWN3d3RkcHVuOGF4cA==" target="_blank" rel="noopener noreferrer" className={iconLinkClass} aria-label="Instagram">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://wa.me/923209417086" target="_blank" rel="noopener noreferrer" className={iconLinkClass} aria-label="WhatsApp">
                  <WhatsAppIcon />
                </a>
              </div>
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
