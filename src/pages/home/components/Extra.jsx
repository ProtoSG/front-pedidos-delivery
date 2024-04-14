import { IconX } from "@tabler/icons-react";
import { Toaster, toast } from "sonner";
import useExtras from "../../../hooks/useExtras";
import { addProduct } from "../../../services/agregar_producto";
import ButtonPri from "../../administrador/components/ButtonPri";

export default function Extra({ pedido, setPedido, total, setTotal }) {
  const { extras, loadingExtras, errorExtras } = useExtras();

  const closeModal = () => {
    const modal2 = document.getElementById("modal-2");
    modal2.close();
  };

  const handleAdd = (extra) => {
    addProduct({ extra, pedido, setPedido, total, setTotal });
    toast.success("Extra agregado");
  };

  return (
    <dialog
      id="modal-2"
      className={`rounded-2xl border-none px-10 py-3 transition-all backdrop:backdrop-blur-sm backdrop:bg-black/50 min-w-[500px] max-w-[680px] w-6/12 h-[560px] fixed`}
    >
      <div className="flex flex-col justify-between w-full h-full">
        <h1 className="text-2xl text-center text-primary-800 font-bold">
          Extras
        </h1>
        <span
          onClick={closeModal}
          className="absolute right-4 top-4 hover:scale-125 transition cursor-pointer"
        >
          <IconX />
        </span>
        <div className="flex flex-col gap-4 mt-8 h-4/5 overflow-auto pr-2">
          {loadingExtras ? (
            <p className="text-center">Cargando...</p>
          ) : errorExtras ? (
            <p className="text-center">Hubo un error</p>
          ) : extras.length === 0 ? (
            <p className="text-center">No hay extras</p>
          ) : (
            <>
              {extras.map((extra) => (
                <article
                  key={extra.id}
                  className="grid grid-cols-3 justify-center items-center"
                >
                  <h3>{extra.nombre}</h3>
                  <span>S/ {extra.precio.toFixed(2)}</span>
                  <ButtonPri
                    onClick={() => handleAdd(extra)}
                    nombre="Agregar"
                  />
                </article>
              ))}
            </>
          )}
        </div>
      </div>
      <Toaster richColors position="bottom-center" />
    </dialog>
  );
}
