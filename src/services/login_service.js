import * as jose from "jose";
import { api } from "../constants/api";
const loginApi = `${api}/usuario/login`;

/**
 * Realiza el login del usuario llamando a la API y guarda el token en localStorage.
 * @param {Object} params - Parámetros de login.
 * @param {string} params.username - Email del usuario.
 * @param {string} params.password - Contraseña del usuario.
 * @returns {Promise<Object>} Objeto con token y rol, o mensaje de error.
 */
const login = async ({ username, password }) => {
  const csrf = await getCSRFToken();

  try {
    const response = await fetch(`${loginApi}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrf,
      },
      body: JSON.stringify({ email: username, password }),
    });

    const data = await response.json();
    const { mensaje, token, rol } = data;

    console.log("Respuesta login:", data);

    if (!response.ok) {
      return { mensaje: mensaje || "Error al iniciar sesión" };
    }

    // Guardar token y rol en localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("userRole", "user"); // Siempre guardar como 'user'
    return { token, rol };
  } catch (error) {
    console.error("Error en login:", error);
    return { mensaje: "Error de conexión. Inténtelo nuevamente." };
  }
};

/**
 * Elimina el token de autenticación del usuario del localStorage.
 */
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userRole");
};

const experiedToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No existe token almacenado");
    return true;
  }

  try {
    const decodedToken = jose.decodeJwt(token);
    const currentTime = Math.floor(Date.now() / 1000);

    if (!decodedToken || typeof decodedToken.exp !== "number") {
      console.error("El token no es válido o no contiene el campo 'exp'");
      return true;
    }
    return currentTime >= decodedToken.exp;
  } catch (error) {
    console.error("Error al decodificar token:", error);
    return true;
  }
};

const getCSRFToken = async () => {
  try {
    const r = await fetch(`${api}/csrf-token`, {
      credentials: "include",
    });

    const data = await r.json();
    return data.csrf_token;
  } catch (error) {
    console.error("Error obteniendo CSRF token:", error);
    return "";
  }
};

export { experiedToken, login, logout, getCSRFToken };
