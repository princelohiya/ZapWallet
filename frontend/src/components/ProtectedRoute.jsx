import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  try {
    const authHeader = localStorage.getItem("token");
    const isAuthenticated = authHeader && authHeader.startsWith("Bearer");
    if (!isAuthenticated) {
      return <Navigate to="/signin" replace />;
    }
  } catch (e) {
    console.error(err);
  }

  return children;
}
