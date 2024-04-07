/* eslint-disable react/prop-types */
import Bebida from "../../../components/Bebida";
import Carta from "../../../components/Carta";
import Panel from "../../../components/Panel";

export default function Main({productos, setProductos, total, setTotal}) {

  const categorias = [
    {
      id: 1,
      name: 'ENTRADA',
    },
    {
      id: 2,
      name: 'PERU',
    },
    {
      id: 3,
      name: 'KIDS'
    },
    {
      id: 4,
      name: 'AUTOR'
    }
  ]


  

  return (
    <main className="pt-36 lg:w-[1000px] mx-auto pb-20">
      <section className="mt-12">
        <Panel/>
      </section>
      <div className="lg:grid grid-cols-3 mt-12 mx-auto">
        <Carta
          categorias={categorias}
          productos={productos}
          setProductos={setProductos}
          total={total}
          setTotal={setTotal}
        />
        <Bebida
          productos={productos}
          setProductos={setProductos}
          total={total}
          setTotal={setTotal}
        />
      </div>
    </main>
  )
}
