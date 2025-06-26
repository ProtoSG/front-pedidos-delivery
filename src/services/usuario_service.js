import { api } from "../constants/api";

const usuarioApi = `${api}/usuario`;

/**
 * Obtiene el perfil del usuario autenticado
 * @returns {Promise<Object>} - Datos del usuario
 */
const getPerfil = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${usuarioApi}/perfil`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        const errorData = await response.json();
        console.error("Error de autenticación:", errorData);
        throw new Error(errorData.mensaje || "No autorizado");
      }
      throw new Error(`Error al obtener perfil: ${response.status}`);
    }

    const data = await response.json();
    console.log("Datos de perfil obtenidos:", data);
    return data;
  } catch (error) {
    console.error("Error en getPerfil:", error);
    return null;
  }
};

/**
 * Registra un nuevo usuario
 * @param {Object} userData - Datos del usuario para registro
 * @param {string} userData.nombre - Nombre del usuario
 * @param {string} userData.email - Email del usuario
 * @param {string} userData.password - Contraseña del usuario
 * @returns {Promise<Object>} - Resultado de la operación
 */
const registrarUsuario = async (userData) => {
  try {
    console.log("Registrando usuario con datos:", {
      ...userData,
      password: userData.password ? "******" : undefined,
    });

    const response = await fetch(`${usuarioApi}/registro`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    console.log("Respuesta registro:", data);

    if (!response.ok) {
      return {
        error: true,
        mensaje: data.mensaje || "Error al registrar usuario",
      };
    }

    return data;
  } catch (error) {
    console.error("Error en registrarUsuario:", error);
    return { error: true, mensaje: "Error de conexión" };
  }
};

/**
 * Valida el token JWT
 * @returns {Promise<Object>} - Objeto con validez del token y mensaje si hay error
 */
const validarToken = async () => {
  const token = localStorage.getItem("token");
  if (!token) return { valid: false, mensaje: "No hay token almacenado" };

  try {
    const response = await fetch(`${usuarioApi}/validar-token`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log("Respuesta validación token:", data);

    if (!response.ok) {
      // Si es un error 401, mostramos el mensaje específico
      if (response.status === 401) {
        return {
          valid: false,
          mensaje: data.mensaje || "Token inválido o expirado",
        };
      }
      return {
        valid: false,
        mensaje: "Error al validar token",
      };
    }

    return { valid: true };
  } catch (error) {
    console.error("Error en validarToken:", error);
    return {
      valid: false,
      mensaje: "Error de conexión al validar sesión",
    };
  }
};

/**
 * Actualiza el perfil del usuario
 * @param {Object} userData - Datos actualizados del usuario
 * @returns {Promise<Object>} - Resultado de la operación
 */
const actualizarPerfil = async (userData) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${usuarioApi}/perfil`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: true,
        mensaje: data.mensaje || "Error al actualizar perfil",
      };
    }

    return data;
  } catch (error) {
    console.error("Error en actualizarPerfil:", error);
    return { error: true, mensaje: "Error de conexión" };
  }
};

/**
 * Utilidad para manejar errores de autenticación
 * @param {Response} response - Respuesta de fetch con error
 * @returns {Promise<string>} - Mensaje de error formateado
 */
const handleAuthError = async (response) => {
  try {
    const data = await response.json();
    return data.mensaje || "Error de autenticación";
  } catch (e) {
    return `Error ${response.status}: ${response.statusText}`;
  }
};

export {
  getPerfil,
  registrarUsuario,
  validarToken,
  actualizarPerfil,
  handleAuthError,
};
