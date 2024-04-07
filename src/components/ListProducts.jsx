/* eslint-disable react/prop-types */
import { Toaster, toast } from 'sonner';
import { addProduct } from '../services/agregar_producto';
import { data } from './constants/data';

export default function ListProducts({active, currentPage, setCurrentPage, productos, setProductos, total, setTotal}) {
  
  const filterData = data.filter((producto) => producto.category === active);
  const limitData = [];
  
  for (let i = 0; i < filterData.length; i += 3) {
    limitData.push(filterData.slice(i, i + 3));
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };


  const handleAgregarProducto = (producto) => {
    addProduct({producto, setProductos, setTotal, total, productos});
    toast.success('Producto agregado');
  }

  return (
    <>
      {limitData[currentPage]?.map((producto) => (
            <article key={producto.id} className="flex items-center py-4 justify-center">
              <div className="size-40">
                <img src={producto.image} alt={producto.name} className="rounded-3xl" />
              </div>
              <div className="flex flex-col gap-3 ml-14 ">
                <h1 className="font-bold text-xl">{producto.name}</h1>
                <p>{producto.descriptio}</p>
                <div className="flex items-center justify-between gap-20">
                  <button onClick={() => handleAgregarProducto(producto)} className="px-10 py-3 bg-primary-500 rounded-2xl text-white hover:bg-primary-600">ADD</button>
                  <span className="text-xl font-bold">S/ {(producto.price).toFixed(2)}</span>
                </div>
              </div>
            </article>
          ))}
      <div className="flex justify-center gap-6 mt-10">
        {limitData.map((productos, index) => (
          <button key={index} className="size-12 bg-primary-500 rounded-full text-white hover:bg-primary-600" onClick={() => handlePageChange(index)}>{index + 1}</button>
        ))}
      </div>
      <Toaster richColors position='bottom-center' />
    </>
  );
}