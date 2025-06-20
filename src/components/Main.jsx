import PropTypes from "prop-types";
import Carta from "./Carta";
import Bebida from "../Bebida";
import Pedido from "../../pages/home/components/Pedido";

Main.propTypes = {
  pedido: PropTypes.array.isRequired,
  setPedido: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
  setTotal: PropTypes.func.isRequired,
};

export default function Main({ pedido, setPedido, total, setTotal }) {
  const openModal = () => {
    const modal = document.getElementById("modal");
    modal.showModal();
  };

  return (
    <main className="pt-24 lg:pt-36 lg:w-[1000px] mx-auto pb-20">
      <div className="flex justify-between items-center px-4 lg:px-0">
        <h1 className="text-primary-800 font-bold text-center text-2xl lg:text-4xl">
          Restaurante Piscis
        </h1>
        <button
          onClick={openModal}
          className="lg:hidden text-white bg-primary-500 rounded-2xl py-2 px-4 hover:bg-primary-600"
        >
          Ver Pedido
        </button>
      </div>
      <div className="lg:grid grid-cols-3 mt-12 mx-auto">
        <Carta
          pedido={pedido}
          setPedido={setPedido}
          total={total}
          setTotal={setTotal}
        />
        <Bebida
          pedido={pedido}
          setPedido={setPedido}
          total={total}
          setTotal={setTotal}
        />
      </div>
      <Pedido pedido={pedido} setPedido={setPedido} total={total} setTotal={setTotal} />
    </main>
  );
} 