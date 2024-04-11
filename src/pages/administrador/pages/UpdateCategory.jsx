import { useParams } from "react-router-dom";
import useCategorias from "../../../hooks/useCategorias";
import CategoryForm from "../components/CategoryForm";

export default function UpdateCategory() {
  const { id } = useParams();

  const { categorias } = useCategorias();

  const categoria = categorias.find((categoria) => categoria.id === Number(id));

  return (
    <main className="flex flex-col w-full px-10">
      <h1 className="text-3xl font-bold my-8">Editar Producto</h1>
      <section className="bg-white rounded-2xl px-6 py-10 shadow-lg">
        <CategoryForm edit categoria={categoria} />
      </section>
    </main>
  );
}
