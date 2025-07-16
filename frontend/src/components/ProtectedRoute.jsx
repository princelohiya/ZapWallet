import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const authHeader = localStorage.getItem("token");
  const isAuthenticated = authHeader && authHeader.startsWith("Bearer ");

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
