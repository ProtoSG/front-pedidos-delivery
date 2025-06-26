import { api } from "../constants/api";

const notificacionApi = `${api}/notificaciones`;

/**
 * Obtiene todas las notificaciones del usuario
 * @param {boolean} noLeidas - Si es true, obtiene solo las notificaciones no leídas
 * @returns {Promise<Array>} - Lista de notificaciones
 */
const getNotificaciones = async (noLeidas = false) => {
  const token = localStorage.getItem('token');
  try {
    const url = noLeidas ? `${notificacionApi}?no_leidas=true` : notificacionApi;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Error al obtener notificaciones: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en getNotificaciones:', error);
    return [];
  }
};

/**
 * Obtiene un resumen con el contador de notificaciones no leídas
 * @returns {Promise<Object>} - Resumen de notificaciones
 */
const getResumenNotificaciones = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${notificacionApi}/resumen`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Error al obtener resumen: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en getResumenNotificaciones:', error);
    return { total_no_leidas: 0 };
  }
};

/**
 * Marca una notificación específica como leída
 * @param {number} notificacionId - ID de la notificación
 * @returns {Promise<Object>} - Resultado de la operación
 */
const marcarLeida = async (notificacionId) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${notificacionApi}/${notificacionId}/marcar-leida`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Error al marcar notificación como leída: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en marcarLeida:', error);
    return { error: true, mensaje: error.message };
  }
};

/**
 * Marca todas las notificaciones como leídas
 * @returns {Promise<Object>} - Resultado de la operación
 */
const marcarTodasLeidas = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${notificacionApi}/marcar-todas-leidas`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Error al marcar todas como leídas: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en marcarTodasLeidas:', error);
    return { error: true, mensaje: error.message };
  }
};

export {
  getNotificaciones,
  getResumenNotificaciones,
  marcarLeida,
  marcarTodasLeidas
};
