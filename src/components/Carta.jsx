/* eslint-disable react/prop-types */
import { useState } from "react";
import ListProducts from "./ListProducts";

export default function Carta({categorias, productos, setProductos, total, setTotal,}) {
    
    const [active, setActive] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    
    const handleClick = (id) => {
        setActive(id);
        setCurrentPage(0);
      }
    return (
        <section className="mx-auto lg:w-full col-span-2 lg:border-r-2 border-primary-950">
            <h1 className="text-primary-800 font-bold text-center text-2xl">Platos a la carta</h1>
        
            <div className="grid grid-cols-4 gap-4 text-center px-12 mt-8 mb-12 text-xl text-primary-800">
                {
                categorias.map((categoria) => (
                    <button key={categoria.id} onClick={() => handleClick(categoria.id)} className={`border-b-4 transition ${active === categoria.id ? '  border-primary-500' : 'border-[#f3f4f6]'}`}>{categoria.name}</button>
                ))
                }
                
            </div>
            
            <ListProducts 
                active={active} 
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage} 
                productos={productos}
                setProductos={setProductos}
                total={total}
                setTotal={setTotal}
            />
        </section>
  )
}
