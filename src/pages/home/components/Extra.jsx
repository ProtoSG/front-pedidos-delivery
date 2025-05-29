import { IconX } from "@tabler/icons-react";
import { Toaster, toast } from "sonner";
import useExtras from "../../../hooks/useExtras";
import { addProduct } from "../../../services/agregar_producto";
import ButtonPri from "../../administrador/components/ButtonPri";
import PropTypes from "prop-types";

Extra.propTypes = {
  pedido: PropTypes.any.isRequired,
  setPedido: PropTypes.func.isRequired,
  total: PropTypes.any.isRequired,
  setTotal: PropTypes.func.isRequired,
};

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
      className={`rounded-2xl border-none px-10 py-3 transition-all backdrop:backdrop-blur-sm backdrop:bg-black/50 w-[95%]  max-w-[500px] h-[560px] fixed`}
    >
      <div className="flex flex-col justify-between w-full h-full">
        <h1 className="text-2xl text-center text-primary-800 font-bold">
          Extras
        </h1>
        <button
          onClick={closeModal}
          className="absolute right-4 top-4 hover:scale-125 transition cursor-pointer"
          type="button"
        >
          <IconX />
        </button>
        <div className="flex flex-col gap-4 mt-8 h-4/5 overflow-auto pr-2">
          {(() => {
            if (loadingExtras) {
              return <p className="text-center">Cargando...</p>;
            } else if (errorExtras) {
              return <p className="text-center">Hubo un error</p>;
            } else if (!extras || extras.length === 0) {
              return <p className="text-center">No hay extras</p>;
            } else {
              return (
                <div>
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
                </div>
              );
            }
          })()}
        </div>
      </div>
      <Toaster richColors position="bottom-center" />
    </dialog>
  );
}
