import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { validarToken } from "../../../services/usuario_service";
import { toast } from "sonner";

export function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [redirectUrl, setRedirectUrl] = useState("/login");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const { valid, mensaje } = await validarToken();
        const role = localStorage.getItem("userRole");

        if (mensaje) {
          setErrorMessage(mensaje);
        }

        if (valid) {
          setIsAuthenticated(true);
          if (role === "admin") {
            // Si es admin, podría redirigir al panel de administración
            setRedirectUrl("/admin");
          }
        } else {
          setIsAuthenticated(false);
          if (mensaje) {
            toast.error(mensaje);
          }
        }
      } catch (error) {
        console.error("Error verificando autenticación:", error);
        setIsAuthenticated(false);
        setErrorMessage(error.message || "Error de autenticación");
        toast.error(error.message || "Error de autenticación");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return isAuthenticated ? (
    <>
      <Outlet />
      <div id="sonner-toaster"></div>
    </>
  ) : (
    <Navigate to={redirectUrl} replace state={{ error: errorMessage }} />
  );
}

export default ProtectedRoute;
