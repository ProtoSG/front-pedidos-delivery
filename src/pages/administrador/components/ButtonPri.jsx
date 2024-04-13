export default function ButtonPri({nombre, onClick}) {
  return (
    <button
        onClick={onClick}
        className="transition bg-primary-500 text-white rounded-2xl py-2 hover:bg-primary-600"
    >
        {nombre}
    </button>
  )
}
