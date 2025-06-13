import { createContext, useContext, useState, useEffect } from "react";

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
    }
  };

  const quitarFavorito = (productoId) => {
    setFavoritos(favoritos.filter((id) => id !== productoId));
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