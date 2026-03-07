import { Outlet, Navigate } from "react-router-dom";

// When auth is wired up, replace `isAuthenticated` with real auth state
const isAuthenticated = true;

const ProtectedRoutes = () => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoutes;
