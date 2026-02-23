import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token_hash = searchParams.get("token_hash");
    const type = searchParams.get("type") || "email";

    if (!token_hash) {
      setStatus("error");
      setMessage("Invalid or missing verification link.");
      return;
    }

    (async () => {
      const { error } = await supabase.auth.verifyOtp({ token_hash, type: type as "email" | "signup" });
      if (error) {
        setStatus("error");
        setMessage(error.message || "Verification failed.");
        toast.error(error.message);
        return;
      }
      setStatus("success");
      toast.success("Email verified! You can sign in now.");
      setTimeout(() => navigate("/", { replace: true }), 1500);
    })();
  }, [searchParams, navigate]);

  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center py-16 px-4">
      {status === "loading" && (
        <p className="font-body text-muted-foreground">Verifying your email...</p>
      )}
      {status === "success" && (
        <p className="font-body text-foreground">Email verified! Redirecting you...</p>
      )}
      {status === "error" && (
        <div className="text-center space-y-4">
          <p className="font-body text-destructive">{message}</p>
          <button
            onClick={() => navigate("/auth")}
            className="font-body text-sm text-primary hover:underline"
          >
            Go to Sign In
          </button>
        </div>
      )}
    </main>
  );
};

export default VerifyEmail;
