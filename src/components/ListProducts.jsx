import PropTypes from "prop-types";
import { Toaster, toast } from "sonner";
import useProductos from "../hooks/useProductos";
import { addProduct } from "../services/agregar_producto";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import useFavoritos from "../hooks/useFavoritos.jsx";

ListProducts.propTypes = {
  active: PropTypes.any.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  pedido: PropTypes.any.isRequired,
  setPedido: PropTypes.func.isRequired,
  total: PropTypes.any.isRequired,
  setTotal: PropTypes.func.isRequired,
  search: PropTypes.string,
};

export default function ListProducts({
  active,
  currentPage,
  setCurrentPage,
  pedido,
  setPedido,
  total,
  setTotal,
  search = "",
}) {
  const { productos, loadingProductos, errorProductos } = useProductos();
  const { favoritos, esFavorito, agregarFavorito, quitarFavorito } = useFavoritos();

  if (loadingProductos) {
    return <p className="text-center">Cargando...</p>;
  }

  if (errorProductos) {
    return (
      <p className="text-center font-bold">
        Error al obtener los Productos: {errorProductos}
      </p>
    );
  }

  if (!productos || productos.length === 0) {
    return <p>No hay productos</p>;
  }

  let filterData = productos.filter((producto) => producto.categoria.id === active);
  if (search.trim() !== "") {
    const searchLower = search.toLowerCase();
    filterData = filterData.filter(
      (producto) =>
        producto.nombre.toLowerCase().includes(searchLower) ||
        producto.categoria.nombre.toLowerCase().includes(searchLower)
    );
  }

  const limitData = [];
  for (let i = 0; i < filterData.length; i += 3) {
    limitData.push(filterData.slice(i, i + 3));
  }

  if (limitData.length === 0) {
    return <p className="text-center">No se encontró ningún producto.</p>;
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
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-xl">{producto.nombre}</h1>
              <button
                className="ml-2 text-red-500 hover:scale-125 transition"
                onClick={() =>
                  esFavorito(producto.id)
                    ? quitarFavorito(producto.id)
                    : agregarFavorito(producto.id)
                }
                aria-label={esFavorito(producto.id) ? "Quitar de favoritos" : "Agregar a favoritos"}
              >
                {esFavorito(producto.id) ? (
                  <IconHeartFilled className="w-6 h-6" />
                ) : (
                  <IconHeart className="w-6 h-6" />
                )}
              </button>
            </div>
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
        {limitData.map((page, index) => (
          <button
            key={page[0]?.id ?? `page-${index}`}
            className="size-12 bg-primary-500 rounded-full text-white hover:bg-primary-600"
            onClick={() => handlePageChange(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <Toaster richColors position="bottom-center" />
    </>
  );
}
