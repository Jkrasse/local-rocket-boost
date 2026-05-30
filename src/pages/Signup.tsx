import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import AuthLayout from "@/components/auth/AuthLayout";

const schema = z
  .object({
    company_name: z.string().trim().min(1, "Företagsnamn krävs").max(120),
    contact_name: z.string().trim().min(1, "Kontaktperson krävs").max(120),
    email: z.string().trim().email("Ogiltig e-postadress").max(255),
    phone: z.string().trim().max(30).optional().or(z.literal("")),
    password: z.string().min(8, "Minst 8 tecken").max(72),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, { message: "Lösenorden matchar inte", path: ["confirm"] });

type FormData = z.infer<typeof schema>;

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>({
    company_name: "",
    contact_name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function update<K extends keyof FormData>(k: K, v: FormData[K]) {
    setForm({ ...form, [k]: v });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((i) => [i.path[0], i.message])));
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: {
          company_name: parsed.data.company_name,
          contact_name: parsed.data.contact_name,
          phone: parsed.data.phone,
        },
      },
    });
    setLoading(false);
    if (error) {
      toast.error(
        error.message.includes("already registered")
          ? "E-postadressen är redan registrerad"
          : error.message
      );
      return;
    }
    toast.success("Konto skapat! Du är inloggad.");
    navigate("/dashboard", { replace: true });
  }

  return (
    <AuthLayout
      title="Skapa konto"
      subtitle="Kom igång med Local Rocket på under en minut."
      footer={
        <>
          Har du redan ett konto?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Logga in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="company_name">Företagsnamn</Label>
            <Input
              id="company_name"
              value={form.company_name}
              onChange={(e) => update("company_name", e.target.value)}
              disabled={loading}
            />
            {errors.company_name && <p className="text-xs text-destructive">{errors.company_name}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="contact_name">Kontaktperson</Label>
            <Input
              id="contact_name"
              value={form.contact_name}
              onChange={(e) => update("contact_name", e.target.value)}
              disabled={loading}
            />
            {errors.contact_name && <p className="text-xs text-destructive">{errors.contact_name}</p>}
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">E-post</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            disabled={loading}
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Telefon (valfritt)</Label>
          <Input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="password">Lösenord</Label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              disabled={loading}
            />
            {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="confirm">Bekräfta lösenord</Label>
            <Input
              id="confirm"
              type="password"
              autoComplete="new-password"
              value={form.confirm}
              onChange={(e) => update("confirm", e.target.value)}
              disabled={loading}
            />
            {errors.confirm && <p className="text-xs text-destructive">{errors.confirm}</p>}
          </div>
        </div>
        <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
          {loading ? "Skapar konto…" : "Skapa konto"}
        </Button>
        <p className="text-[11px] text-ink-mute text-center">
          Genom att skapa konto godkänner du våra{" "}
          <Link to="/villkor" className="underline">
            villkor
          </Link>{" "}
          och{" "}
          <Link to="/integritetspolicy" className="underline">
            integritetspolicy
          </Link>
          .
        </p>
      </form>
    </AuthLayout>
  );
};

export default Signup;
