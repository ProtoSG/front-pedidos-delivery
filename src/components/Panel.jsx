import pez from '../assets/pez1.png';
import Logo from './icons/Logo';

export default function Panel() {
  return (
    <section className='flex justify-center items-center gap-8'>
        <img src={pez} alt="logo-pez" className='w-20 md:w-auto' />
        <Logo className={`fill-primary-400 w-52 md:w-80 h-auto`} />
        <img src={pez} alt="logo-pez" className='rotate-180 w-20 md:w-auto'/>
    </section>
  )
}
