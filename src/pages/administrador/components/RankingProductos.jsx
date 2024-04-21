import { useEffect, useState } from "react";
import useRankProducto from "../hooks/useRankProducto";

/* eslint-disable react/prop-types */
function ItemProducto({ total, data }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth((data.total / total) * 100);
  }, [data.total, total]);

  return (
    <div>
      <div className="flex justify-between text-lg">
        <h3>{data.nombre}</h3>
        <span>S/ {data.total.toFixed(2)}</span>
      </div>
      <div className="flex w-full border-2 border-gray-400 rounded-full before:bg-gray-400 before:w-full before:h-1 before:-z-10 relative">
        <div
          className="bg-primary-400 border-2 border-primary-400 -top-[2px]   rounded-3xl -left-[1px] h-2 w-0 absolute z-10 transition-all duration-500"
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </div>
  );
}

export default function RankingProductos({ activeInterval }) {
  const [productos, setProductos] = useState(null);
  const [total, setTotal] = useState(0);

  const { productos: productosDia } = useRankProducto({ date: "dia" });
  const { productos: productosSemana } = useRankProducto({ date: "semana" });
  const { productos: productosMes } = useRankProducto({ date: "mes" });
  const { productos: productosAno } = useRankProducto({ date: "año" });

  useEffect(() => {
    const productsData = new Map([
      ["1D", productosDia],
      ["1S", productosSemana],
      ["1M", productosMes],
      ["1A", productosAno],
    ]);

    const totalData = new Map([
      [
        "1D",
        productosDia?.reduce(
          (totalSuma, producto) => totalSuma + producto.total,
          0
        ),
      ],
      [
        "1S",
        productosSemana?.reduce(
          (totalSuma, producto) => totalSuma + producto.total,
          0
        ),
      ],
      [
        "1M",
        productosMes?.reduce(
          (totalSuma, producto) => totalSuma + producto.total,
          0
        ),
      ],
      [
        "1A",
        productosAno?.reduce(
          (totalSuma, producto) => totalSuma + producto.total,
          0
        ),
      ],
    ]);

    const newProductosData = productsData.get(activeInterval);
    const newTotal = totalData.get(activeInterval);
    setProductos(newProductosData);
    setTotal(newTotal);
  }, [
    activeInterval,
    productosDia,
    productosSemana,
    productosMes,
    productosAno,
  ]);

  return (
    <article className="col-span-1 row-span-1 border-2  border-gray-400 rounded-2xl px-6 py-4 ">
      <h2 className="text-lg font-semibold mb-5 ">Ranking de Productos</h2>
      <span className="text-4xl font-bold text-primary-700">
        S/ {total?.toFixed(2)}
      </span>
      {productos ? (
        <div className="flex flex-col gap-6  h-4/6  mt-4 overflow-y-auto ">
          {productos.map((data, index) => (
            <ItemProducto key={index} total={total} index={index} data={data} />
          ))}
        </div>
      ) : (
        <p>No hay datos de productos disponibles</p>
      )}
    </article>
  );
}
