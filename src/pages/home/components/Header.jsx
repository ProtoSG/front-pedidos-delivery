/* eslint-disable react/prop-types */
import { IconShoppingBag, IconUserFilled } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import Logo from "../../../components/icons/Logo";
import Pedido from "./Pedido";

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
          <span onClick={handleOpen} className="">
            <IconUserFilled className="w-6 lg:w-10 h-auto text-white" />
          </span>
        </Link>
        <Logo className="fill-white w-32 lg:w-full" />
        <span
          onClick={handleOpen}
          className=" absolute right-8 cursor-pointer hover:scale-110 transition-all"
        >
          <IconShoppingBag className="size-12 lg:size-14 text-white" />
          <span className="text-white absolute -right-2 -bottom-1 bg-black size-6 lg:size-8 text-base lg:text-lg rounded-full flex justify-center items-center">
            {pedido[0]?.length}
          </span>
        </span>
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
