import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

type AppRole = "admin" | "moderator" | "user";

interface Props {
  children: React.ReactNode;
  requireRole?: AppRole;
}

const ProtectedRoute = ({ children, requireRole }: Props) => {
  const { user, roles, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-ink-soft">
        Laddar…
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (requireRole && !roles.includes(requireRole) && !roles.includes("admin")) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="font-serif text-3xl">Åtkomst nekad</h1>
        <p className="text-ink-soft">Du har inte behörighet att se den här sidan.</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
