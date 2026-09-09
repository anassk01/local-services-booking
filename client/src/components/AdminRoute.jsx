import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function AdminRoute() {
  const { user, checking } = useContext(AuthContext);

  return checking ? (
    <div>waiting </div>
  ) : user?.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
}

export default AdminRoute;
