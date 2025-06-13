import useFavoritos from "../../../hooks/useFavoritos.jsx";
import useProductos from "../../../hooks/useProductos";
import { IconHeartFilled } from "@tabler/icons-react";

export default function Favoritos() {
  const { favoritos, quitarFavorito } = useFavoritos();
  const { productos, loadingProductos, errorProductos } = useProductos();

  if (loadingProductos) return <p className="text-center">Cargando...</p>;
  if (errorProductos) return <p className="text-center font-bold">Error al obtener los Productos: {errorProductos}</p>;

  const productosFavoritos = productos.filter((p) => favoritos.includes(p.id));

  if (productosFavoritos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <IconHeartFilled className="text-red-300 w-16 h-16 mb-4" />
        <p className="text-center text-lg text-gray-500">No tienes productos favoritos.</p>
      </div>
    );
  }

  return (
    <section className="max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold text-primary-800 mb-6 flex items-center gap-2 justify-center">
        <IconHeartFilled className="text-red-500 w-8 h-8" /> Favoritos
      </h1>
      <div className="grid gap-6">
        {productosFavoritos.map((producto) => (
          <article
            key={producto.id}
            className="h-52 grid grid-cols-3 items-center py-4 justify-center px-4 bg-white rounded-2xl shadow"
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
                  onClick={() => quitarFavorito(producto.id)}
                  aria-label="Quitar de favoritos"
                >
                  <IconHeartFilled className="w-6 h-6" />
                </button>
              </div>
              <p>{producto.descripcion.substring(0, 80) + "..."}</p>
              <span className="text-base lg:text-xl font-bold mt-2">
                S/ {producto.precio.toFixed(2)}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
} 