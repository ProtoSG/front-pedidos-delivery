import { useEffect, useRef, useState } from "react";
import { IconBell, IconCheck } from "@tabler/icons-react";
import PropTypes from "prop-types";
import useNotificaciones from "../hooks/useNotificaciones";

// Componente para un botón de notificación
const NotificationBadge = ({ count, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative p-2 rounded-full hover:bg-primary-600 transition-colors"
    >
      <IconBell className="w-6 h-6 text-white" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </button>
  );
};

NotificationBadge.propTypes = {
  count: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

// Componente para una notificación individual
const NotificationItem = ({ notificacion, onMarcarLeida }) => {
  const { notificacion_id, mensaje, tipo, leida, fecha_envio } = notificacion;

  // Formatea la fecha para mostrarla de forma amigable
  const formatearFecha = (fechaStr) => {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Determina el color de fondo según el tipo de notificación
  const getBgColor = () => {
    switch (tipo) {
      case "nuevo_pedido":
        return "bg-blue-100 border-l-4 border-blue-500";
      case "envio":
        return "bg-green-100 border-l-4 border-green-500";
      case "info":
        return "bg-yellow-100 border-l-4 border-yellow-500";
      default:
        return "bg-gray-100 border-l-4 border-gray-500";
    }
  };

  // Determina el icono según el tipo de notificación
  const getIcon = () => {
    switch (tipo) {
      case "nuevo_pedido":
        return (
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-200 text-blue-600">
            <IconBell className="w-6 h-6" />
          </div>
        );
      case "envio":
        return (
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-200 text-green-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12V7a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v6a6 6 0 1 1-12 0" />
              <circle cx="9" cy="13" r="1" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-200 text-yellow-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div
      className={`${getBgColor()} ${
        !leida ? "opacity-100" : "opacity-70"
      } p-4 mb-2 rounded-lg relative transition-all duration-300`}
    >
      <div className="flex items-start">
        <div className="mr-3">{getIcon()}</div>
        <div className="flex-1">
          <p className="text-sm font-medium">{mensaje}</p>
          <p className="text-xs text-gray-500 mt-1">
            {formatearFecha(fecha_envio)}
          </p>
        </div>
        {!leida && (
          <button
            onClick={() => onMarcarLeida(notificacion_id)}
            className="ml-2 bg-white rounded-full p-1 hover:bg-primary-100 transition-colors"
            title="Marcar como leída"
          >
            <IconCheck className="w-4 h-4 text-primary-600" />
          </button>
        )}
      </div>
    </div>
  );
};

NotificationItem.propTypes = {
  notificacion: PropTypes.shape({
    notificacion_id: PropTypes.number.isRequired,
    mensaje: PropTypes.string.isRequired,
    tipo: PropTypes.string.isRequired,
    leida: PropTypes.bool.isRequired,
    fecha_envio: PropTypes.string.isRequired,
  }).isRequired,
  onMarcarLeida: PropTypes.func.isRequired,
};

// Componente principal del dropdown de notificaciones
export default function NotificacionesDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const {
    notificaciones,
    noLeidas,
    isLoading,
    cargarNotificaciones,
    marcarComoLeida,
    marcarTodasComoLeidas,
  } = useNotificaciones();

  // Cierra el dropdown al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Recarga las notificaciones cada 30 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      if (localStorage.getItem("token")) {
        cargarNotificaciones();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [cargarNotificaciones]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      cargarNotificaciones();
    }
  };

  // DEBUG: Mostrar notificaciones en consola
  console.log("Notificaciones recibidas en Dropdown:", notificaciones);

  return (
    <div ref={dropdownRef} className="relative">
      <NotificationBadge count={noLeidas} onClick={toggleDropdown} />

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-30 max-h-96 overflow-auto">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-medium">Notificaciones</h3>
            {noLeidas > 0 && (
              <button
                onClick={marcarTodasComoLeidas}
                className="text-xs text-primary-600 hover:text-primary-800"
              >
                Marcar todas como leídas
              </button>
            )}
          </div>

          <div className="p-2">
            {isLoading ? (
              <div className="text-center py-4">
                <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-sm text-gray-500 mt-1">Cargando...</p>
              </div>
            ) : notificaciones.length > 0 ? (
              notificaciones.map((notificacion) => (
                <NotificationItem
                  key={notificacion.notificacion_id}
                  notificacion={notificacion}
                  onMarcarLeida={marcarComoLeida}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">
                No tienes notificaciones.
              </p>
            )}
          </div>

          <div className="p-2 border-t text-center">
            <button
              onClick={() => {
                cargarNotificaciones();
              }}
              className="text-sm text-primary-600 hover:text-primary-800"
            >
              Actualizar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
