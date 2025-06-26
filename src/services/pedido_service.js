import { api } from "../constants/api";

const pedidoApi = `${api}/pedido`;

const postPedido = async ({ total, productos, extras }) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${pedidoApi}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ total, productos, extras }),
    });
    if (!response.ok) {
      throw new Error(
        "Hubo un problema al enviar la  solicitud " + response.status,
      );
    }
    const responseData = await response.json();
    return responseData;
  } catch (e) {
    console.error(e);
    return { error: true, mensaje: e.message };
  }
};

const getTotalDias = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${pedidoApi}/datos_dias`, {
      method: "GET",
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
  } catch (e) {
    console.error(e);
  }
};

const getTotalSemanas = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${pedidoApi}/datos_semanas`, {
      method: "GET",
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
  } catch (e) {
    console.error(e);
  }
};

const getTotalMeses = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${pedidoApi}/datos_meses`, {
      method: "GET",
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
  } catch (e) {
    console.error(e);
  }
};

const getTotalAnos = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${pedidoApi}/datos_anos`, {
      method: "GET",
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
  } catch (e) {
    console.error(e);
  }
};

/**
 * Obtiene el historial completo de pedidos del usuario
 * @returns {Promise<Array>} - Lista de pedidos
 */
const getHistorialPedidos = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${pedidoApi}/historial`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener historial: ${response.status}`);
    }

    const data = await response.json();
    return data.historial || [];
  } catch (error) {
    console.error("Error en getHistorialPedidos:", error);
    return [];
  }
};

/**
 * Obtiene los pedidos actuales del usuario
 * @returns {Promise<Array>} - Lista de pedidos actuales
 */
const getMisPedidos = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${pedidoApi}/mis-pedidos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener pedidos actuales: ${response.status}`);
    }

    const data = await response.json();
    return data.pedidos || [];
  } catch (error) {
    console.error("Error en getMisPedidos:", error);
    return [];
  }
};

/**
 * Cambia el estado de un pedido
 * @param {number|string} pedidoId - ID del pedido
 * @param {string} nuevoEstado - Nuevo estado (Pendiente, Preparando, Enviado, Entregado, Cancelado)
 * @returns {Promise<Object>} - Respuesta del backend
 */
const updateEstadoPedido = async (pedidoId, nuevoEstado) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${pedidoApi}/${pedidoId}/estado`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ estado: nuevoEstado }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.mensaje || "Error al cambiar el estado del pedido");
    }
    return data;
  } catch (error) {
    console.error("Error en updateEstadoPedido:", error);
    return { error: true, mensaje: error.message };
  }
};

/**
 * Obtiene todos los pedidos del sistema (solo admin)
 * @returns {Promise<Array>} - Lista de todos los pedidos
 */
const getAllPedidos = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${pedidoApi}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Error al obtener todos los pedidos: ${response.status}`);
    }
    const data = await response.json();
    return data.pedidos || data || [];
  } catch (error) {
    console.error("Error en getAllPedidos:", error);
    return [];
  }
};

export {
  getTotalAnos,
  getTotalDias,
  getTotalMeses,
  getTotalSemanas,
  postPedido,
  getHistorialPedidos,
  getMisPedidos,
  updateEstadoPedido,
  getAllPedidos,
};
