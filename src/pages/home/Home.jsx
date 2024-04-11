import usePedido from "../../hooks/usePedido";
import Header from "./components/Header";
import Main from "./components/Main";

export default function Home() {
  const { pedido, setPedido, total, setTotal } = usePedido();

  return (
    <>
      <Header
        pedido={pedido}
        setPedido={setPedido}
        total={total}
        setTotal={setTotal}
      />
      <Main
        pedido={pedido}
        setPedido={setPedido}
        total={total}
        setTotal={setTotal}
      />
    </>
  );
}
