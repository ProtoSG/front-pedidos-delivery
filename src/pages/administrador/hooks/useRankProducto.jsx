import { useEffect, useState } from "react";
import { getRankProducto } from "../../../services/pedido_producto";

export default function useRankProducto({ date }) {
  const [productos, setProductos] = useState();
  const [loadingProductos, setLoadingProductos] = useState();
  const [errorProductos, setErrorProductos] = useState();

  useEffect(() => {
    async function fetchProductos() {
      try {
        setLoadingProductos(true);
        setErrorProductos(null);
        const data = await getRankProducto({ date });
        console.log("RANKING: ", data)
        setProductos(data);
      } catch (e) {
        setErrorProductos(e.message);
      } finally {
        setLoadingProductos(false);
      }
    }

    fetchProductos();
  }, [date]);

  return { productos, loadingProductos, errorProductos };
}
