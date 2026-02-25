import { Link, useLocation } from "react-router-dom";
import { Home, Shirt, ShoppingBag, ShoppingCart, Package } from "lucide-react";
import { useCart } from "@/hooks/useCart";

const items = [
  { label: "Home", path: "/", icon: Home },
  { label: "Lawn", path: "/lawn-collection", icon: Shirt },
  { label: "Casual", path: "/casual-wear", icon: ShoppingBag },
  { label: "Cart", path: "/cart", icon: ShoppingCart },
  { label: "Track", path: "/track-order", icon: Package },
];

const MobileBottomNav = () => {
  const location = useLocation();
  const { cartCount } = useCart();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border">
      <div className="flex items-center justify-around h-14 px-2">
        {items.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          const isCart = path === "/cart";
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center justify-center gap-0.5 min-w-[56px] py-2 rounded-md transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="relative">
                <Icon className="w-5 h-5" />
                {isCart && cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center font-body">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </span>
              <span className="font-body text-[10px]">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
