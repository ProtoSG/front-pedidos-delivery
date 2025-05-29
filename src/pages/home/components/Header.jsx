import { IconShoppingBag, IconUserFilled } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import Logo from "../../../components/icons/Logo";
import Pedido from "./Pedido";
import PropTypes from "prop-types";

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

  return (
    <>
      <header className="h-24 lg:h-36 bg-primary-400 flex justify-center items-center fixed w-full z-10">
        <Link
          to={`/login`}
          className="absolute border-2 rounded-full p-2 hover:bg-primary-600 left-8 cursor-pointer hover:scale-110 transition-all"
        >
          <button onClick={handleOpen} className="" type="button">
            <IconUserFilled className="w-6 lg:w-10 h-auto text-white" />
          </button>
        </Link>
        <Logo className="fill-white w-32 lg:w-full" />
        <button
          onClick={handleOpen}
          className=" absolute right-8 cursor-pointer hover:scale-110 transition-all"
          type="button"
        >
          <IconShoppingBag className="size-12 lg:size-14 text-white" />
        </button>
      </header>
      <Pedido
        pedido={pedido}
        setPedido={setPedido}
        total={total}
        setTotal={setTotal}
      />
    </>
  );
}
