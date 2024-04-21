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

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function VentasCategoria({ activeInterval }) {
  const [categorias, setCategorias] = useState(null);

  useEffect(() => {
    const categoriaDayData = [
      { nombre: "Categoria 1", total: 900 },
      { nombre: "Categoria 2", total: 400 },
      { nombre: "Categoria 3", total: 700 },
      { nombre: "Categoria 4", total: 100 },
      { nombre: "Categoria 5", total: 300 },
    ];

    const categoriaWeekData = [
      { nombre: "Categoria 1", total: 2000 },
      { nombre: "Categoria 2", total: 1200 },
      { nombre: "Categoria 3", total: 100 },
      { nombre: "Categoria 4", total: 1600 },
      { nombre: "Categoria 5", total: 300 },
    ];

    const categoriasData = new Map([
      ["1D", categoriaDayData],
      ["1S", categoriaWeekData],
    ]);

    const newCategoriasData = categoriasData.get(activeInterval);
    setCategorias(newCategoriasData);
  }, [activeInterval]);

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
