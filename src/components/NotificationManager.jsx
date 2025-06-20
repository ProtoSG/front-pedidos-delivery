import { useEffect } from "react";
import { toast } from "sonner";
import { getPedidosByCliente } from "../services/pedido_service.js";

function NotificationManager() {
  useEffect(() => {
    const checkOrderStatus = async () => {
      try {
        const pedidos = await getPedidosByCliente();
        if (!Array.isArray(pedidos)) return;

        pedidos.forEach((pedido) => {
          const notificationKey = `notified_pedido_${pedido.id}`;
          const isNotified = localStorage.getItem(notificationKey);

          if (pedido.estado === "Enviado" && !isNotified) {
            toast.success(
              `¡Tu pedido #${pedido.id} ha sido enviado!`,
              {
                description: `Contiene: ${pedido.productos.map(p => p.nombre).join(', ')}`,
                duration: 10000, // 10 segundos
              }
            );
            localStorage.setItem(notificationKey, "true");
          }
        });
      } catch (error) {
        console.error("Error al verificar estado de pedidos:", error);
        // Opcional: notificar al usuario sobre el error de verificación
        // toast.error("No se pudo verificar el estado de tus pedidos.");
      }
    };

    // Verificar al cargar y luego cada 2 minutos
    checkOrderStatus();
    const intervalId = setInterval(checkOrderStatus, 120000); // 120000 ms = 2 minutos

    return () => clearInterval(intervalId);
  }, []);

  return null; // Este componente no renderiza nada
}

export default NotificationManager; 