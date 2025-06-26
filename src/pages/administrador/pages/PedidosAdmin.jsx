import { useEffect, useState } from "react";
import { getAllPedidos, updateEstadoPedido } from "../../../services/pedido_service";
import { Toaster, toast } from "sonner";

export default function PedidosAdmin() {
  const [pedidos, setPedidos] = useState([]);
  const [loadingPedidos, setLoadingPedidos] = useState(false);
  const [errorPedidos, setErrorPedidos] = useState(null);

  useEffect(() => {
    const fetchPedidos = async () => {
      setLoadingPedidos(true);
      setErrorPedidos(null);
      try {
        const data = await getAllPedidos();
        setPedidos(data);
      } catch (e) {
        setErrorPedidos(e.message);
      } finally {
        setLoadingPedidos(false);
      }
    };
    fetchPedidos();
  }, []);

  const handleEstadoChange = async (pedidoId, nuevoEstado) => {
    const res = await updateEstadoPedido(pedidoId, nuevoEstado);
    if (res.error) {
      toast.error(res.mensaje || "Error al cambiar el estado");
    } else {
      toast.success("Estado actualizado");
      setPedidos((prev) =>
        prev.map((p) =>
          p.id === pedidoId ? { ...p, estado: nuevoEstado } : p
        )
      );
    }
  };

  return (
    <main className="flex flex-col w-full h-full px-10">
      <Toaster richColors position="top-center" />
      <h1 className="text-3xl font-bold my-8">Gestión de Pedidos</h1>
      <section className="mb-8">
        {loadingPedidos ? (
          <p>Cargando pedidos...</p>
        ) : errorPedidos ? (
          <p className="text-red-500">{errorPedidos}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-xl">
              <thead>
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Usuario</th>
                  <th className="px-4 py-2">Total</th>
                  <th className="px-4 py-2">Estado</th>
                  <th className="px-4 py-2">Acción</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((pedido) => (
                  <tr key={pedido.id} className="border-t">
                    <td className="px-4 py-2 text-center">{pedido.id}</td>
                    <td className="px-4 py-2 text-center">{pedido.usuario_nombre || pedido.usuario || "-"}</td>
                    <td className="px-4 py-2 text-center">S/ {pedido.total?.toFixed(2) ?? "-"}</td>
                    <td className="px-4 py-2 text-center">
                      <select
                        value={pedido.estado}
                        onChange={(e) => handleEstadoChange(pedido.id, e.target.value)}
                        className="border rounded px-2 py-1"
                      >
                        <option>Pendiente</option>
                        <option>Preparando</option>
                        <option>Enviado</option>
                        <option>Entregado</option>
                        <option>Cancelado</option>
                      </select>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => handleEstadoChange(pedido.id, pedido.estado)}
                        className="bg-primary-500 text-white px-3 py-1 rounded hover:bg-primary-600"
                      >
                        Guardar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
} 