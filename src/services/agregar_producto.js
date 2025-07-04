/* eslint-disable react/prop-types */

/**
 * Actualiza el localStorage con el pedido y el total.
 * @param {Array} pedido - Pedido actual.
 * @param {number} total - Total del pedido.
 */
export const actualizarLocalStorage = (pedido, total) => {
    localStorage.setItem('pedido', JSON.stringify(pedido));
    localStorage.setItem('total', JSON.stringify(total));
}

/**
 * Agrega un producto o extra al pedido y actualiza el total.
 * @param {Object} params - Parámetros de la función.
 * @param {Object} params.extra - Extra a agregar (opcional).
 * @param {Object} params.producto - Producto a agregar (opcional).
 * @param {Function} params.setPedido - Setter de pedido.
 * @param {Function} params.setTotal - Setter de total.
 * @param {number} params.total - Total actual.
 * @param {Array} params.pedido - Pedido actual.
 */
export const addProduct = ({extra, producto, setPedido, setTotal, total, pedido}) => {
    let newPedido = [...pedido];
    if(extra){
        const exist = newPedido[1].find((p) => p.id === extra.id);
        if(exist){
            newPedido[1] = newPedido[1].map((p) => {
                if(p.id === extra.id){
                    return {
                        ...p,
                        cantidad: p.cantidad + 1,
                        subtotal: (p.cantidad + 1) * p.precio,
                    }
                }
                return p;
            })
        } else {
            newPedido[1].push({
                ...extra,
                cantidad: 1,
                subtotal: extra.precio,
            });
        }
        setTotal(total + extra.precio);
    } else {
        const exist = newPedido[0].find((p) => p.id === producto.id);
        if(exist){
            newPedido[0] = newPedido[0].map((p) => {
                if(p.id === producto.id){
                    return {
                        ...p,
                        cantidad: p.cantidad + 1,
                        subtotal: (p.cantidad + 1) * p.precio,
                    }
                }
                return p;
            })
        } else {
            newPedido[0].push({
                ...producto,
                cantidad: 1,
                subtotal: producto.precio,
            });
        }
        setTotal(total + producto.precio);
    }
    setPedido(newPedido);
    actualizarLocalStorage(newPedido, total + (extra ? extra.precio : producto.precio));
}

/**
 * Resta una unidad de un producto o extra del pedido.
 * @param {Object} params - Parámetros de la función.
 */
export const addCantidad = ({extra, producto, setPedido, setTotal, total, pedido }) => {
    let newPedido = [...pedido];
    if(extra){
        newPedido[1] = pedido[1].map((p) => {
            if (p.id === extra.id) {
                return {
                    ...p,
                    cantidad: p.cantidad + 1,
                    subtotal: (p.cantidad + 1) * p.precio,
                };
            }
            return p;
        });
        setTotal(total + extra.precio);
    } else {
        newPedido[0] = pedido[0].map((p) => {
            if (p.id === producto.id) {
                return {
                    ...p,
                    cantidad: p.cantidad + 1,
                    subtotal: (p.cantidad + 1) * p.precio,
                };
            }
            return p;
        });
        setTotal(total + producto.precio);
    }
    setPedido(newPedido);
    actualizarLocalStorage(newPedido, total + (extra ? extra.precio : producto.precio));
};


/**
 * Resta una unidad de un producto o extra del pedido.
 * @param {Object} params - Parámetros de la función.
 */
export const removeCantidad = ({producto, extra, setPedido, setTotal, total, pedido}) => {
    let newPedido = [...pedido];
    if(producto){
        newPedido[0] = pedido[0].map((p) => {
            if (p.id === producto.id) {
                return {
                    ...p,
                    cantidad: p.cantidad - 1,
                    subtotal: (p.cantidad - 1) * p.precio,
                };
            }
            return p;
        });
        setTotal(total - producto.precio);
    } else {
        newPedido[1] = pedido[1].map((p) => {
            if (p.id === extra.id) {
                return {
                    ...p,
                    cantidad: p.cantidad - 1,
                    subtotal: (p.cantidad - 1) * p.precio,
                };
            }
            return p;
        });
        setTotal(total - extra.precio);
    }

    setPedido(newPedido);
    actualizarLocalStorage(newPedido, total - (extra ? extra.precio : producto.precio));
}


/**
 * Elimina un producto o extra del pedido.
 * @param {Object} params - Parámetros de la función.
 */
export const removeProduct = ({producto, extra, setPedido, setTotal, total, pedido}) => {
    let newPedido = [...pedido];
    if(extra){
        newPedido[1] = pedido[1].filter((p) => p.id !== extra.id);
        const newTotal = total - extra.precio * extra.cantidad;
        setPedido(newPedido);
        setTotal(newTotal);
        actualizarLocalStorage(newPedido, newTotal);
    } else {
        newPedido[0] = pedido[0].filter((p) => p.id !== producto.id);
        const newTotal = total - producto.precio * producto.cantidad;
        setPedido(newPedido);
        setTotal(newTotal);
        actualizarLocalStorage(newPedido, newTotal);
    }
}

/**
 * Elimina todo el pedido y reinicia el total.
 * @param {Object} params - Parámetros de la función.
 */
export const deletePedido = ({setPedido, setTotal}) => {
    setPedido([[], []]);
    setTotal(0);
    actualizarLocalStorage([[], []], 0);
}

