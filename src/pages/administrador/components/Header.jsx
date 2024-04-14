/* eslint-disable react/prop-types */
import {
  IconChartInfographic,
  IconLayoutDashboard,
  IconLogout2,
} from "@tabler/icons-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import pez from "../../../assets/pez1.png";
import Logo from "../../../components/icons/Logo";
import { logout } from "../../../services/login_service";

function SpanItem({ icon, isSelected }) {
  return (
    <span
      className={`w-12 h-12 rounded-xl flex justify-center items-center text-2xl group-hover:bg-primary-100 group-hover:text-primary-400
        ${isSelected ? " text-primary-400" : "bg-bg-200 text-text-200"}
        `}
    >
      {icon}
    </span>
  );
}

function ItemHeader({ name, link, icon }) {
  const location = useLocation();
  const isSelected = location.pathname === `${link}`;
  return (
    <li className="text-xl pb-6">
      <Link
        to={`${link}`}
        className={`flex justify-center lg:pl-8 lg:justify-normal py-2 items-center hover:bg-primary-100 group ${
          isSelected && "bg-primary-100 border-r-4 border-primary-600"
        }`}
      >
        <SpanItem isSelected={isSelected} icon={icon} />
        <span className="hidden lg:block ml-4">{name}</span>
      </Link>
    </li>
  );
}
export default function Header() {
  const navigate = useNavigate();

  const handleSalir = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="fixed z-10 bg-[#f3f4f6] h-[90dvh] border-r-2 border-primary-800 w-24 lg:w-auto">
      <div className="mb-10 lg:px-14">
        <Logo className="fill-primary-400 w-12 lg:w-28 mx-auto  hidden lg:block" />
        <div className="lg:hidden flex justify-center">
          <img src={pez} alt="logo-pez" className="w-7 " />
          <img src={pez} alt="logo-pez" className="w-5 rotate-180" />
        </div>
      </div>
      <nav>
        <ul>
          <ItemHeader
            name="Dashboard"
            link="/admin"
            icon={<IconLayoutDashboard />}
          />
          <ItemHeader
            name="Reporte"
            link="/admin/report"
            icon={<IconChartInfographic />}
          />
        </ul>
      </nav>
      <button
        onClick={handleSalir}
        className="text-xl w-full flex justify-center lg:pl-8 lg:justify-normal py-2 items-center hover:bg-primary-100 group"
      >
        <SpanItem icon={<IconLogout2 />} />
        <span className="hidden lg:block ml-4">Salir</span>
      </button>
    </header>
  );
}
