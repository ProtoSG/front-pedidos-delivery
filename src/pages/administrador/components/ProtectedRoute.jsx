/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ user, redirectTo = "/login" }) => {
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }
  return <Outlet />;
};
