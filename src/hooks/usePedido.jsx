import { useEffect, useState } from "react";


// pedido = [
//   productos = [
//       {
//         ...
//       },
//       {
//         ...
//       }
//   ],
//   extras = [
//     {
//       ...
//     }
//   ]
// ]

export default function usePedido() {
  const [pedido, setPedido] = useState([[], []]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const localProductos = localStorage.getItem("pedido");
    if (localProductos) {
      setPedido(JSON.parse(localProductos));
    }
    const localTotal = localStorage.getItem("total");
    if (localTotal) {
      setTotal(JSON.parse(localTotal));
    }
  }, []);
  console.log(pedido)
  return {
    pedido,
    total,
    setPedido,
    setTotal,
  };
}
