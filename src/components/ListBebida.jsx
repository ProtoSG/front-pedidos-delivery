import PropTypes from "prop-types";
import useBebidas from "../hooks/useBebidas";
import { addProduct } from "../services/agregar_producto";
import { toast, Toaster } from "sonner";

ListBebida.propTypes = {
  pedido: PropTypes.any.isRequired,
  setPedido: PropTypes.func.isRequired,
  total: PropTypes.any.isRequired,
  setTotal: PropTypes.func.isRequired,
};

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
          className="max-w-[400px] h-52  flex justify-center lg:grid grid-cols-2 items-center py-4 mx-auto"
        >
          <div className="size-40 col-span-1 p-2">
            <img
              src={bebida.imagen_url}
              alt={bebida.nombre}
              className="rounded-3xl w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-evenly h-full p-2   items-center col-span-1">
            <h3 className="text-xl font-semibold text-center">
              {bebida.nombre}
            </h3>
            <p className="text-xl font-semibold">
              S/ {bebida.precio.toFixed(2)}
            </p>
            <button
              onClick={() => handleAgregarProducto(bebida)}
              className="px-4 py-3 bg-primary-500 rounded-2xl text-white hover:bg-primary-600"
            >
              AGREGAR
            </button>
          </div>
        </article>
      ))}
      <Toaster richColors position="bottom-center" />
    </>
  );
}
