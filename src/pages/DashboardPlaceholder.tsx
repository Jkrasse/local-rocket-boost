import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

const DashboardPlaceholder = () => {
  const { user, isAdmin, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-warm/40 flex flex-col">
      <header className="border-b border-border bg-background">
        <div className="container mx-auto max-w-container flex items-center justify-between h-16 px-4">
          <Link to="/" className="inline-flex items-center gap-2 font-serif text-[22px]">
            <Rocket className="h-5 w-5 text-primary" />
            <span>
              Local<span className="font-semibold">Rocket</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-ink-soft hidden sm:inline">{user?.email}</span>
            <Button variant="outline" size="sm" onClick={signOut}>
              Logga ut
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto max-w-container px-4 py-16">
        <div className="max-w-2xl">
          <h1 className="font-serif text-4xl tracking-tightest mb-3">Min portal</h1>
          <p className="text-ink-soft mb-8">
            Här kommer du snart kunna se din statistik, ditt abonnemang och dina månadsrapporter.
            Vi bygger ut portalen i nästa fas tillsammans med Stripe-integration och onboarding.
          </p>
          <div className="bg-background border border-border rounded-[16px] p-6">
            <h2 className="font-serif text-xl mb-2">Status</h2>
            <ul className="text-sm space-y-1 text-ink-soft">
              <li>✅ Konto skapat</li>
              <li>✅ Inloggad</li>
              <li>{isAdmin ? "✅ Admin-roll" : "⏳ Roll: kund"}</li>
              <li>⏳ Onboarding (kommer i Fas 3)</li>
            </ul>
            {isAdmin && (
              <div className="mt-5 pt-5 border-t border-border">
                <Link to="/admin" className="text-primary text-sm hover:underline">
                  Gå till admin →
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPlaceholder;
