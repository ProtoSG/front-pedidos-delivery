import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "./pages/administrador/Layout";
import { ProtectedRoute as AdminProtectedRoute } from "./pages/administrador/components/ProtectedRoute";
import AddProduct from "./pages/administrador/pages/AddProduct";
import AdminDashboard from "./pages/administrador/pages/Dashboard";
import Reporte from "./pages/administrador/pages/Reporte";
import UpdateCategory from "./pages/administrador/pages/UpdateCategory";
import UpdateExtra from "./pages/administrador/pages/UpdateExtra";
import UpdateProduct from "./pages/administrador/pages/UpdateProduct";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Registro from "./pages/registro/Registro";
import UpdatePerfil from "./pages/administrador/pages/UpdatePerfil";
import AdminPerfil from "./pages/administrador/pages/Perfil";
import FavoritosPage from "./pages/favoritos";
import LoginAdmin from "./pages/administrador/LoginAdmin";
import PedidosAdmin from "./pages/administrador/pages/PedidosAdmin";

// Usuario imports
import UserLayout from "./pages/usuario/Layout";
import ProtectedRoute from "./pages/usuario/components/ProtectedRoute";
import UserDashboard from "./pages/usuario/pages/Dashboard";
import UserPerfil from "./pages/usuario/pages/Perfil";
import Pedidos from "./pages/usuario/pages/Pedidos";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />

      {/* Admin Routes */}
      <Route path="/admin/*" element={<AdminLayout />}>
        <Route element={<AdminProtectedRoute />}>
          <Route path="" element={<AdminDashboard />} />
          <Route path="pedidos" element={<PedidosAdmin />} />
          <Route path="report" element={<Reporte />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="update-categoria/:id" element={<UpdateCategory />} />
          <Route path="update-producto/:id" element={<UpdateProduct />} />
          <Route path="update-extra/:id" element={<UpdateExtra />} />
          <Route path="perfil" element={<AdminPerfil />} />
          <Route path="perfil/update" element={<UpdatePerfil />} />
        </Route>
      </Route>

      <Route path="/admin/login" element={<LoginAdmin />} />

      {/* Usuario Routes */}
      <Route path="/usuario/*" element={<UserLayout />}>
        <Route element={<ProtectedRoute />}>
          <Route path="" element={<UserDashboard />} />
          <Route path="perfil" element={<UserPerfil />} />
          <Route path="pedidos" element={<Pedidos />} />
        </Route>
      </Route>

      <Route path="/favoritos" element={<FavoritosPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
export default App;
