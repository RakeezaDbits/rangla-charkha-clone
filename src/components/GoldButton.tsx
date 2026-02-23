import { Link } from "react-router-dom";

interface GoldButtonProps {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  variant?: "filled" | "outline";
  className?: string;
  type?: "button" | "submit";
}

const GoldButton = ({ children, to, onClick, variant = "filled", className = "", type = "button" }: GoldButtonProps) => {
  const base = "inline-block px-8 py-3 font-body text-sm tracking-widest uppercase transition-all duration-300 cursor-pointer";
  const filled = "gold-gradient-bg text-primary-foreground hover:opacity-90 shadow-lg";
  const outline = "border border-primary/40 text-primary hover:border-primary hover:bg-primary/5";
  const styles = `${base} ${variant === "filled" ? filled : outline} ${className}`;

  if (to) {
    return <Link to={to} className={styles}>{children}</Link>;
  }
  return <button type={type} onClick={onClick} className={styles}>{children}</button>;
};

export default GoldButton;
