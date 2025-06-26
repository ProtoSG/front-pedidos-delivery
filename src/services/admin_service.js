import { api } from "../constants/api";
const adminApi = `${api}/admin`;

const getAdmin = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${adminApi}/profile`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(
      "Hubo un problema al enviar la  solicitud " + response.status,
    );
  }
  const data = await response.json();
  return data;
};

const updateAdmin = async (checkPassword, password) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${adminApi}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ checkPassword, password }),
  });
  const { message, success } = await response.json();
  if (!response.ok) {
    return { mensaje: message };
  }
  if (success) {
    return { success };
  } else {
    return new Error("No se encontro un token en la respuesta del servidor");
  }
};

const loginAdmin = async ({ username, password }) => {
  try {
    const response = await fetch(`${adminApi}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    const { mensaje, token } = data;
    if (!response.ok) {
      return { mensaje: mensaje || "Error al iniciar sesión como admin" };
    }
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", "admin");
      return { token, admin: data.admin, mensaje: mensaje || "Inicio de sesión exitoso" };
    } else {
      return {
        mensaje: "No se encontró un token en la respuesta del servidor",
      };
    }
  } catch (error) {
    console.error("Error en loginAdmin:", error);
    return { mensaje: "Error de conexión. Inténtelo nuevamente." };
  }
};

const validarTokenAdmin = async () => {
  const token = localStorage.getItem("token");
  if (!token) return { valid: false, mensaje: "No hay token de admin almacenado" };
  try {
    const response = await fetch(`${adminApi}/validar-token`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      if (response.status === 401) {
        return {
          valid: false,
          mensaje: data.mensaje || "Token de admin inválido o expirado",
        };
      }
      return {
        valid: false,
        mensaje: "Error al validar token de admin",
      };
    }
    return { valid: true };
  } catch (error) {
    console.error("Error en validarTokenAdmin:", error);
    return {
      valid: false,
      mensaje: "Error de conexión al validar sesión de admin",
    };
  }
};

export { getAdmin, updateAdmin, loginAdmin, validarTokenAdmin };
