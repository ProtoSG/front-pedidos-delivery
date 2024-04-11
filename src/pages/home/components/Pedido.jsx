/* eslint-disable react/prop-types */
import { Toaster, toast } from "sonner";
import {
  addCantidad,
  deletePedido,
  removeCantidad,
  removeProduct,
} from "../../../services/agregar_producto";

import { IconMinus, IconPlus, IconTrash, IconX } from "@tabler/icons-react";

export default function Pedido({ pedido, setPedido, total, setTotal }) {
  const handleClose = () => {
    const dialog = document.getElementById("modal");
    dialog.close();
  };

  const add = (producto) => {
    addCantidad({ producto, setPedido, setTotal, total, pedido });
  };

  const minus = (producto) => {
    removeCantidad({ producto, setPedido, setTotal, total, pedido });
  };

  const remove = (producto) => {
    removeProduct({ producto, setPedido, setTotal, total, pedido });
    toast.error("Producto eliminado");
  };

  const deleteP = () => {
    deletePedido({ setPedido, setTotal });
    toast.error("Pedido eliminado");
  };

  return (
    <dialog
      id="modal"
      className={`rounded-2xl border-none px-10 py-3 transition-all backdrop:backdrop-blur-sm backdrop:bg-black/50 min-w-[500px] max-w-[680px] w-6/12 h-[560px] fixed`}
    >
      <div className="flex flex-col justify-between w-full h-full">
        <h1 className="text-2xl text-center text-primary-800 font-bold">
          Pedido
        </h1>
        <span
          onClick={handleClose}
          className="absolute right-4 top-4 hover:scale-125 transition cursor-pointer"
        >
          <IconX />
        </span>
        <div className="flex flex-col gap-4 mt-8 h-4/5 overflow-auto pr-2">
          {pedido.map((producto) => (
            <div
              key={producto.id}
              className="grid grid-cols-4 items-center justify-center py-1 "
            >
              <p className="">{producto.name}</p>
              <div className="flex justify-center items-center gap-2">
                <button
                  className="border-2 border-white hover:border-red-400 rounded-full p-1 transition hover:bg-red-400"
                  onClick={() => minus(producto)}
                >
                  <IconMinus />
                </button>
                <p className="text-center">{producto.quantity}</p>
                <button
                  className="border-2 border-white hover:border-green-400 rounded-full p-1 transition hover:bg-green-400"
                  onClick={() => add(producto)}
                >
                  <IconPlus />
                </button>
              </div>
              <p className="text-end">S/ {producto.subtotal.toFixed(2)}</p>
              <div className="text-end">
                <button
                  onClick={() => remove(producto)}
                  className="text-red-400 border-2 rounded-full border-red-400 hover:bg-red-400 hover:text-white p-1 transition hover:scale-125"
                >
                  <IconTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4 pt-4 mb-4 ">
          <div className="flex justify-between items-center px-2 text-xl">
            <p>Total</p>
            <p>S/ {total?.toFixed(2)}</p>
          </div>
          <div className="grid grid-cols-2 w-full gap-8">
            <button
              disabled={pedido.length === 0}
              onClick={deleteP}
              className="transition bg-gray-400 text-white rounded-2xl py-2 hover:bg-gray-600"
            >
              Vaciar Pedido
            </button>
            <button
              disabled={pedido.length === 0}
              className="transition bg-primary-500 text-white rounded-2xl py-2 hover:bg-primary-600"
            >
              Pagar
            </button>
          </div>
        </div>
      </div>
      <Toaster richColors position="bottom-center" />
    </dialog>
  );
}
