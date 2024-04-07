import { useState } from "react";

export default function AddProduct() {
    const [active, setActive] = useState('Productos');
    
    const handleClick = (e) => {
        setActive(e.target.innerText);
    }

    const lista = [
        {
            id: 1,
            name: 'Productos'
        },
        {
            id: 2,
            name: 'Categorias'
        },
        {
            id: 3,
            name: 'Extras'
        }
    ]

    return (
        <main className='flex flex-col w-full px-10'>
            <h1 className="text-3xl font-bold my-8">Agregar Producto</h1>
            <section className="bg-white rounded-2xl px-6 py-10 shadow-lg">
                <nav>
                    <ul className="flex gap-6">
                        {
                            lista.map((item) => (
                                <button key={item.id} onClick={handleClick} className={`transition ${active === item.name ? 'text-primary-500 border-b-2 border-primary-500' : 'text-primary-800'}`}>{item.name}</button>
                            ))
                        }
                    </ul>
                </nav>
                <div className="mt-8">
                    {
                        active === 'Productos' && (
                            <form className="flex flex-col gap-4">
                                <div className="grid grid-cols-3 gap-8">
                                    <label className="col-span-1 flex flex-col">
                                        <span>Nombre:</span>
                                        <input type="text" placeholder="Nombre" className="border-b-2 border-primary-500 focus:outline-none" />
                                    </label>
                                    <label className="col-span-1 flex flex-col">
                                        <span>Precio:</span>
                                        <input type="text" placeholder="Precio" className="border-b-2 border-primary-500 focus:outline-none" />
                                    </label>
                                    <label className="col-span-1 flex flex-col">
                                        <span>Categoría:</span>
                                        <input type="text" placeholder="Categoría" className="border-b-2 border-primary-500 focus:outline-none" />
                                    </label>
                                </div>
                                <label className="flex flex-col">
                                    <span>Descripción:</span>
                                    <input type="text" placeholder="Descripción" className="border-b-2 border-primary-500 focus:outline-none" />
                                </label>
                                <label className="flex flex-col">
                                    <span>Imagen:</span>
                                    <input type="text" placeholder="Imagen" className="border-b-2 border-primary-500 focus:outline-none" />
                                </label>
                                <button className="bg-primary-500 text-white rounded-2xl py-2">Agregar</button>
                            </form>
                        )
                    }
                    {
                        active === 'Categorias' && (
                            <form className="flex flex-col gap-4">
                                <input type="text" placeholder="Nombre" className="border-b-2 border-primary-500 focus:outline-none" />
                                <button className="bg-primary-500 text-white rounded-2xl py-2">Agregar</button>
                            </form>
                        )
                    }
                    {
                        active === 'Extras' && (
                            <form className="flex flex-col gap-4">
                                <input type="text" placeholder="Nombre" className="border-b-2 border-primary-500 focus:outline-none" />
                                <input type="text" placeholder="Precio" className="border-b-2 border-primary-500 focus:outline-none" />
                                <button className="bg-primary-500 text-white rounded-2xl py-2">Agregar</button>
                            </form>
                        )
                    }
                </div>
            </section>
        </main>
    )
}
