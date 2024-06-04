import AdminForm from "../components/AdminForm"
import useAdmin from "../../../hooks/useAdmin"

export default function UpdatePerfil() {

  const { admin, loadingAdmin, errorAdmin } = useAdmin()

  if (loadingAdmin) return <h1>Cargando...</h1>
  if (errorAdmin) return <h1>Hubo un error</h1>

  return (
    <main className="flex flex-col w-full px-10">
      <h1 className="text-3xl font-bold my-8">Editar Perfil</h1>
      <section className="bg-white rounded-2xl px-6 py-10 shadow-lg">
        <AdminForm admin={admin} />
      </section>
    </main>
  )
}

