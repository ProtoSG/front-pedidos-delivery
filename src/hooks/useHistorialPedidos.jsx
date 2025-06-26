import { useEffect, useState } from "react";
import { getHistorialPedidos, getMisPedidos } from "../services/pedido_service.js";

/**
 * Hook para manejar el historial de pedidos del usuario
 */
export default function useHistorialPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [pedidosActuales, setPedidosActuales] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarHistorialPedidos = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getHistorialPedidos();
      setPedidos(data || []);
    } catch (err) {
      console.error("Error cargando historial de pedidos:", err);
      setError("Error al cargar historial de pedidos");
    } finally {
      setIsLoading(false);
    }
  };

  const cargarPedidosActuales = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getMisPedidos();
      setPedidosActuales(data || []);
    } catch (err) {
      console.error("Error cargando pedidos actuales:", err);
      setError("Error al cargar pedidos actuales");
    } finally {
      setIsLoading(false);
    }
  };

  const filtrarPorEstado = (estado) => {
    if (!estado) return pedidos;
    return pedidos.filter(pedido => pedido.estado.toLowerCase() === estado.toLowerCase());
  };

  const filtrarPorFecha = (fechaInicio, fechaFin) => {
    if (!fechaInicio && !fechaFin) return pedidos;

    return pedidos.filter(pedido => {
      const fechaPedido = new Date(pedido.fecha_hora);

      if (fechaInicio && fechaFin) {
        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);
        return fechaPedido >= inicio && fechaPedido <= fin;
      }

      if (fechaInicio) {
        const inicio = new Date(fechaInicio);
        return fechaPedido >= inicio;
      }

      if (fechaFin) {
        const fin = new Date(fechaFin);
        return fechaPedido <= fin;
      }

      return true;
    });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      cargarHistorialPedidos();
      cargarPedidosActuales();
    }
  }, []);

  return {
    pedidos,
    pedidosActuales,
    isLoading,
    error,
    cargarHistorialPedidos,
    cargarPedidosActuales,
    filtrarPorEstado,
    filtrarPorFecha
  };
}
