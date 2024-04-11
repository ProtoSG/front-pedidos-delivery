import { useParams } from "react-router-dom";
import useProductos from "../../../hooks/useProductos";
import ProductForm from "../components/ProductForm";

export default function UpdateProduct() {
  const { id } = useParams();

  const { productos } = useProductos();

  const producto = productos.find((producto) => producto.id === Number(id));

  return (
    <main className="flex flex-col w-full px-10">
      <h1 className="text-3xl font-bold my-8">Editar Producto</h1>
      <section className="bg-white rounded-2xl px-6 py-10 shadow-lg">
        <ProductForm edit producto={producto} />
      </section>
    </main>
  );
}
