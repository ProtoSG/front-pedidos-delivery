import { useEffect, useState } from "react";
import { getTotalSemanas } from "../../../services/pedido_service";

export default function useDataSemanas() {
  const [dataSemanas, setDataSemanas] = useState([]);
  const [loadingDataSemanas, setLoadingDataSemanas] = useState(false);
  const [errorDataSemanas, setErrorDataSemanas] = useState(null);

  useEffect(() => {
    async function fetchdataSemanas() {
      try {
        setLoadingDataSemanas(true);
        setErrorDataSemanas(null);
        const data = await getTotalSemanas();
        setDataSemanas(data);
      } catch (e) {
        setErrorDataSemanas(e.message);
      } finally {
        setLoadingDataSemanas(false);
      }
    }

    fetchdataSemanas();
  }, []);

  console.log("semanas", dataSemanas);

  return { dataSemanas, loadingDataSemanas, errorDataSemanas };
}
