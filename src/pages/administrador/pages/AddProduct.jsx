import { useState } from "react";

function ItemImput({name}){
    return(
        <>
            <span className="px-2 pb-2">{name}:</span>
            <input type="text" placeholder={name} className="border-2 rounded-3xl px-2 py-2 focus:outline-none" />
        </>
    )
}

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
                                        <ItemImput name="Nombre"/>
                                    </label>
                                    <label className="col-span-1 flex flex-col">
                                        <ItemImput name="Precio"/>    
                                    </label>
                                    <label className="col-span-1 flex flex-col">
                                        <span className="px-2 pb-2">Categoria:</span>
                                        <select type="text" placeholder="Categoria" className="border-2 rounded-3xl px-2 py-2 focus:outline-none">
                                            {
                                                categorias.map((item) => (
                                                    <option key={item.id} value={item.name}>{item.name}</option>
                                                ))
                                            }
                                        </select>
                                    </label>
                                </div>
                                <label className="flex flex-col">
                                    <ItemImput name="Descripcion"/>    
                                </label>
                                <label className="flex flex-col">
                                    <ItemImput name="Imagen"/>    
                                </label>
                                <button className=" bg-primary-500 text-white rounded-2xl py-2">Agregar</button>
                            </form>
                        )
                    }
                    {
                        active === 'Categorias' && (
                            <form className="flex flex-col gap-4">
                                <label className="flex flex-col">
                                    <ItemImput name="Nombre"/>
                                </label>    
                                <button className="bg-primary-500 text-white rounded-2xl py-2">Agregar</button>
                            </form>
                        )
                    }
                    {
                        active === 'Extras' && (
                            <form className="flex flex-col gap-4">
                                <label className="flex flex-col">
                                    <ItemImput name="Nombre"/>
                                </label>    
                                <label className="flex flex-col">
                                    <ItemImput name="Precio"/>
                                </label>    
                                <label className="flex flex-col">
                                    <ItemImput name="Imagen"/>
                                </label>    
                                <button className="bg-primary-500 text-white rounded-2xl py-2">Agregar</button>
                            </form>
                        )
                    }
                </div>
            </section>
        </main>
    )
}
