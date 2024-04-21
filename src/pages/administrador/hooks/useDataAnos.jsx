import { useEffect, useState } from "react";
import { getTotalAnos } from "../../../services/pedido_service";

export default function useDataAnos() {
  const [dataAnos, setDataAnos] = useState([]);
  const [loadingDataAnos, setLoadingDataAnos] = useState(false);
  const [errorDataAnos, setErrorDataAnos] = useState(null);

  useEffect(() => {
    async function fetchdataSemanas() {
      try {
        setLoadingDataAnos(true);
        setErrorDataAnos(null);
        const data = await getTotalAnos();
        setDataAnos(data);
      } catch (e) {
        setErrorDataAnos(e.message);
      } finally {
        setLoadingDataAnos(false);
      }
    }

    fetchdataSemanas();
  }, []);

  console.log("años", dataAnos);

  return { dataAnos, loadingDataAnos, errorDataAnos };
}
