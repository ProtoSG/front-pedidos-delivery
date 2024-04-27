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
    productos.filter((producto) => producto.categoria.id === active) ?? [];
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
        <p className="text-center font-bold">
          Error al obtener los Productos: {errorProductos}
        </p>
      ) : limitData.length === 0 ? (
        <p className="text-center">No hay productos</p>
      ) : (
        <>
          {limitData[currentPage]?.map((producto) => (
            <article
              key={producto.id}
              className=" h-52 grid grid-cols-3 items-center py-4 justify-center px-4"
            >
              <div className="col-span-1 h-full min-h-full ">
                <img
                  src={producto.imagen_url}
                  alt={producto.nombre}
                  className="rounded-3xl w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col ml-14 h-full justify-evenly col-span-2">
                <h1 className="font-bold text-xl">{producto.nombre}</h1>
                <p>{producto.descripcion.substring(0, 80) + "..."}</p>
                <div className="grid grid-cols-3 items-center">
                  <div className="col-span-2 pr-4">
                    <button
                      onClick={() => handleAgregarProducto(producto)}
                      className="py-3 w-full bg-primary-500 rounded-2xl text-white hover:bg-primary-600"
                    >
                      AGREGAR
                    </button>
                  </div>
                  <span className="col-span-1 text-center text-base lg:text-xl font-bold">
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
