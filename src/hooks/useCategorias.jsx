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
        const categorias = await getCategorias();
        setCategorias(categorias);
      } catch (error) {
        setErrorCategorias(error.message);
      } finally {
        setLoadingCategorias(false);
      }
    };
    fetchCategorias();
  }, []);

  return { categorias, loadingCategorias, errorCategorias };
}
