import { useEffect, useState } from "react";
import { getCategorias } from "../services/categoria_service";

export default function useCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [loadingCategorias, setLoadingCategorias] = useState(false);
  const [errorCategorias, setErrorCategorias] = useState(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        setLoadingCategorias(true);
        setErrorCategorias(null);
        const data = await getCategorias();
        if (!Array.isArray(data)) {
          throw new Error("La respuesta de categorias no es un array válido");
        }
        setCategorias(data);
      } catch (error) {
        setErrorCategorias(error.message || "Error al obtener categorias");
        setCategorias([]);
      } finally {
        setLoadingCategorias(false);
      }
    };
    fetchCategorias();
  }, []);

  return { categorias, loadingCategorias, errorCategorias };
}
