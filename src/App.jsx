/* eslint-disable react/prop-types */
import { Navigate, Route, Routes } from "react-router-dom";
import useAdmin from "./hooks/useAdmin";
import Layout from "./pages/administrador/Layout";
import { ProtectedRoute } from "./pages/administrador/components/ProtectedRoute";
import AddProduct from "./pages/administrador/pages/AddProduct";
import Dashboard from "./pages/administrador/pages/Dashboard";
import Reporte from "./pages/administrador/pages/Reporte";
import UpdateCategory from "./pages/administrador/pages/UpdateCategory";
import UpdateExtra from "./pages/administrador/pages/UpdateExtra";
import UpdateProduct from "./pages/administrador/pages/UpdateProduct";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";

function App() {
  const { user, setUser } = useAdmin();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/admin/*" element={<Layout />}>
        <Route element={<ProtectedRoute user={user} />}>
          <Route path="" element={<Dashboard />} />
          <Route path="report" element={<Reporte />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="update-categoria/:id" element={<UpdateCategory />} />
          <Route path="update-producto/:id" element={<UpdateProduct />} />
          <Route path="update-extra/:id" element={<UpdateExtra />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
export default App;
