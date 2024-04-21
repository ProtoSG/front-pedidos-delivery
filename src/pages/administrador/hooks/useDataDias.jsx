import { useEffect, useState } from "react";
import { getTotalDias } from "../../../services/pedido_service";

export default function useDataDias() {
  const [dataDias, setDataDias] = useState([]);
  const [loadingDataDias, setLoadingDataDias] = useState(false);
  const [errorDataDias, setErrorDataDias] = useState(null);

  useEffect(() => {
    async function fetchDataDias() {
      try {
        setLoadingDataDias(true);
        setErrorDataDias(null);
        const data = await getTotalDias();
        setDataDias(data);
      } catch (e) {
        setErrorDataDias(e.message);
      } finally {
        setLoadingDataDias(false);
      }
    }

    fetchDataDias();
  }, []);

  console.log(dataDias);

  return { dataDias, loadingDataDias, errorDataDias };
}
