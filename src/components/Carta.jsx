import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import useCategorias from "../hooks/useCategorias";
import ListProducts from "./ListProducts";

Carta.propTypes = {
  pedido: PropTypes.any.isRequired,
  setPedido: PropTypes.func.isRequired,
  total: PropTypes.any.isRequired,
  setTotal: PropTypes.func.isRequired,
};

export default function Carta({ pedido, setPedido, total, setTotal }) {
  const [active, setActive] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const { categorias, loadingCategorias, errorCategorias } = useCategorias();

  useEffect(() => {
    if (categorias && categorias.length > 0) {
      setActive(categorias[0].id);
    }
  }, [categorias]);

  const handleClick = (id) => {
    setActive(id);
    setCurrentPage(0);
  };

  const filterCaterias =
    categorias?.filter((categoria) => categoria.nombre !== "bebida") ?? [];

  return (
    <section className="mx-auto lg:w-full col-span-2 lg:border-r-2 border-primary-950">
      <h1 className="text-primary-800 font-bold text-center text-2xl">
        Platos a la carta
      </h1>

      <div>
        {loadingCategorias && (
          <p className="text-center col-span-4">Cargando...</p>
        )}

        {!loadingCategorias && errorCategorias && (
          <p className="text-center text-base font-bold  col-span-4">
            Error al obtener Categorias: {errorCategorias}
          </p>
        )}

        {!loadingCategorias && !errorCategorias && filterCaterias.length === 0 && (
          <p className="text-center">No hay categorias</p>
        )}

        {!loadingCategorias && !errorCategorias && filterCaterias.length > 0 && (
          <div className="grid grid-cols-4 gap-4  text-center px-12 mt-8 mb-12 text-xl text-primary-800">
            {filterCaterias.map((categoria) => (
              <button
                key={categoria.id}
                onClick={() => handleClick(categoria.id)}
                className={`${
                  active === categoria.id
                    ? "border-b-4 border-primary-500"
                    : "border-[#f1f1f1]"
                } text-primary-800 transition border-b-2 `}
              >
                {categoria.nombre.toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </div>

      <ListProducts
        active={active}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pedido={pedido}
        setPedido={setPedido}
        total={total}
        setTotal={setTotal}
      />
    </section>
  );
}
