import { useState } from "react";
import RankingExtras from "../components/RankingExtras";
import RankingProductos from "../components/RankingProductos";
import SimpleSwitcher from "../components/SimpleSwitcher";
import Venta from "../components/Venta";
import VentasCategoria from "../components/VentasCategoria";

export default function Reporte() {
  const [activeInterval, setActiveInterval] = useState("1D");

  return (
    <main className="flex flex-col w-full h-full px-10">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl lg:text-3xl font-bold my-8 ">Reporte</h1>
        <SimpleSwitcher
          items={["1D", "1S", "1M", "1A"]}
          activeItem={activeInterval}
          setActiveInterval={setActiveInterval}
        />
      </header>
      <div className="w-full h-[90%] flex flex-col gap-8 lg:grid lg:grid-cols-3 grid-rows-4 lg:grid-rows-2 ">
        <Venta activeInterval={activeInterval} />
        <RankingProductos activeInterval={activeInterval} />
        <RankingExtras activeInterval={activeInterval} />
        <VentasCategoria activeInterval={activeInterval} />
      </div>
    </main>
  );
}
