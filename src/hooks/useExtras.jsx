import { useEffect, useState } from "react";
import { getExtras } from "../services/extra_service";

export default function useExtras() {
  const [extras, setExtras] = useState([]);
  const [loadingExtras, setLoadingExtras] = useState(true);
  const [errorExtras, setErrorExtras] = useState(null);

  useEffect(() => {
    const fetchExtras = async () => {
      try {
        setLoadingExtras(true);
        setErrorExtras(null);
        const data = await getExtras();
        setExtras(data);
      } catch (error) {
        setErrorExtras(error);
      } finally {
        setLoadingExtras(false);
      }
    };
    fetchExtras();
  }, []);

  return { extras, loadingExtras, errorExtras };
}
