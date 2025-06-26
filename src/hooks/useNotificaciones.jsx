import { useEffect, useState } from "react";
import {
  getNotificaciones,
  getResumenNotificaciones,
  marcarLeida,
  marcarTodasLeidas
} from "../services/notificacion_service.js";

/**
 * Hook para manejar las notificaciones del usuario
 */
export default function useNotificaciones() {
  const [notificaciones, setNotificaciones] = useState([]);
  const [noLeidas, setNoLeidas] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarNotificaciones = async (soloNoLeidas = false) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getNotificaciones(soloNoLeidas);
      setNotificaciones(data.notificaciones || []);

      // Actualizar contador de no leídas
      await cargarResumen();
    } catch (err) {
      console.error("Error cargando notificaciones:", err);
      setError("Error al cargar notificaciones");
    } finally {
      setIsLoading(false);
    }
  };

  const cargarResumen = async () => {
    try {
      const resumen = await getResumenNotificaciones();
      setNoLeidas(resumen?.total_no_leidas || 0);
    } catch (err) {
      console.error("Error cargando resumen de notificaciones:", err);
    }
  };

  const marcarComoLeida = async (notificacionId) => {
    try {
      await marcarLeida(notificacionId);

      // Actualizar el estado local
      setNotificaciones(prevNotificaciones =>
        prevNotificaciones.map(notif =>
          notif.notificacion_id === notificacionId
            ? { ...notif, leida: true }
            : notif
        )
      );

      // Actualizar contador
      await cargarResumen();
    } catch (err) {
      console.error(`Error al marcar notificación ${notificacionId} como leída:`, err);
    }
  };

  const marcarTodasComoLeidas = async () => {
    try {
      await marcarTodasLeidas();

      // Actualizar el estado local
      setNotificaciones(prevNotificaciones =>
        prevNotificaciones.map(notif => ({ ...notif, leida: true }))
      );

      setNoLeidas(0);
    } catch (err) {
      console.error("Error al marcar todas las notificaciones como leídas:", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      cargarNotificaciones();
    }
  }, []);

  return {
    notificaciones,
    noLeidas,
    isLoading,
    error,
    cargarNotificaciones,
    marcarComoLeida,
    marcarTodasComoLeidas,
    cargarResumen
  };
}
