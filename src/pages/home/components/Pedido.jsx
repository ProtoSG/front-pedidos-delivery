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

Pedido.propTypes = {
  pedido: PropTypes.array.isRequired,
  setPedido: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
  setTotal: PropTypes.func.isRequired,
};

export default function Pedido({ pedido, setPedido, total, setTotal }) {
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

  const openModal = () => {
    const modal2 = document.getElementById("modal-2");
    modal2.showModal();
  };

  const handleWhatsAppMessage = async (pedido, total) => {
    const productos = pedido[0];
    const extras = pedido[1];
    await postPedido({ total, productos, extras });
    const phoneNumber = "929720211";
    const message = `*Su pedido es*:${pedido[0]
      .map(
        (producto) => `
      - ${producto.cantidad} ${producto.nombre}`,
      )
      .join("")}\n\n*Con Extras*:${pedido[1]
      .map(
        (extra) => `
      - ${extra.cantidad} ${extra.nombre}`,
      )
      .join("")}\n\n *Total: S/ ${total.toFixed(2)}*
    `;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message,
    )}`;
    window.open(url, "_blank");

    deleteP();
    handleClose();
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
                disabled={pedido[0]?.length === 0}
                onClick={deleteP}
                className="transition bg-gray-400 text-white rounded-2xl py-2 hover:bg-gray-600"
              >
                Vaciar Pedido
              </button>
              <button
                onClick={() => handleWhatsAppMessage(pedido, total)}
                disabled={pedido[0]?.length === 0}
                className="transition bg-primary-500 text-white rounded-2xl py-2 hover:bg-primary-600"
              >
                Pagar
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
    </>
  );
}
