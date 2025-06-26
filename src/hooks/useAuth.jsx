import { useEffect, useState } from "react";
import { validarToken, getPerfil } from "../services/usuario_service.js";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

/**
 * Hook para manejar la autenticación del usuario
 * @param {boolean} requireAuth - Si true, redirige a /login si el usuario no está autenticado
 * @param {string} redirectTo - Ruta a la que redirigir si requireAuth es true y el usuario no está autenticado
 * @param {string} requiredRole - Rol requerido para acceder (admin, usuario o null para cualquiera)
 */
export default function useAuth(
  requireAuth = false,
  redirectTo = "/login",
  requiredRole = null,
) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [usuario, setUsuario] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [authError, setAuthError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const { valid, mensaje } = await validarToken();
        setIsAuthenticated(valid);

        if (mensaje) {
          setAuthError(mensaje);
        }

        if (valid) {
          // Obtener el rol almacenado
          const storedRole = localStorage.getItem("userRole") || "usuario";
          setUserRole(storedRole);

          const userData = await getPerfil();
          if (userData) {
            setUsuario(userData);
          } else {
            // Si no hay datos de usuario pero el token es válido
            setAuthError("Error al obtener datos del usuario");
          }

          // Verificar si tiene el rol requerido
          if (requiredRole && storedRole !== requiredRole) {
            if (storedRole === "admin") {
              navigate("/admin");
            } else {
              navigate("/usuario");
            }
          }
        } else if (requireAuth) {
          if (mensaje) {
            toast.error(mensaje);
          }
          navigate(redirectTo);
        }
      } catch (error) {
        console.error("Error verificando autenticación:", error);
        setAuthError(error.message || "Error de autenticación");
        if (requireAuth) {
          toast.error(error.message || "Sesión inválida");
          navigate(redirectTo);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate, requireAuth, redirectTo, requiredRole]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    setIsAuthenticated(false);
    setUsuario(null);
    setUserRole(null);
    setAuthError(null);
    navigate("/login");
  };

  return {
    isAuthenticated,
    isLoading,
    usuario,
    userRole,
    authError,
    logout,
    isAdmin: userRole === "admin",
  };
}
