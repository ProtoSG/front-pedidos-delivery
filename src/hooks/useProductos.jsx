import { useEffect, useState } from "react";
import { getProductos } from "../services/producto_service";

export default function useProductos() {
  const [productos, setProductos] = useState([]);
  const [loadingProductos, setLoadingProductos] = useState(true);
  const [errorProductos, setErrorProductos] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoadingProductos(true);
        setErrorProductos(null);
        const data = await getProductos();
        setProductos(data);
      } catch (error) {
        setErrorProductos(error);
      } finally {
        setLoadingProductos(false);
      }
    };
    fetchProductos();
  }, []);

  return { productos, loadingProductos, errorProductos };
}
