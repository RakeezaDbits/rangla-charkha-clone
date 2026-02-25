import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MobileBottomNav from "./components/MobileBottomNav";
import WhatsAppButton from "./components/WhatsAppButton";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LawnCollection from "./pages/LawnCollection";
import CasualWear from "./pages/CasualWear";
import Auth from "./pages/Auth";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import Wishlist from "./pages/Wishlist";
import Admin from "./pages/Admin";
import TrackOrder from "./pages/TrackOrder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <div className="pb-20 md:pb-0">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/lawn-collection" element={<LawnCollection />} />
            <Route path="/casual-wear" element={<CasualWear />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout-success" element={<CheckoutSuccess />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/manage" element={<Admin />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </div>
          <Footer />
          <MobileBottomNav />
          <WhatsAppButton />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
