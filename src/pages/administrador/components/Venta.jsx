/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import useDataAnos from "../hooks/useDataAnos";
import useDataDias from "../hooks/useDataDias";
import useDataMeses from "../hooks/useDataMeses";
import useDataSemanas from "../hooks/useDataSemanas";
import ChartArea from "./ChartArea";

export default function Venta({ activeInterval }) {
  const [chart, setChart] = useState(null);
  const [areaSeries, setAreaSeries] = useState(null);
  const [nombre, setNombre] = useState(null);
  const [total, setTotal] = useState(0);

  const { dataDias: dayData } = useDataDias();
  const { dataSemanas: weekData } = useDataSemanas();
  const { dataMeses: monthData } = useDataMeses();
  const { dataAnos: yearData } = useDataAnos();

  console.log(dayData);

  useEffect(() => {
    const seriesData = new Map([
      ["1D", dayData],
      ["1S", weekData],
      ["1M", monthData],
      ["1A", yearData],
    ]);

    const nombreFecha = new Map([
      ["1D", "del Día"],
      ["1S", "de la Semana"],
      ["1M", "del Mes"],
      ["1A", "del Año"],
    ]);

    const totalFecha = new Map([
      ["1D", dayData[dayData.length - 1]?.value],
      ["1S", weekData[weekData.length - 1]?.value],
      ["1M", monthData[monthData.length - 1]?.value],
      ["1A", yearData[yearData.length - 1]?.value],
    ]);

    setNombre(nombreFecha.get(activeInterval));
    setTotal(totalFecha.get(activeInterval));

    if (chart && areaSeries) {
      areaSeries.setData(seriesData.get(activeInterval));
      chart?.timeScale().fitContent();
    }
  }, [
    activeInterval,
    chart,
    areaSeries,
    dayData,
    monthData,
    yearData,
    weekData,
  ]);

  return (
    <article className="col-span-1 lg:col-span-2 row-span-1 border-2 grid grid-rows-7 grid-cols-1 border-gray-400 rounded-2xl px-6 py-4">
      <header className="row-span-2 ">
        <h2 className="text-lg font-semibold mb-3 ">Venta {nombre}</h2>
        <span className="text-4xl font-bold text-primary-700">
          S/ {total?.toFixed(2)}
        </span>
      </header>
      <main className="row-span-5 ">
        <ChartArea setChart={setChart} setAreaSeries={setAreaSeries} />
      </main>
    </article>
  );
}
