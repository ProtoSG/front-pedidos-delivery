import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";
import { experiedToken } from "../../../services/login_service";
import { validarTokenAdmin } from "../../../services/admin_service";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export const ProtectedRoute = ({ redirectTo = "/login" }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Verificar si el token ha expirado
        const tokenExpired = experiedToken();
        if (tokenExpired) {
          setErrorMessage(
            "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
          );
          setIsAuthorized(false);
          return;
        }

        // Verificar rol de usuario
        const role = localStorage.getItem("userRole");
        if (role !== "admin") {
          setErrorMessage(
            "No tienes permisos de administrador para acceder a esta sección.",
          );
          setIsAuthorized(false);
          return;
        }

        // Validar token con el backend
        const { valid, mensaje } = await validarTokenAdmin();
        if (!valid) {
          setErrorMessage(mensaje || "Tu sesión es inválida.");
          setIsAuthorized(false);
          return;
        }

        setIsAuthorized(true);
      } catch (error) {
        console.error("Error verificando autorización:", error);
        setErrorMessage("Error al verificar tu sesión.");
        setIsAuthorized(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthorized === null) {
    // Aún cargando
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthorized && errorMessage) {
    // Mostrar mensaje de error antes de redirigir
    toast.error(errorMessage);
  }

  return isAuthorized ? (
    <>
      <Outlet />
      <div id="sonner-toaster"></div>
    </>
  ) : (
    <Navigate to={redirectTo} replace state={{ error: errorMessage }} />
  );
};

ProtectedRoute.propTypes = {
  redirectTo: PropTypes.string,
};
