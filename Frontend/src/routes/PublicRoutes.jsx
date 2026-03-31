import { ROLES, mockUser } from "../utils/auth";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  const redirectPath = mockUser.role === ROLES.CANDIDATE ? "/candidate/home" : "/dashboard";
  return mockUser.isAuthenticated ? <Navigate to={redirectPath} replace /> : <Outlet />;
};

export default PublicRoutes;
