/* eslint-disable react/prop-types */
import Bebida from "../../../components/Bebida";
import Carta from "../../../components/Carta";
import Panel from "../../../components/Panel";
import useCategorias from "../../../hooks/useCategorias";

export default function Main({ pedido, setPedido, total, setTotal }) {

  return (
    <main className="pt-36 lg:w-[1000px] mx-auto pb-20">
      <section className="mt-12">
        <Panel />
      </section>
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
    </main>
  );
}
