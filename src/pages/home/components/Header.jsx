/* eslint-disable react/prop-types */
import { IconShoppingBag, IconUserFilled, IconX } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import Logo from "../../../components/icons/Logo";

export default function Header({productos, setProductos, total, setTotal}) {

  const handleOpen = () => {
    const dialog = document.getElementById('modal');
    dialog.showModal();
  };

  const handleClose = () => {
    const dialog = document.getElementById('modal');
    dialog.close();
  }

  return (
    <>
      <header className="h-36 bg-primary-400 flex justify-center items-center fixed w-full z-10">
        <Link to={`/login`} className='absolute border-2 rounded-full p-2 hover:bg-primary-600 left-8 cursor-pointer hover:scale-110 transition-all'>
            <span onClick={handleOpen} className=''>
              <IconUserFilled className='w-10 h-auto text-white'/>
            </span>
        </Link>
          <Logo className="fill-white" />
          <span onClick={handleOpen} className='absolute right-8 cursor-pointer hover:scale-110 transition-all'>
            <IconShoppingBag className='size-14 text-white'/>
            <span className='text-white absolute -right-2 -bottom-1 bg-black size-8 text-lg rounded-full flex justify-center items-center'>{productos.length}</span>
          </span>
      </header>
      <dialog id='modal' className={`rounded-2xl border-none px-10 py-3 transition-all backdrop:backdrop-blur-sm backdrop:bg-black/50 w-96 h-[460px] fixed`}>
        <div className='flex flex-col justify-between w-full h-full'>
          <h1 className='text-2xl text-center text-primary-800 font-bold'>Pedido</h1>
          <span onClick={handleClose} className='absolute right-4 top-4 hover:scale-125 transition cursor-pointer'><IconX/></span>
          <div className='flex flex-col gap-4 mt-8 h-4/5 overflow-auto pr-2'>
              {productos.map((producto) => (
                <div key={producto.id} className='grid grid-cols-3'>
                  <p className=''>{producto.name}</p>
                  <p className='text-center'>{producto.quantity}</p>
                  <p className='text-end'>S/ {producto.subtotal.toFixed(2)}</p>
                </div>
              ))}
          </div>
          <div className='flex flex-col gap-4 pt-4 mb-4 '>
            <div className='flex justify-between items-center px-2 text-xl'>
              <p>Total</p>
              <p>S/ {total.toFixed(2)}</p>
            </div>
            <button className='bg-primary-500 text-white rounded-2xl py-2 hover:bg-primary-600'>Pagar</button>
          </div>
        </div>
      </dialog>
    </>
  )
}
