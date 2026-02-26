import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, Heart, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Lawn Collection", path: "/lawn-collection" },
  { label: "Casual Wear", path: "/casual-wear" },
  { label: "About Us", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <header className="w-full relative z-50">
      {/* Top Bar */}
      <div className="w-full bg-secondary border-b border-border">
        <div className="container mx-auto flex items-center justify-between py-2 px-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>🚚</span>
            <span className="font-body">Free Nationwide Delivery</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded font-body text-xs font-medium tracking-wide">Eid Sale 30% Off</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <a href="https://wa.me/923209417086" target="_blank" rel="noopener noreferrer" className="p-1.5 hover:text-primary transition-colors text-xs font-body">
              03209417086
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="w-full bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Rangla Charkha Logo" className="h-12 w-auto" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-body text-sm tracking-wide transition-colors hover:text-primary ${
                  location.pathname === link.path ? "text-primary" : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-3">
            <Link to="/wishlist" className="relative p-1.5 hover:text-primary transition-colors text-foreground">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center font-body">{wishlistCount}</span>
              )}
            </Link>
            <Link to="/cart" className="relative p-1.5 hover:text-primary transition-colors text-foreground">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center font-body">{cartCount}</span>
              )}
            </Link>
            {/* [DEACTIVATED] Login/Signup – uncomment to show auth in header */}
            {/* {user ? (
              <div className="flex items-center gap-2">
                <button onClick={signOut} className="p-1.5 hover:text-primary transition-colors text-foreground" title="Sign Out">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link to="/auth" className="p-1.5 hover:text-primary transition-colors text-foreground">
                <User className="w-5 h-5" />
              </Link>
            )} */}

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-foreground"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-background border-t border-border">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`block py-3 px-6 font-body text-sm border-b border-border transition-colors hover:bg-secondary ${
                  location.pathname === link.path ? "text-primary" : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
