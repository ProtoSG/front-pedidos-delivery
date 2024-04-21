import { useEffect, useState } from "react";
import { getTotalMeses } from "../../../services/pedido_service";

export default function useDataMeses() {
  const [dataMeses, setDataMeses] = useState([]);
  const [loadingDataMeses, setLoadingDataMeses] = useState(false);
  const [errorDataMeses, setErrorDataMeses] = useState(null);

  useEffect(() => {
    async function fetchdataSemanas() {
      try {
        setLoadingDataMeses(true);
        setErrorDataMeses(null);
        const data = await getTotalMeses();
        setDataMeses(data);
      } catch (e) {
        setErrorDataMeses(e.message);
      } finally {
        setLoadingDataMeses(false);
      }
    }

    fetchdataSemanas();
  }, []);

  console.log("meses", dataMeses);

  return { dataMeses, loadingDataMeses, errorDataMeses };
}
