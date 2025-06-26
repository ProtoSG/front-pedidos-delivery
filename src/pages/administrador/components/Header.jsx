import {
  IconChartInfographic,
  IconChevronLeft,
  IconChevronRight,
  IconHome,
  IconLayoutDashboard,
  IconLogout2,
  IconUser,
  IconShoppingBag,
} from "@tabler/icons-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import pez from "../../../assets/pez1.png";
import Logo from "../../../components/icons/Logo";
import { logout } from "../../../services/login_service";
import PropTypes from "prop-types";

SpanItem.propTypes = {
  icon: PropTypes.node.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

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

ItemHeader.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

function ItemHeader({ name, link, icon, onClick }) {
  const location = useLocation();
  const isSelected = location.pathname === `${link}`;
  return (
    <li className="text-xl pb-6">
      <Link
        onClick={onClick}
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
  const [active, setActive] = useState(false);
  const role = localStorage.getItem("userRole");

  const handleSalir = () => {
    logout();
    navigate("/");
  };

  const handleActive = () => {
    setActive(!active);
  };

  window.addEventListener("scroll", function () {
    const st_header = document.getElementById("switch-header");
    st_header.classList.toggle("bg-primary-200", window.scrollY > 0);
  });

  return (
    <>
      <button
        id="switch-header"
        onClick={handleActive}
        className={`lg:hidden  transition-all duration-150 left-8 top-4 size-10 flex items-center justify-center border-2 text-primary-600  border-primary-600 rounded-full fixed z-50`}
      >
        {active ? (
          <IconChevronLeft size={30} />
        ) : (
          <IconChevronRight size={30} />
        )}
      </button>
      <header
        className={`transition-all h-full lg:block lg:translate-x-0 fixed z-10 bg-[#f3f4f6]  py-20 lg:py-10 border-r-2 border-primary-800 w-24 lg:w-auto ${
          active ? "translate-x-0 w-24" : "-translate-x-full w-0"
        }`}
      >
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
              onClick={handleActive}
            />
            <ItemHeader
              name="Pedidos"
              link="/admin/pedidos"
              icon={<IconShoppingBag />}
              onClick={handleActive}
            />
            <ItemHeader
              name="Reporte"
              link="/admin/report"
              icon={<IconChartInfographic />}
              onClick={handleActive}
            />
            {role !== "admin" && (
              <ItemHeader
                name="Perfil"
                link="/admin/perfil"
                icon={<IconUser />}
                onClick={handleActive}
              />
            )}
            <ItemHeader name="Home" link="/" icon={<IconHome />} />
          </ul>
        </nav>
        <button
          onClick={handleSalir}
          className="text-xl w-full flex justify-center lg:pl-8 lg:justify-normal py-2 items-center hover:bg-primary-100 group"
        >
          <SpanItem icon={<IconLogout2 />} isSelected={false} />
          <span className="hidden lg:block ml-4">Salir</span>
        </button>
      </header>
    </>
  );
}
