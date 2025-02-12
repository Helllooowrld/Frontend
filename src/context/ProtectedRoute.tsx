import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./auth";

const ProtectedRoute = () => {
  const { user } = useAuth();

  if (!user.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // if (!allowedRoles.includes(user.role!)) {
  //   return <Navigate to="/unauthorized" />;
  // }

  return <Outlet />;
};

export default ProtectedRoute;
