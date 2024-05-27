import { useState } from "react"
import { IconEye } from '@tabler/icons-react';
import { IconEyeOff } from '@tabler/icons-react';
import { IconPencil } from '@tabler/icons-react';
import ButtonPri from "../components/ButtonPri";
import { Link } from "react-router-dom";

export default function Perfil({ user }) {
  const [activePassword, setActivePassword] = useState(false)

  const handleActive = () => {
    setActivePassword(!activePassword)
  }

  return (
    <main className="flex flex-col w-full h-full px-10">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl lg:text-3xl font-bold my-8 ">Perfil</h1>
      </header>
      <div className=" w-full h-[90%] flex flex-col gap-8  ">
        <section className="bg-white rounded-2xl px-6 py-10 shadow-lg  w-full  p-6 flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <span className=" font-bold text-xl">Nombre de Usuario:</span>
            <span className="text-lg">{user.username}</span>
          </div>
          <div className="flex gap-4 items-center">
            <span className=" font-bold text-xl">Contraseña: </span>
            <span className="text-lg flex gap-6 items-center">
              {activePassword ? user.password : '*'.repeat(user.password.length)}
              <span onClick={handleActive} className="cursor-pointer hover:scale-110 hover:text-primary-600 transition-all">
                {
                  activePassword
                    ? <IconEyeOff className="size-8" />
                    : <IconEye className="size-8" />
                }
              </span>
            </span>
          </div>
          <div className="flex justify-end">
            <Link to={`/admin/perfil/update/${user.id}`} className="px-6 py-2 text-white bg-primary-400 rounded-xl flex items-center gap-2 text-xl hover:bg-primary-500 transition-all" >
              <IconPencil className="size-8" />
              Editar
            </Link>
          </div>

        </section>
      </div>
    </main>
  )
}

