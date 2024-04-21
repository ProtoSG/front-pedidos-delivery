/* eslint-disable react/prop-types */
import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip, Legend);
Chart.defaults.plugins.legend.position = "bottom";
Chart.defaults.plugins.legend.labels.boxWidth = 20;
Chart.defaults.plugins.legend.labels.boxHeight = 20;

export default function RankingExtras({ activeInterval }) {
  const [extras, setExtras] = useState(null);

  useEffect(() => {
    const extraDayData = [
      { nombre: "extra 1", cantidad: 30 },
      { nombre: "extra 2", cantidad: 20 },
      { nombre: "extra 3", cantidad: 10 },
    ];

    const extraWeekData = [
      { nombre: "extra 1", cantidad: 90 },
      { nombre: "extra 2", cantidad: 50 },
      { nombre: "extra 3", cantidad: 20 },
    ];

    const extrasData = new Map([
      ["1D", extraDayData],
      ["1S", extraWeekData],
    ]);

    const newExtrasData = extrasData.get(activeInterval);
    setExtras(newExtrasData);
  }, [activeInterval]);

  const labels = extras ? extras.map((item) => item.nombre) : [];
  const values = extras ? extras.map((item) => item.cantidad) : [];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        data: values,
        backgroundColor: ["#20546a", "#1e9cbc", "#afe7f2"],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 16,
          },
        },
      },
    },
  };

  return (
    <article className="col-span-1 row-span-1 border-2 border-gray-400 rounded-2xl px-6 py-4">
      <h2 className="text-lg font-semibold mb-5">Extras más comunes</h2>
      <div className="flex items-center justify-center h-[90%]">
        <Doughnut data={data} options={options} />
      </div>
    </article>
  );
}
