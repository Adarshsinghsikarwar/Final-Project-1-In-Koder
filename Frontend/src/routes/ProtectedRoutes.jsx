import { Outlet, Navigate } from "react-router-dom";

  import { ROLES, mockUser } from "../utils/auth";
  
  const ProtectedRoutes = ({ allowedRoles }) => {
    if (!mockUser.isAuthenticated) {
      return <Navigate to="/signin" replace />;
    }
  
    // If roles are specified and user doesn't have required role, redirect to their home
    if (allowedRoles && !allowedRoles.includes(mockUser.role)) {
      const redirectPath = mockUser.role === ROLES.CANDIDATE ? "/candidate/home" : "/dashboard";
      return <Navigate to={redirectPath} replace />;
    }

  return <Outlet />;
};

export default ProtectedRoutes;
