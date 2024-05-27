import { useParams } from "react-router-dom"
import { getAdminById } from "../../../services/admin_service"
import AdminForm from "../components/AdminForm"
import useAdmin from "../../../hooks/useAdmin"

export default function UpdatePerfil() {

  const { user: admin } = useAdmin()

  return (
    <main className="flex flex-col w-full px-10">
      <h1 className="text-3xl font-bold my-8">Editar Perfil</h1>
      <section className="bg-white rounded-2xl px-6 py-10 shadow-lg">
        <AdminForm admin={admin} />
      </section>
    </main>
  )
}

