import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

const AdminPlaceholder = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-warm/40 flex flex-col">
      <header className="border-b border-border bg-background">
        <div className="container mx-auto max-w-container flex items-center justify-between h-16 px-4">
          <Link to="/" className="inline-flex items-center gap-2 font-serif text-[22px]">
            <Rocket className="h-5 w-5 text-primary" />
            <span>
              Local<span className="font-semibold">Rocket</span>
            </span>
            <span className="ml-2 text-[10px] font-mono uppercase tracking-eyebrow bg-foreground text-background px-2 py-0.5 rounded-pill">
              Admin
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
          <h1 className="font-serif text-4xl tracking-tightest mb-3">Admin</h1>
          <p className="text-ink-soft mb-8">
            Du är inloggad som administratör. Hela CRM:et (nisch-hantering, tillgänglighetsmatris,
            kundlista, statistik-inmatning) byggs i Fas 5.
          </p>
          <div className="bg-background border border-border rounded-[16px] p-6">
            <h2 className="font-serif text-xl mb-3">Klart i databasen</h2>
            <ul className="text-sm space-y-1 text-ink-soft">
              <li>✅ 8 nischer seedade</li>
              <li>✅ 290 svenska kommuner seedade</li>
              <li>✅ Tabeller: customers, subscriptions, stats, reports, payments, slot_reservations</li>
              <li>✅ RLS-policies aktiva</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPlaceholder;
