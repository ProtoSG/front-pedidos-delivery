import {
  IconShoppingBag,
  IconUserFilled,
  IconHeart,
  IconUserCircle,
  IconSettings,
  IconChevronDown,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import Logo from "../../../components/icons/Logo";
import { useState } from "react";
import Pedido from "./Pedido";
import PropTypes from "prop-types";
import Favoritos from "./Favoritos";

Header.propTypes = {
  pedido: PropTypes.array.isRequired,
  setPedido: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
  setTotal: PropTypes.func.isRequired,
};

export default function Header({ pedido, setPedido, total, setTotal }) {
  const handleOpen = () => {
    const dialog = document.getElementById("modal");
    dialog.showModal();
  };
  const handleOpenFavoritos = () => {
    const dialog = document.getElementById("modal-favoritos");
    dialog.showModal();
  };

  const [showUserMenu, setShowUserMenu] = useState(false);
  const isAuthenticated = localStorage.getItem("token") ? true : false;
  const userRole = localStorage.getItem("userRole") || "usuario";
  const isAdmin = userRole === "admin";

  return (
    <section>
      <header className="h-24 lg:h-36 bg-primary-400 flex justify-center items-center fixed w-full z-10">
        {isAuthenticated ? (
          <div className="absolute left-8 cursor-pointer">
            <div
              className="border-2 rounded-full p-2 hover:bg-primary-600 hover:scale-110 transition-all flex items-center gap-1"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <IconUserCircle className="w-6 lg:w-10 h-auto text-white" />
              <IconChevronDown className="w-4 h-4 text-white" />
            </div>

            {showUserMenu && (
              <div className="absolute top-full mt-2 bg-white shadow-lg rounded-lg overflow-hidden z-50">
                {!isAdmin && (
                  <Link
                    to="/usuario"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Mi Perfil
                  </Link>
                )}
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center gap-2"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <IconSettings className="w-4 h-4" />
                    Panel Admin
                  </Link>
                )}
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="absolute border-2 rounded-full p-2 hover:bg-primary-600 left-8 cursor-pointer hover:scale-110 transition-all"
          >
            <IconUserFilled className="w-6 lg:w-10 h-auto text-white" />
          </Link>
        )}
        <Logo className="fill-white w-32 lg:w-full" />
        <button
          onClick={handleOpen}
          className=" absolute right-8 cursor-pointer hover:scale-110 transition-all"
          type="button"
        >
          <IconShoppingBag className="size-12 lg:size-14 text-white" />
        </button>
        <button
          onClick={handleOpenFavoritos}
          className="absolute right-24 cursor-pointer hover:scale-110 transition-all border-2 rounded-full p-2 hover:bg-primary-600"
          type="button"
        >
          <IconHeart className="w-6 lg:w-10 h-auto text-white" />
        </button>
      </header>
      <Pedido
        pedido={pedido}
        setPedido={setPedido}
        total={total}
        setTotal={setTotal}
      />
      <dialog
        id="modal-favoritos"
        className="backdrop:bg-black/30 backdrop:blur-sm rounded-2xl p-0 max-w-3xl w-full"
      >
        <Favoritos />
        <form method="dialog" className="flex justify-center mt-4 mb-2">
          <button className="bg-primary-500 text-white rounded-2xl py-2 px-6">
            Cerrar
          </button>
        </form>
      </dialog>
    </section>
  );
}
