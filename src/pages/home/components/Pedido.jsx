import { Toaster, toast } from "sonner";
import {
  addCantidad,
  deletePedido,
  removeCantidad,
  removeProduct,
} from "../../../services/agregar_producto";

import { IconMinus, IconPlus, IconTrash, IconX } from "@tabler/icons-react";
import { postPedido } from "../../../services/pedido_service";
import Extra from "./Extra";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

Pedido.propTypes = {
  pedido: PropTypes.array.isRequired,
  setPedido: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
  setTotal: PropTypes.func.isRequired,
};

export default function Pedido({ pedido, setPedido, total, setTotal }) {
  const navigate = useNavigate();
  const [loadingPedido, setLoadingPedido] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [whatsAppUrl, setWhatsAppUrl] = useState("");

  const handleClose = () => {
    const dialog = document.getElementById("modal");
    dialog.close();
  };

  const add = ({ producto, extra }) => {
    addCantidad({ producto, extra, setPedido, setTotal, total, pedido });
  };

  const minus = ({ producto, extra }) => {
    removeCantidad({ extra, producto, setPedido, setTotal, total, pedido });
  };

  const remove = ({ producto, extra }) => {
    removeProduct({ extra, producto, setPedido, setTotal, total, pedido });
    toast.error("Producto eliminado");
  };

  const deleteP = () => {
    deletePedido({ setPedido, setTotal });
    toast.error("Pedido eliminado");
  };

  const pedidoRealizado = () => {
    deletePedido({ setPedido, setTotal });
    toast.success("Pedido Realizado");
  };

  const openModal = () => {
    const modal2 = document.getElementById("modal-2");
    modal2.showModal();
  };

  const handleWhatsAppMessage = async (pedido, total) => {
    // Verificar si el usuario está autenticado y es de tipo 'user'
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");
    if (!token || userRole !== "user") {
      handleClose();
      setShowLoginPrompt(true);
      return;
    }
    setLoadingPedido(true);
    const productos = pedido[0];
    const extras = pedido[1];

    const productosFormateados = pedido[0].map((p) => ({
      producto_id: p.producto_id || p.id, // usa el campo correcto
      nombre: p.nombre,
      cantidad: p.cantidad,
      sub_total: p.subtotal || p.sub_total,
    }));

    const extrasFormateados = pedido[1].map((e) => ({
      extra_id: e.extra_id || e.id,
      nombre: e.nombre,
      cantidad: e.cantidad,
      sub_total: e.subtotal || e.sub_total,
    }));

    try {
      const result = await postPedido({ total, productos: productosFormateados, extras: extrasFormateados });

      if (result && !result.error) {
        const phoneNumber = "929720211";
        const message = `*Su pedido es*:${pedido[0]
          .map(
            (producto) => `\n          - ${producto.cantidad} ${producto.nombre}`,
          )
          .join("")}\n\n*Con Extras*:${pedido[1]
          .map(
            (extra) => `\n          - ${extra.cantidad} ${extra.nombre}`,
          )
          .join("")}\n\n *Total: S/ ${total.toFixed(2)}*\n        `;
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
          message,
        )}`;
        setWhatsAppUrl(url); // Guardar la URL para mostrar el botón

        pedidoRealizado();
        handleClose();

        // Si el usuario está autenticado, mostrar notificación y opción para ver dashboard
        if (token) {
          toast(
            <div>
              <p className="mb-2">
                ¡Tu pedido ha sido creado! Puedes ver tus notificaciones.
              </p>
              <div className="flex gap-2 justify-end">
                <button
                  className="bg-primary-500 text-white px-3 py-1 rounded-lg text-sm"
                  onClick={() => {
                    toast.dismiss();
                    navigate("/usuario");
                  }}
                >
                  Ver dashboard
                </button>
              </div>
            </div>,
            { duration: 6000 },
          );
        }
      } else {
        toast.error("Error al crear el pedido. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error al enviar pedido:", error);
      toast.error("Error al procesar el pedido. Por favor, intenta de nuevo.");
    } finally {
      setLoadingPedido(false);
    }
  };

  return (
    <>
      <dialog
        id="modal"
        className={`rounded-2xl border-none px-10 py-3 transition-all  w-[95%] lg:w-full backdrop:backdrop-blur-sm backdrop:bg-black/50  max-w-[500px] h-[560px] fixed`}
      >
        <div className="flex flex-col justify-between w-full h-full ">
          <h1 className="text-2xl text-center text-primary-800 font-bold">
            Pedido
          </h1>
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 hover:scale-125 transition cursor-pointer bg-transparent border-none p-0"
            type="button"
          >
            <IconX />
          </button>
          <div className="flex flex-col gap-4 mt-8 h-4/5 overflow-auto px-2 ">
            <section>
              {pedido[0].length === 0 ? (
                <p>Pedido Vacio</p>
              ) : (
                pedido[0].map((producto) => (
                  <div
                    key={producto.id}
                    className="grid grid-cols-4 items-center justify-center py-1 "
                  >
                    <p className="">{producto.nombre}</p>
                    <div className="flex justify-center items-center gap-2">
                      <button
                        disabled={producto.cantidad === 1}
                        className="disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:border-gray-400 disabled:hover:bg-slate-400  border-2 border-white hover:border-red-400 rounded-full p-1 transition hover:bg-red-400"
                        onClick={() => minus({ producto })}
                      >
                        <IconMinus />
                      </button>
                      <p className="text-center">{producto.cantidad}</p>
                      <button
                        className="border-2 border-white hover:border-green-400 rounded-full p-1 transition hover:bg-green-400"
                        onClick={() => add({ producto })}
                      >
                        <IconPlus />
                      </button>
                    </div>
                    <p className="text-end">
                      S/ {producto?.subtotal?.toFixed(2)}
                    </p>
                    <div className="text-end">
                      <button
                        onClick={() => remove({ producto })}
                        className="text-red-400 border-2 rounded-full border-red-400 hover:bg-red-400 hover:text-white p-1 transition hover:scale-125"
                      >
                        <IconTrash />
                      </button>
                    </div>
                  </div>
                ))
              )}
              <h2 className="text-xl text-primary-800 font-bold mt-3">
                Extras:{" "}
              </h2>
              {pedido[1].length === 0 ? (
                <p>No hay extas</p>
              ) : (
                pedido[1].map((extra) => (
                  <div
                    key={extra.id}
                    className="grid grid-cols-4 items-center justify-center py-1 "
                  >
                    <p className="">{extra.nombre}</p>
                    <div className="flex justify-center items-center gap-2">
                      <button
                        disabled={extra.cantidad === 1}
                        className="disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:border-gray-400 disabled:hover:bg-slate-400 border-2 border-white hover:border-red-400 rounded-full p-1 transition hover:bg-red-400"
                        onClick={() => minus({ extra })}
                      >
                        <IconMinus />
                      </button>
                      <p className="text-center">{extra.cantidad}</p>
                      <button
                        className="border-2 border-white hover:border-green-400 rounded-full p-1 transition hover:bg-green-400"
                        onClick={() => add({ extra })}
                      >
                        <IconPlus />
                      </button>
                    </div>
                    <p className="text-end">S/ {extra?.subtotal?.toFixed(2)}</p>
                    <div className="text-end">
                      <button
                        onClick={() => remove({ extra })}
                        className="text-red-400 border-2 rounded-full border-red-400 hover:bg-red-400 hover:text-white p-1 transition hover:scale-125"
                      >
                        <IconTrash />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </section>
          </div>
          <div className="flex flex-col gap-4 pt-4 mb-4 ">
            <button
              onClick={openModal}
              className=" text-primary-500 hover:text-primary-700 font-bold text-xl hover:scale-110 transition"
            >
              Agregar Extras
            </button>
            <div className="flex justify-between items-center px-2 text-xl">
              <p>Total</p>
              <p>S/ {total?.toFixed(2)}</p>
            </div>
            <div className="grid grid-cols-2 w-full gap-8">
              <button
                disabled={pedido[0]?.length === 0 || loadingPedido}
                onClick={deleteP}
                className="transition bg-gray-400 text-white rounded-2xl py-2 hover:bg-gray-600"
              >
                Vaciar Pedido
              </button>
              <button
                onClick={() => handleWhatsAppMessage(pedido, total)}
                disabled={pedido[0]?.length === 0 || loadingPedido}
                className="transition bg-primary-500 text-white rounded-2xl py-2 hover:bg-primary-600 flex items-center justify-center"
              >
                {loadingPedido ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                    Procesando...
                  </span>
                ) : (
                  "Pagar"
                )}
              </button>
            </div>
          </div>
        </div>
        <Toaster richColors position="bottom-center" />
      </dialog>

      <Extra
        pedido={pedido}
        setPedido={setPedido}
        total={total}
        setTotal={setTotal}
      />

      {loadingPedido && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 flex flex-col items-center shadow-lg">
            <svg className="animate-spin h-8 w-8 text-primary-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
            <span className="text-primary-800 font-semibold">Procesando pedido...</span>
          </div>
        </div>
      )}

      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 flex flex-col items-center shadow-lg">
            <p className="mb-4 text-lg text-red-600 font-semibold text-center">
              Debes iniciar sesión como usuario para realizar un pedido.
            </p>
            <button
              className="bg-primary-500 text-white px-6 py-2 rounded-lg text-base font-medium mb-2"
              onClick={() => navigate('/login')}
            >
              Ir al login
            </button>
            <button
              className="text-gray-500 hover:text-gray-700 text-sm"
              onClick={() => setShowLoginPrompt(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Botón para abrir WhatsApp tras crear el pedido */}
      {whatsAppUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 flex flex-col items-center shadow-lg">
            <p className="mb-4 text-lg text-green-700 font-semibold text-center">
              ¡Pedido creado! Haz click en el botón para enviar tu pedido por WhatsApp.
            </p>
            <button
              className="bg-green-500 text-white px-6 py-2 rounded-lg text-base font-medium mb-2"
              onClick={() => {
                window.open(whatsAppUrl, "_blank");
                setWhatsAppUrl("");
              }}
            >
              Enviar pedido por WhatsApp
            </button>
            <button
              className="text-gray-500 hover:text-gray-700 text-sm"
              onClick={() => setWhatsAppUrl("")}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
