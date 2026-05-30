import { Link } from "react-router-dom";
import { Rocket } from "lucide-react";

interface Props {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const AuthLayout = ({ title, subtitle, children, footer }: Props) => {
  return (
    <div className="min-h-screen bg-warm/40 flex flex-col">
      <header className="px-4 py-5">
        <Link to="/" className="inline-flex items-center gap-2 font-serif text-[22px]">
          <Rocket className="h-5 w-5 text-primary" />
          <span>
            Local<span className="font-semibold">Rocket</span>
          </span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 pb-10">
        <div className="w-full max-w-md">
          <div className="bg-background rounded-[20px] border border-border shadow-sm p-8">
            <div className="mb-6">
              <h1 className="font-serif text-3xl tracking-tightest mb-1.5">{title}</h1>
              {subtitle && <p className="text-ink-soft text-sm">{subtitle}</p>}
            </div>
            {children}
          </div>
          {footer && (
            <div className="text-center text-sm text-ink-soft mt-5">{footer}</div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
