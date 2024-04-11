/* eslint-disable react/prop-types */
import { Toaster, toast } from "sonner";
import useProductos from "../hooks/useProductos";
import { addProduct } from "../services/agregar_producto";

export default function ListProducts({
  active,
  currentPage,
  setCurrentPage,
  pedido,
  setPedido,
  total,
  setTotal,
}) {
  const { productos, loadingProductos, errorProductos } = useProductos();

  const filterData =
    productos?.filter((producto) => producto.categoria.id === active) ?? [];
  const limitData = [];

  for (let i = 0; i < filterData.length; i += 3) {
    limitData.push(filterData.slice(i, i + 3));
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleAgregarProducto = (producto) => {
    addProduct({ producto, setPedido, setTotal, total, pedido });
    toast.success("Producto agregado");
  };
  return (
    <>
      {loadingProductos ? (
        <p className="text-center">Cargando...</p>
      ) : errorProductos ? (
        <p className="text-center">Hubo un error</p>
      ) : limitData.length === 0 ? (
        <p className="text-center">No hay productos</p>
      ) : (
        <>
          {limitData[currentPage]?.map((producto) => (
            <article
              key={producto.id}
              className="flex items-center py-4 justify-center"
            >
              <div className="size-40">
                <img
                  src={producto.imagen_url}
                  alt={producto.nombre}
                  className="rounded-3xl"
                />
              </div>
              <div className="flex flex-col gap-3 ml-14 ">
                <h1 className="font-bold text-xl">{producto.nombre}</h1>
                <p>{producto.descripcion}</p>
                <div className="flex items-center justify-between gap-20">
                  <button
                    onClick={() => handleAgregarProducto(producto)}
                    className="px-10 py-3 bg-primary-500 rounded-2xl text-white hover:bg-primary-600"
                  >
                    ADD
                  </button>
                  <span className="text-xl font-bold">
                    S/ {producto.precio.toFixed(2)}
                  </span>
                </div>
              </div>
            </article>
          ))}
          <div className="flex justify-center gap-6 mt-10">
            {limitData.map((pedido, index) => (
              <button
                key={index}
                className="size-12 bg-primary-500 rounded-full text-white hover:bg-primary-600"
                onClick={() => handlePageChange(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <Toaster richColors position="bottom-center" />
        </>
      )}
    </>
  );
}
