import { ReactElement, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "@/contexts/auth-context";

export default function ProtectedRoute({ children }: {children: ReactElement}) {
  const authContext = useContext(AuthContext);

  if (authContext?.loading) return <div className="fixed inset-0 flex items-center justify-center bg-base-100 z-50">
    <span className="loading loading-spinner loading-lg text-primary"></span>
  </div>
  if (!authContext?.user) return <Navigate to="/log-in" replace />;
  return children;
}