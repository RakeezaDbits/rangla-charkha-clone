import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoldButton from "@/components/GoldButton";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { toast } from "sonner";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, login, register } = useAuth();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
        toast.success("Login successful!");
        navigate("/");
      } else {
        await register(email, password, fullName);
        toast.success("Account created!");
        navigate("/");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
    setLoading(false);
  };

  const inputClass =
    "w-full bg-card border border-border p-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 rounded-sm";

  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center py-16">
      <div className="w-full max-w-md mx-auto px-4">
        <h1 className="font-display text-3xl text-foreground text-center mb-8">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={inputClass}
            />
          )}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
            required
            minLength={6}
          />
          <GoldButton type="submit" className="w-full text-center" disabled={loading}>
            {loading ? "Please wait..." : isLogin ? "Sign In" : "Sign Up"}
          </GoldButton>
        </form>
        <p className="text-center font-body text-sm text-muted-foreground mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary hover:underline"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </main>
  );
};

export default Auth;
