import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../store/store";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: "user" | "admin";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRole,
}) => {
  const { token, role } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role !== allowedRole) {
    const redirectTo = role === "admin" ? "/admin" : "/user";
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default ProtectedRoute;
