import { IconPencil } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import useAdmin from "../../../hooks/useAdmin";

export default function Perfil() {
  const { admin, loadingAdmin, errorAdmin } = useAdmin();

  if (loadingAdmin) return <h1>Cargando...</h1>;
  if (errorAdmin) return <h1>Hubo un error</h1>;

  return (
    <main className="flex flex-col w-full h-full px-10">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl lg:text-3xl font-bold my-8 ">Perfil</h1>
      </header>
      <div className=" w-full h-[90%] flex flex-col gap-8  ">
        <section className="bg-white rounded-2xl px-6 py-10 shadow-lg  w-full  p-6 flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <span className=" font-bold text-xl">Nombre de Usuario:</span>
            <span className="text-lg">{admin.username}</span>
          </div>
          <div className="flex gap-4 items-center">
            <span className=" font-bold text-xl">Contraseña: </span>
            <span className="text-lg flex gap-6 items-center">********</span>
          </div>
          <div className="flex justify-end">
            <Link
              to={"/admin/perfil/update"}
              className="px-6 py-2 text-white bg-primary-400 rounded-xl flex items-center gap-2 text-xl hover:bg-primary-500 transition-all"
            >
              <IconPencil className="size-8" />
              Cambiar Contraseña
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
