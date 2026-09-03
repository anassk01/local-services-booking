import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
function ProtectedRoute() {
  const { token, checking } = useContext(AuthContext);
  if (checking) return <p>Checking...</p>;
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}
export default ProtectedRoute;
