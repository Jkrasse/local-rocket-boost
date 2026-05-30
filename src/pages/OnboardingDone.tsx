import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OnboardingDone() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");

  return (
    <div className="min-h-screen bg-warm/40 flex flex-col">
      <header className="px-4 py-5">
        <Link to="/" className="inline-flex items-center gap-2 font-serif text-[22px]">
          <Rocket className="h-5 w-5 text-primary" />
          Local<span className="font-semibold">Rocket</span>
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 pb-10">
        <div className="w-full max-w-md bg-background border border-border rounded-[20px] shadow-sm p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-primary/10 text-primary inline-flex items-center justify-center mb-4">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h1 className="font-serif text-3xl mb-2">Välkommen ombord!</h1>
          <p className="text-ink-soft text-sm mb-6">
            Tack för att du valde Local Rocket. Vi förbereder din partnerplats och hör av oss inom kort med nästa steg.
          </p>
          {sessionId && (
            <p className="text-[11px] text-ink-mute mb-6 break-all">
              Referens: {sessionId}
            </p>
          )}
          <Button asChild variant="hero" size="lg" className="w-full">
            <Link to="/dashboard">Till min dashboard</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
