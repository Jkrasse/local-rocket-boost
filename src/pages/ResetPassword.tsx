import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import AuthLayout from "@/components/auth/AuthLayout";

const emailSchema = z.object({ email: z.string().trim().email("Ogiltig e-postadress").max(255) });
const passwordSchema = z
  .object({ password: z.string().min(8, "Minst 8 tecken").max(72), confirm: z.string() })
  .refine((d) => d.password === d.confirm, { message: "Lösenorden matchar inte", path: ["confirm"] });

const ResetPassword = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"request" | "update">("request");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Detect recovery flow via URL hash
    if (window.location.hash.includes("type=recovery") || window.location.hash.includes("access_token")) {
      setMode("update");
    }
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setMode("update");
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function requestReset(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    const parsed = emailSchema.safeParse({ email });
    if (!parsed.success) {
      setErrors({ email: parsed.error.issues[0].message });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Återställningslänk skickad. Kontrollera din inkorg.");
  }

  async function updatePassword(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    const parsed = passwordSchema.safeParse({ password, confirm });
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((i) => [i.path[0], i.message])));
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Lösenord uppdaterat");
    navigate("/dashboard", { replace: true });
  }

  if (mode === "update") {
    return (
      <AuthLayout title="Välj nytt lösenord" subtitle="Skriv in ditt nya lösenord nedan.">
        <form onSubmit={updatePassword} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="password">Nytt lösenord</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="confirm">Bekräfta lösenord</Label>
            <Input
              id="confirm"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              disabled={loading}
            />
            {errors.confirm && <p className="text-xs text-destructive">{errors.confirm}</p>}
          </div>
          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
            {loading ? "Sparar…" : "Spara nytt lösenord"}
          </Button>
        </form>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Glömt lösenord?"
      subtitle="Skriv in din e-post så skickar vi en återställningslänk."
      footer={
        <Link to="/login" className="text-primary hover:underline">
          Tillbaka till inloggning
        </Link>
      }
    >
      <form onSubmit={requestReset} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">E-post</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </div>
        <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
          {loading ? "Skickar…" : "Skicka återställningslänk"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;
