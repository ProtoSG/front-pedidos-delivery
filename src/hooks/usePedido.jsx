import { useEffect, useState } from "react"

// producto = {
//     id: 1,
//     nombre: 'Ceviche',
//     precio: 25.00,
//     categoria_id: 1,
//     cantidad: 1,
//     sub_total: 1,
// }

export default function usePedido() {
    const [productos, setProductos] = useState([])
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const localProductos = localStorage.getItem('productos')
        if(localProductos){
            setProductos(JSON.parse(localProductos))
        }
        const localTotal = localStorage.getItem('total')
        if(localTotal){
            setTotal(JSON.parse(localTotal))
        }
    }, [])

  return {
    productos,
    total,
    setProductos,
    setTotal,
  }
}
