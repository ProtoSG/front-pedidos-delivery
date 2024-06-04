/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import { experiedToken } from "../../../services/login_service";

export const ProtectedRoute = ({ redirectTo = "/login" }) => {
  const tokenExpired = experiedToken();
  if (tokenExpired) {
    return <Navigate to={redirectTo} replace />;
  }
  return <Outlet />;
};
