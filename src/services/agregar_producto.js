/* eslint-disable react/prop-types */

const actualizarLocalStorage = (productos, total) => {
    localStorage.setItem('productos', JSON.stringify(productos));
    localStorage.setItem('total', JSON.stringify(total));
    }

export const addProduct = ({producto, setProductos, setTotal, total, productos}) => {
    const existe = productos.find((p) => p.id === producto.id);
    let newProductos = [];
    if (existe) {
        newProductos = productos.map((p) => {
        if (p.id === producto.id) {
            return {
            ...p,
            quantity: p.quantity + 1,
            subtotal: (p.quantity + 1) * p.price,
            };
        }
        return p;
        });
        setProductos(newProductos);
        setTotal(total + producto.price);
    } else {
        const newProduct = {
        id: producto.id,
        name: producto.name,
        price: producto.price,
        category: producto.category,
        descriptio: producto.descriptio,  
        quantity: 1,
        subtotal: producto.price,
        };
        newProductos = [...productos, newProduct];
        setProductos(newProductos);
        setTotal(total + producto.price);

        actualizarLocalStorage(newProductos, total + producto.price);
    }
    }
