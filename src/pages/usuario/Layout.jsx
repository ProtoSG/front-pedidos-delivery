import { Outlet, NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  IconHome,
  IconUser,
  IconReceipt,
  IconLogout,
  IconMenu2,
  IconX,
  IconFish
} from "@tabler/icons-react";
import NotificacionesDropdown from "../../components/NotificacionesDropdown";
import useAuth from "../../hooks/useAuth";

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { usuario, logout, isLoading } = useAuth(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navItems = [
    { name: "Inicio", path: "/usuario", icon: <IconHome className="w-6 h-6" /> },
    { name: "Perfil", path: "/usuario/perfil", icon: <IconUser className="w-6 h-6" /> },
    { name: "Mis Pedidos", path: "/usuario/pedidos", icon: <IconReceipt className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar para desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-primary-600 text-white">
        <div className="p-4 flex items-center gap-4">
          <IconFish className="w-8 h-8" />
          <h1 className="text-xl font-semibold">Cevichería</h1>
        </div>

        <div className="flex-1 py-8">
          <nav className="space-y-2 px-4">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary-700 text-white"
                      : "text-white/80 hover:text-white hover:bg-primary-500"
                  }`
                }
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-primary-700">
          <button
            onClick={logout}
            className="flex items-center gap-4 px-4 py-3 w-full rounded-lg text-white/80 hover:text-white hover:bg-primary-500 transition-colors"
          >
            <IconLogout className="w-6 h-6" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="flex justify-between items-center px-4 py-3">
            <div className="flex items-center gap-4">
              {isMobile && (
                <button
                  onClick={toggleMenu}
                  className="text-gray-600 hover:text-gray-900"
                >
                  {menuOpen ? <IconX className="w-6 h-6" /> : <IconMenu2 className="w-6 h-6" />}
                </button>
              )}
              <Link to="/" className="text-primary-600 hover:text-primary-700 font-bold">
                Ir al Menú
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <NotificacionesDropdown />

              <div className="flex items-center gap-2">
                {!isLoading && usuario && (
                  <>
                    <div className="hidden md:block text-right">
                      <p className="text-sm font-medium text-gray-900">{usuario.nombre}</p>
                      <p className="text-xs text-gray-500">{usuario.email}</p>
                    </div>
                    <div className="w-10 h-10 bg-primary-200 text-primary-800 rounded-full flex items-center justify-center">
                      {usuario.nombre?.charAt(0).toUpperCase() || "U"}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Mobile menu */}
        {isMobile && menuOpen && (
          <div className="fixed inset-0 z-20 bg-gray-800/50 backdrop-blur-sm md:hidden">
            <div className="h-full w-64 bg-primary-600 text-white p-4">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <IconFish className="w-8 h-8" />
                  <h1 className="text-xl font-semibold">Cevichería</h1>
                </div>
                <button onClick={toggleMenu} className="text-white">
                  <IconX className="w-6 h-6" />
                </button>
              </div>

              <nav className="space-y-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-primary-700 text-white"
                          : "text-white/80 hover:text-white hover:bg-primary-500"
                      }`
                    }
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </NavLink>
                ))}
              </nav>

              <div className="mt-8 pt-4 border-t border-primary-700">
                <button
                  onClick={logout}
                  className="flex items-center gap-4 px-4 py-3 w-full rounded-lg text-white/80 hover:text-white hover:bg-primary-500 transition-colors"
                >
                  <IconLogout className="w-6 h-6" />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
