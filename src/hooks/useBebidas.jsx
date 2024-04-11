import useProductos from "./useProductos";

export default function useBebidas() {
  const { productos } = useProductos();

  const bebidas =
    productos?.filter((producto) => producto.categoria.nombre === "bebida") ??
    [];
  return { bebidas };
}
