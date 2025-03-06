import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store/store";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
