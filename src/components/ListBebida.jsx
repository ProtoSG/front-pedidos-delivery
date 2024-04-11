/* eslint-disable react/prop-types */
import { Toaster, toast } from "sonner";
import useBebidas from "../hooks/useBebidas";
import { addProduct } from "../services/agregar_producto";

export default function ListBebida({ pedido, setPedido, total, setTotal }) {
  const { bebidas } = useBebidas();

  const handleAgregarProducto = (producto) => {
    addProduct({ producto, setPedido, setTotal, total, pedido });
    toast.success("Producto agregado");
  };

  return (
    <>
      {bebidas.map((bebida) => (
        <article
          key={bebida.id}
          className="max-w-[400px] grid grid-cols-2 items-center py-4 mx-auto"
        >
          <div className="size-40 col-span-1">
            <img src={bebida.imagen_url} alt={bebida.nombre} />
          </div>
          <div className="flex flex-col justify-center items-center gap-3  col-span-1">
            <h3 className="text-xl font-semibold text-center">
              {bebida.nombre}
            </h3>
            <p className="text-xl font-semibold">
              S/ {bebida.precio.toFixed(2)}
            </p>
            <button
              onClick={() => handleAgregarProducto(bebida)}
              className="px-10 py-3 bg-primary-500 rounded-2xl text-white hover:bg-primary-600"
            >
              ADD
            </button>
          </div>
        </article>
      ))}
      <Toaster richColors position="bottom-center" />
    </>
  );
}
