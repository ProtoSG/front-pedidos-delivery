import { useState, useEffect } from "react";
import useHistorialPedidos from "../../../hooks/useHistorialPedidos";
import { IconSearch, IconFilter, IconX } from "@tabler/icons-react";

export default function Pedidos() {
  const {
    pedidos,
    isLoading,
    error,
    cargarHistorialPedidos,
    filtrarPorEstado,
    filtrarPorFecha,
  } = useHistorialPedidos();

  const [filteredPedidos, setFilteredPedidos] = useState([]);
  const [estadoFilter, setEstadoFilter] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedPedidoId, setExpandedPedidoId] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Asegurarse de que pedidos sea un array
    let result = Array.isArray(pedidos) ? [...pedidos] : [];

    // Filtrar por estado si hay uno seleccionado
    if (estadoFilter) {
      result = Array.isArray(filtrarPorEstado(estadoFilter))
        ? filtrarPorEstado(estadoFilter)
        : [];
    }

    // Filtrar por fechas
    if (fechaInicio || fechaFin) {
      result = Array.isArray(filtrarPorFecha(fechaInicio, fechaFin))
        ? filtrarPorFecha(fechaInicio, fechaFin)
        : [];
    }

    // Filtrar por término de búsqueda (ID de pedido)
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter((pedido) =>
        pedido.pedido_id?.toString().includes(term),
      );
    }

    setFilteredPedidos(result);
    // Solo dependencias necesarias para evitar bucle infinito
  }, [pedidos, estadoFilter, fechaInicio, fechaFin, searchTerm]);

  // Formatear fecha para mostrarla de forma amigable
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Generar color de estado
  const getStatusColor = (estado) => {
    switch (estado.toLowerCase()) {
      case "entregado":
        return "bg-green-100 text-green-800 border-green-200";
      case "enviado":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pendiente":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const togglePedidoDetails = (pedidoId) => {
    if (expandedPedidoId === pedidoId) {
      setExpandedPedidoId(null);
    } else {
      setExpandedPedidoId(pedidoId);
    }
  };

  const resetFilters = () => {
    setEstadoFilter("");
    setFechaInicio("");
    setFechaFin("");
    setSearchTerm("");
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold">Historial de Pedidos</h1>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-full sm:w-auto"
            />
            <IconSearch className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50"
          >
            <IconFilter className="w-5 h-5" />
            Filtros
          </button>

          <button
            onClick={cargarHistorialPedidos}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
          >
            Actualizar
          </button>
        </div>
      </div>

      {/* Filtros */}
      {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium">Filtros</h2>
            <button
              onClick={() => setShowFilters(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <IconX className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estado
              </label>
              <select
                value={estadoFilter}
                onChange={(e) => setEstadoFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Todos</option>
                <option value="pendiente">Pendiente</option>
                <option value="enviado">Enviado</option>
                <option value="entregado">Entregado</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha inicio
              </label>
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha fin
              </label>
              <input
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Reiniciar filtros
            </button>
          </div>
        </div>
      )}

      {/* Resultados */}
      {isLoading ? (
        <div className="flex justify-center items-center p-12">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-200 text-red-800 p-4 rounded-lg">
          {error}
        </div>
      ) : !Array.isArray(filteredPedidos) || filteredPedidos.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <p className="text-gray-500">
            No se encontraron pedidos con los filtros aplicados
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPedidos.map((pedido) => (
            <div
              key={pedido.pedido_id}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              {/* Cabecera del pedido */}
              <div
                className="p-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
                onClick={() => togglePedidoDetails(pedido.pedido_id)}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-primary-100 text-primary-800 p-3 rounded-lg">
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
                      <path d="M5 7 3 5" />
                      <path d="M9 6V3" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="M11.5 12.2 19 19l2-2-6.8-7.5" />
                      <path d="m7 16 3.1-3.1" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">
                      Pedido #{pedido.pedido_id}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {formatDate(pedido.fecha_hora)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(pedido.estado)}`}
                  >
                    {pedido.estado}
                  </span>
                  <span className="font-semibold">
                    S/ {pedido.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Detalles expandibles */}
              {expandedPedidoId === pedido.pedido_id && (
                <div className="p-4 bg-gray-50 border-t border-gray-100">
                  <h4 className="font-medium mb-2">Productos</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          <th className="p-2">Producto</th>
                          <th className="p-2">Cantidad</th>
                          <th className="p-2">Precio Unit.</th>
                          <th className="p-2">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {pedido.productos.map((producto, index) => (
                          <tr key={index} className="text-sm">
                            <td className="p-2">{producto.nombre}</td>
                            <td className="p-2">{producto.cantidad}</td>
                            <td className="p-2">
                              S/{" "}
                              {(producto.sub_total / producto.cantidad).toFixed(
                                2,
                              )}
                            </td>
                            <td className="p-2">
                              S/ {producto.sub_total.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {pedido.extras && pedido.extras.length > 0 && (
                    <>
                      <h4 className="font-medium mt-4 mb-2">Extras</h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead>
                            <tr className="bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              <th className="p-2">Extra</th>
                              <th className="p-2">Cantidad</th>
                              <th className="p-2">Precio Unit.</th>
                              <th className="p-2">Subtotal</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {pedido.extras.map((extra, index) => (
                              <tr key={index} className="text-sm">
                                <td className="p-2">{extra.nombre}</td>
                                <td className="p-2">{extra.cantidad}</td>
                                <td className="p-2">
                                  S/{" "}
                                  {(extra.sub_total / extra.cantidad).toFixed(
                                    2,
                                  )}
                                </td>
                                <td className="p-2">
                                  S/ {extra.sub_total.toFixed(2)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}

                  <div className="mt-4 text-right">
                    <p className="text-sm text-gray-500">
                      Subtotal: S/ {pedido.total.toFixed(2)}
                    </p>
                    <p className="font-bold text-lg">
                      Total: S/ {pedido.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
