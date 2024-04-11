/* eslint-disable react/prop-types */

export const actualizarLocalStorage = (pedido, total) => {
    localStorage.setItem('pedido', JSON.stringify(pedido));
    localStorage.setItem('total', JSON.stringify(total));
}

export const addProduct = ({producto, setPedido, setTotal, total, pedido}) => {
    const existe = pedido.find((p) => p.id === producto.id);
    let newPedido = [];
    if (existe) {
        newPedido = pedido.map((p) => {
        if (p.id === producto.id) {
            return {
            ...p,
            quantity: p.quantity + 1,
            subtotal: (p.quantity + 1) * p.price,
            };
        }
        return p;
        });
        setPedido(newPedido);
        setTotal(total + producto?.precio);

        actualizarLocalStorage(newPedido, total + producto?.precio);
    } else {
        const newProduct = {
        id: producto.id,
        name: producto.nombre,
        price: producto.precio,
        category: producto.categoria,
        descriptio: producto.descripcion,  
        quantity: 1,
        subtotal: producto.precio,
        };
        newPedido = [...pedido, newProduct];
        setPedido(newPedido);
        setTotal(total + producto?.precio);

        actualizarLocalStorage(newPedido, total + producto.precio);
    }
}

export const addCantidad = ({producto, setPedido, setTotal, total, pedido }) => {
    const newPedido = pedido.map((p) => {
      if (p.id === producto.id) {
        return {
          ...p,
          quantity: p.quantity + 1,
          subtotal: (p.quantity + 1) * p.price,
        };
      }
      return p;
    });
    setPedido(newPedido);
    setTotal(total + producto.price);

    actualizarLocalStorage(newPedido, total + producto.price);
};

export const removeCantidad = ({producto, setPedido, setTotal, total, pedido}) => {
    const newPedido = pedido.map((p) => {
        if (p.id === producto.id) {
        return {
            ...p,
            quantity: p.quantity - 1,
            subtotal: (p.quantity - 1) * p.price,
        };
        }
        return p;
    });
    setPedido(newPedido);
    setTotal(total - producto.price);

    actualizarLocalStorage(newPedido, total - producto.price);
    
}


export const removeProduct = ({producto, setPedido, setTotal, total, pedido}) => {
    const newPedido = pedido.filter((p) => p.id !== producto.id);
    const newTotal = total - producto.price * producto.quantity;
    setPedido(newPedido);
    setTotal(newTotal);
    actualizarLocalStorage(newPedido, newTotal);
}

export const deletePedido = ({setPedido, setTotal}) => {
    setPedido([]);
    setTotal(0);
    actualizarLocalStorage([], 0);
}