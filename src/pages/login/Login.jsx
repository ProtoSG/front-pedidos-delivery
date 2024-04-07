import Panel from "../../components/Panel";

export default function Login() {
  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <Panel/>
      <form action="" className="flex flex-col gap-4 w-80 mt-14">
        <input type="text" placeholder="Usuario..." className="text-xl py-2 px-4 rounded-3xl"/>
        <input type="password" placeholder="Contraseña..." className="text-xl py-2 px-4 rounded-3xl"/>
        <button className="mt-6 px-10 py-3 bg-primary-500 rounded-3xl text-white hover:bg-primary-600 text-xl">Ingresar</button>
      </form>
    </main>
  )
}
