import { useState } from 'react';
import Header from './components/Header';
import Main from './components/Main';

export default function Home() {
  const [pedido, setPedido] = useState(() => {
    const savePedido = localStorage.getItem('pedido');
    return savePedido ? JSON.parse(savePedido) : [[], []];
  });
  const [total, setTotal] = useState(() => {
    const saveTotal = localStorage.getItem('total');
    return saveTotal ? JSON.parse(saveTotal) : 0;
  });

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
