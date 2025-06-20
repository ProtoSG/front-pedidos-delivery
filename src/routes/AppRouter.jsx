import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

// Importar páginas
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Layout from '../pages/administrador/Layout';
import Dashboard from '../pages/administrador/pages/Dashboard';
import Reporte from '../pages/administrador/pages/Reporte';
import AddProduct from '../pages/administrador/pages/AddProduct';
import UpdateCategory from '../pages/administrador/pages/UpdateCategory';
import UpdateProduct from '../pages/administrador/pages/UpdateProduct';
import UpdateExtra from '../pages/administrador/pages/UpdateExtra';
import Perfil from '../pages/administrador/pages/Perfil';
import UpdatePerfil from '../pages/administrador/pages/UpdatePerfil';
import FavoritosPage from '../pages/favoritos';

// Componente para proteger rutas
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Cargando...</div>; // O un spinner
  }

  return user ? children : <Navigate to="/login" />;
};

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/favoritos" element={<FavoritosPage />} />

      {/* Rutas de Administrador Protegidas */}
      <Route 
        path="/admin/*" 
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="" element={<Dashboard />} />
        <Route path="report" element={<Reporte />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="update-categoria/:id" element={<UpdateCategory />} />
        <Route path="update-producto/:id" element={<UpdateProduct />} />
        <Route path="update-extra/:id" element={<UpdateExtra />} />
        <Route path="perfil" element={<Perfil />} />
        <Route path="perfil/update" element={<UpdatePerfil />} />
      </Route>
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
} 