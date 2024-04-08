/* eslint-disable react/prop-types */
import { IconChartInfographic, IconLayoutDashboard } from '@tabler/icons-react';
import { Link, useLocation } from "react-router-dom";
import pez from "../../../assets/pez1.png";
import Logo from "../../../components/icons/Logo";

function SpanItem({icon, isSelected}) {
    return (
        <span className={`w-12 h-12 rounded-xl flex justify-center items-center text-2xl group-hover:bg-primary-100 group-hover:text-primary-400
        ${isSelected ? ' text-primary-400' : 'bg-bg-200 text-text-200'}
        `}>{icon}</span>
    )
}

function ItemHeader({name, link, icon}) {

    const location = useLocation();
    const isSelected = location.pathname === `/admin${link}`;
    return (
        <li className='text-xl pb-6'>
            <Link to={`/admin${link}`} className={`flex justify-center lg:pl-8 lg:justify-normal py-2 items-center hover:bg-primary-100 group ${isSelected && 'bg-primary-100 border-r-4 border-primary-600'}`}>
                <SpanItem isSelected={isSelected} icon={icon}/>
                <span className="hidden lg:block ml-4">{name}</span>
            </Link>
        </li>
    )
}
export default function Header() {
  return (
    <header className="fixed h-[90dvh] border-r-2 border-primary-800 w-24 lg:w-auto">
        <div className='mb-10 lg:px-14'>
            <Logo className="fill-primary-400 w-12 lg:w-28 mx-auto  hidden lg:block" />
            <div className='lg:hidden flex justify-center'>
                <img src={pez} alt="logo-pez" className='w-7 '/>
                <img src={pez} alt="logo-pez" className='w-5 rotate-180'/>
            </div>
        </div>
        <nav>
            <ul>
                <ItemHeader  name='Dashboard' link='' icon={<IconLayoutDashboard/>} />
                <ItemHeader  name='Reporte' link='/report' icon={<IconChartInfographic/>}/>
            </ul>
        </nav>
    </header>
  )
}
