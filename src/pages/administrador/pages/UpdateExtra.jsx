import { useParams } from "react-router-dom";
import useExtras from "../../../hooks/useExtras";
import ExtraForm from "../components/ExtraForm";

export default function UpdateExtra() {
  const { id } = useParams();

  const { extras } = useExtras();

  const extra = extras.find((extra) => extra.id === Number(id));

  return (
    <main className="flex flex-col w-full px-10">
      <h1 className="text-3xl font-bold my-8">Editar Producto</h1>
      <section className="bg-white rounded-2xl px-6 py-10 shadow-lg">
        <ExtraForm edit extra={extra} />
      </section>
    </main>
  );
}
