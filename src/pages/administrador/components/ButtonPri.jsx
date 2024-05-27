export default function ButtonPri({ nombre, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="transition bg-primary-500 text-white rounded-2xl py-2 hover:bg-primary-600 flex items-center justify-center px-10"
    >
      {children}
      {nombre}
    </button>
  )
}
