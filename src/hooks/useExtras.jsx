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
        if (!Array.isArray(data)) {
          throw new Error("La respuesta de extras no es un array válido");
        }
        setExtras(data);
      } catch (error) {
        setErrorExtras(error.message || "Error al obtener extras");
        setExtras([]);
      } finally {
        setLoadingExtras(false);
      }
    };
    fetchExtras();
  }, []);

  return { extras, loadingExtras, errorExtras };
}
