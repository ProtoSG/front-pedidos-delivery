/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import { experiedToken } from "../../../services/login_service";

export const ProtectedRoute = ({ user, redirectTo = "/login" }) => {
  const tokenExpired = experiedToken();
  if (!user || tokenExpired) {
    return <Navigate to={redirectTo} replace />;
  }
  return <Outlet />;
};
