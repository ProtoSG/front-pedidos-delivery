import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

const FAVORITOS_KEY = "favoritos";
const FavoritosContext = createContext();

export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState(() => {
    const stored = localStorage.getItem(FAVORITOS_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(FAVORITOS_KEY, JSON.stringify(favoritos));
  }, [favoritos]);

  const esFavorito = (productoId) => favoritos.includes(productoId);

  const agregarFavorito = (productoId) => {
    if (!favoritos.includes(productoId)) {
      setFavoritos([...favoritos, productoId]);
      toast.success("Se agregó a favoritos")
    }
  };

  const quitarFavorito = (productoId) => {
    setFavoritos(favoritos.filter((id) => id !== productoId));
    toast.warning("Se removió de favoritos")
  };

  return (
    <FavoritosContext.Provider value={{ favoritos, esFavorito, agregarFavorito, quitarFavorito, setFavoritos }}>
      {children}
    </FavoritosContext.Provider>
  );
}

export default function useFavoritos() {
  return useContext(FavoritosContext);
} 
