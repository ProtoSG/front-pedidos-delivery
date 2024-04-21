/* eslint-disable react/prop-types */
import {
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import useRankCategoria from "../hooks/useRankCategoria";

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function VentasCategoria({ activeInterval }) {
  const [categorias, setCategorias] = useState(null);

  const {categorias: categoriasDia} = useRankCategoria({date: 'dia'})
  const {categorias: categoriasSemana} = useRankCategoria({date: 'semana'})
  const {categorias: categoriasMes} = useRankCategoria({date: 'mes'})
  const {categorias: categoriasAno} = useRankCategoria({date: 'año'})
  
  useEffect(() => {

    const categoriasData = new Map([
      ["1D", categoriasDia],
      ["1S", categoriasSemana],
      ["1M", categoriasMes],
      ["1A", categoriasAno],
    ]);

    const newCategoriasData = categoriasData.get(activeInterval);
    setCategorias(newCategoriasData);
  }, [activeInterval, categoriasDia, categoriasSemana, categoriasMes, categoriasAno]);

  const labels = categorias ? categorias.map((item) => item.nombre) : [];
  const values = categorias ? categorias.map((item) => item.total) : [];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        data: values,
        backgroundColor: [
          "#afe7f2",
          "#78d4e8",
          "#2cb4d4",
          "#1e9cbc",
          "#1b7d9f",
          "#1d6681",
          "#20546a",
          "#1f475a",
          "#0f2d3d",
        ],
        borderColor: [
          "#afe7f2",
          "#78d4e8",
          "#2cb4d4",
          "#1e9cbc",
          "#1b7d9f",
          "#1d6681",
          "#20546a",
          "#1f475a",
          "#0f2d3d",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <article className="col-span-1 lg:col-span-2 row-span-1 border-2 border-gray-400 rounded-2xl px-6 py-4">
      <h2 className="text-lg font-semibold mb-5 ">Ventas por Categoría</h2>
      <div className="h-[80%] flex items-center justify-center w-full">
        <Bar data={data} />
      </div>
    </article>
  );
}
