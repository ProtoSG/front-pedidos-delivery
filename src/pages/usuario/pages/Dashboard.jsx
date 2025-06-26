import { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import useHistorialPedidos from "../../../hooks/useHistorialPedidos";
import useNotificaciones from "../../../hooks/useNotificaciones";
import { IconReceipt, IconBell, IconUser } from "@tabler/icons-react";

// Componente de tarjeta estadística
const StatCard = ({ icon, title, value, color }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex items-center">
      <div className={`rounded-full p-3 ${color} mr-4`}>{icon}</div>
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

// Componente de pedido reciente
const RecentOrderCard = ({ pedido }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Genera color basado en el estado del pedido
  const getStatusColor = (estado) => {
    switch (estado.toLowerCase()) {
      case "entregado":
        return "text-green-600 bg-green-100";
      case "enviado":
        return "text-blue-600 bg-blue-100";
      case "pendiente":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-3">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">Pedido #{pedido.pedido_id || pedido.id}</h3>
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(pedido.estado)}`}
        >
          {pedido.estado}
        </span>
      </div>
      <p className="text-sm text-gray-500">{formatDate(pedido.fecha_hora)}</p>
      <div className="mt-2">
        <p className="text-sm font-medium">Productos:</p>
        <ul className="text-sm text-gray-600 mt-1 pl-4">
          {Array.isArray(pedido.productos) && pedido.productos.length > 0
            ? pedido.productos.slice(0, 2).map((producto, index) => (
                <li key={index} className="list-disc">
                  {typeof producto === "object" && producto !== null
                    ? `${producto.cantidad} x ${producto.nombre}`
                    : producto}
                </li>
              ))
            : (
              <li className="list-disc text-gray-400">Sin productos</li>
            )}
          {Array.isArray(pedido.productos) && pedido.productos.length > 2 && (
            <li className="text-xs mt-1 font-medium text-gray-500">
              + {pedido.productos.length - 2} más...
            </li>
          )}
        </ul>
      </div>
      <p className="text-right font-medium mt-3">
        Total: S/ {pedido.total?.toFixed ? pedido.total.toFixed(2) : pedido.total}
      </p>
    </div>
  );
};

// Componente de notificación reciente
const RecentNotificationCard = ({ notificacion, onMarcarLeida }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Colores según tipo de notificación
  const getTypeColors = (tipo) => {
    switch (tipo) {
      case "nuevo_pedido":
        return "border-l-4 border-blue-500";
      case "envio":
        return "border-l-4 border-green-500";
      case "info":
        return "border-l-4 border-yellow-500";
      default:
        return "border-l-4 border-gray-500";
    }
  };

  return (
    <div
      className={`bg-white rounded-r-lg shadow-sm p-4 mb-3 ${getTypeColors(notificacion.tipo)}`}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">Pedido #{notificacion.pedido_id}</h3>
        <p className="text-xs text-gray-500">
          {formatDate(notificacion.fecha_envio)}
        </p>
      </div>
      <p className="text-sm">{notificacion.mensaje}</p>
      {!notificacion.leida && (
        <button
          onClick={() => onMarcarLeida(notificacion.notificacion_id)}
          className="text-xs text-primary-600 mt-2 hover:text-primary-800"
        >
          Marcar como leída
        </button>
      )}
    </div>
  );
};

export default function Dashboard() {
  const { usuario, isLoading: isLoadingUser } = useAuth(true);
  const {
    pedidosActuales,
    isLoading: isLoadingPedidos,
    cargarPedidosActuales,
  } = useHistorialPedidos();

  const {
    notificaciones,
    noLeidas,
    isLoading: isLoadingNotificaciones,
    marcarComoLeida,
    cargarNotificaciones,
  } = useNotificaciones();

  const [recentOrders, setRecentOrders] = useState([]);
  const [recentNotifications, setRecentNotifications] = useState([]);

  useEffect(() => {
    // Actualizar pedidos recientes
    if (pedidosActuales && pedidosActuales.length > 0) {
      setRecentOrders(pedidosActuales.slice(0, 3));
    }
  }, [pedidosActuales]);

  useEffect(() => {
    // Actualizar notificaciones recientes
    if (notificaciones && notificaciones.length > 0) {
      setRecentNotifications(notificaciones.slice(0, 5));
    }
  }, [notificaciones]);

  // Calcular estadísticas
  const totalPedidos = Array.isArray(pedidosActuales)
    ? pedidosActuales.length
    : 0;
  const pedidosPendientes = Array.isArray(pedidosActuales)
    ? pedidosActuales.filter(
        (pedido) => pedido?.estado?.toLowerCase?.() === "pendiente",
      ).length
    : 0;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Bienvenido(a), {usuario?.nombre || "Usuario"}
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard
          icon={<IconReceipt className="w-6 h-6 text-primary-600" />}
          title="Total Pedidos"
          value={totalPedidos}
          color="bg-primary-100"
        />
        <StatCard
          icon={<IconBell className="w-6 h-6 text-yellow-600" />}
          title="Notificaciones no leídas"
          value={noLeidas}
          color="bg-yellow-100"
        />
        <StatCard
          icon={<IconReceipt className="w-6 h-6 text-blue-600" />}
          title="Pedidos Pendientes"
          value={pedidosPendientes}
          color="bg-blue-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Pedidos Recientes</h2>
            <button
              onClick={cargarPedidosActuales}
              className="text-sm text-primary-600 hover:text-primary-800"
            >
              Actualizar
            </button>
          </div>

          {isLoadingPedidos ? (
            <div className="flex justify-center items-center p-8">
              <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : recentOrders.length > 0 ? (
            <div className="space-y-4">
              {recentOrders.map((pedido) => (
                <RecentOrderCard key={pedido.pedido_id || pedido.id} pedido={pedido} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <p className="text-gray-500">No tienes pedidos recientes</p>
            </div>
          )}
        </section>

        {/* Recent Notifications */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Notificaciones Recientes</h2>
            <button
              onClick={cargarNotificaciones}
              className="text-sm text-primary-600 hover:text-primary-800"
            >
              Actualizar
            </button>
          </div>

          {isLoadingNotificaciones ? (
            <div className="flex justify-center items-center p-8">
              <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : recentNotifications.length > 0 ? (
            <div className="space-y-4">
              {recentNotifications.map((notificacion) => (
                <RecentNotificationCard
                  key={notificacion.notificacion_id}
                  notificacion={notificacion}
                  onMarcarLeida={marcarComoLeida}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <p className="text-gray-500">
                No tienes notificaciones recientes
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
