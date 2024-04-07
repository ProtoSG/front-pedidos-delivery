import usePedido from "../../hooks/usePedido";
import Header from "./components/Header";
import Main from "./components/Main";

export default function Home() {
  const {productos, setProductos, total, setTotal} = usePedido();

  return (
    <>
      <Header
        productos={productos}
        setProductos={setProductos}
        total={total}
        setTotal={setTotal}
      />
      <Main
        productos={productos}
        setProductos={setProductos}
        total={total}
        setTotal={setTotal}
      />
    </>
  )
}
