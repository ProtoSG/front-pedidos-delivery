/* eslint-disable react/prop-types */
import ListBebida from "./ListBebida";

export default function Bebida({ pedido, setPedido, total, setTotal }) {
  return (
    <aside className="col-span-1 lg:ml-6 mx-auto ">
      <h1 className="text-primary-800 font-bold text-center text-2xl mt-8 mb-12">
        Bebidas Recomendadas
      </h1>
      <ListBebida
        pedido={pedido}
        setPedido={setPedido}
        total={total}
        setTotal={setTotal}
      />
    </aside>
  );
}
