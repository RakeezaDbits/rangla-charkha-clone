import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { api, setAuthToken, clearAuthToken } from "@/lib/api";

export interface AuthUser {
  id: string;
  email: string;
  full_name?: string | null;
  role: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  isAdmin: boolean;
  signOut: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, full_name?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  signOut: () => {},
  login: async () => {},
  register: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const res = await api.get("/api/me");
      setUser(res?.user ?? null);
    } catch {
      setUser(null);
    }
    setLoading(false);
  };

  // [DEACTIVATED] Login/signup – using local storage for guest cart/wishlist. Uncomment to re-enable auth.
  // useEffect(() => {
  //   const token = localStorage.getItem("auth_token");
  //   if (token) loadUser();
  //   else setLoading(false);
  // }, []);

  useEffect(() => {
    setLoading(false);
  }, []);

  const login = async (_email: string, _password: string) => {
    // [DEACTIVATED] const res = await api.post("/api/auth/login", { email, password });
    // setAuthToken(res.token); setUser(res.user);
  };

  const register = async (_email: string, _password: string, _full_name?: string) => {
    // [DEACTIVATED] const res = await api.post("/api/auth/register", { email, password, full_name });
    // setAuthToken(res.token); setUser(res.user);
  };

  const signOut = () => {
    // [DEACTIVATED] clearAuthToken(); setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin: user?.role === "admin",
        signOut,
        login,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
