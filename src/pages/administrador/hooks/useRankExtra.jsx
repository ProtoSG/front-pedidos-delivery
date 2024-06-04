import { useEffect, useState } from "react";
import { getRankExtra } from "../../../services/pedido_extra";

export default function useRankExtra({ date }) {
  const [extras, setExtras] = useState([]);
  const [loadingExtras, setLoadingExtras] = useState();
  const [errorExtras, setErrorExtras] = useState();

  useEffect(() => {
    async function fetchProductos() {
      try {
        setLoadingExtras(true);
        setErrorExtras(null);
        const data = await getRankExtra({ date });
        setExtras(data);
      } catch (e) {
        setErrorExtras(e.message);
      } finally {
        setLoadingExtras(false);
      }
    }

    fetchProductos();
  }, [date]);

  return { extras, loadingExtras, errorExtras };
}
