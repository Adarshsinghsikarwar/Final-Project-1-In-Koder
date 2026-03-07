import { Outlet, Navigate } from "react-router-dom";

// When auth is wired up, replace `isAuthenticated` with real auth state
const isAuthenticated = false;

const PublicRoutes = () => {
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRoutes;
