/* eslint-disable react/prop-types */
import { Toaster, toast } from 'sonner';
import bebida_img from '../assets/maracuya.png';
import { addProduct } from '../services/agregar_producto';

export default function ListBebida({productos, setProductos, total, setTotal}) {
    const bebidas = [
        {
            id: 16,
            name: 'Maracuya Sour',
            price: 15.00,
            category: 'BEBIDA',
            descriptio : 'Plato bandera del Peru',
            image: bebida_img
        },
        {
            id: 17,
            name: 'Chilcano de pisco',
            price: 20.00,
            category: 'BEBIDA',
            descriptio : 'Plato bandera del Peru',
            image: bebida_img
        },
        {
            id: 18,
            name: 'Pisco Sour',
            price: 18.00,
            category: 'BEBIDA',
            descriptio : 'Plato bandera del Peru',
            image: bebida_img
        },
    ]

    const handleAgregarProducto = (producto) => {
        addProduct({producto, setProductos, setTotal, total, productos})
        toast.success('Producto agregado')
    }

  return (
    <>
    {
        bebidas.map((bebida) => (
            <article key={bebida.id} className="max-w-[400px] grid grid-cols-2 items-center py-4 mx-auto">
                <div className='size-40 col-span-1'>
                    <img src={bebida.image} alt={bebida.name} />
                </div>
                <div className="flex flex-col justify-center items-center gap-3  col-span-1">
                    <h3 className="text-xl font-semibold text-center">{bebida.name}</h3>
                    <p className="text-xl font-semibold">S/ {(bebida.price).toFixed(2)}</p>
                    <button onClick={() => handleAgregarProducto(bebida)} className='px-10 py-3 bg-primary-500 rounded-2xl text-white hover:bg-primary-600'>ADD</button>
                </div>
            </article>
            ))
    }
    <Toaster richColors position='bottom-center' />
    </>

  )
}
