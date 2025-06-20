import { IconShoppingBag, IconUserFilled, IconHeart, IconUserCircle } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import Logo from "../../../components/icons/Logo";
import PropTypes from "prop-types";
import Favoritos from "./Favoritos";

Header.propTypes = {
  pedido: PropTypes.array.isRequired,
};

export default function Header({ pedido }) {
  const handleOpen = () => {
    const dialog = document.getElementById("modal");
    dialog.showModal();
  };
  const handleOpenFavoritos = () => {
    const dialog = document.getElementById("modal-favoritos");
    dialog.showModal();
  };

  const cartItemCount = pedido.length > 0 ? pedido[0].length + pedido[1].length : 0;

  return (
    <>
      <header className="h-24 lg:h-36 bg-primary-400 flex justify-center items-center fixed w-full z-10">
        <Link
          to={`/login`}
          className="absolute border-2 rounded-full p-2 hover:bg-primary-600 left-8 cursor-pointer hover:scale-110 transition-all"
        >
          <button onClick={handleOpen} className="" type="button">
            <IconUserCircle className="w-6 lg:w-10 h-auto text-white" />
          </button>
        </Link>
        <Logo className="fill-white w-32 lg:w-full" />
        <button
          onClick={handleOpen}
          className=" absolute right-8 cursor-pointer hover:scale-110 transition-all"
          type="button"
        >
          <IconShoppingBag className="size-12 lg:size-14 text-white" />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </button>
        <button
          onClick={handleOpenFavoritos}
          className="absolute right-24 cursor-pointer hover:scale-110 transition-all border-2 rounded-full p-2 hover:bg-primary-600"
          type="button"
        >
          <IconHeart className="w-6 lg:w-10 h-auto text-white" />
        </button>
      </header>
      <dialog id="modal-favoritos" className="backdrop:bg-black/30 backdrop:blur-sm rounded-2xl p-0 max-w-3xl w-full">
        <Favoritos />
        <form method="dialog" className="flex justify-center mt-4 mb-2">
          <button className="bg-primary-500 text-white rounded-2xl py-2 px-6">Cerrar</button>
        </form>
      </dialog>
    </>
  );
}
