import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ItemInput from "./ItemInput";
import { updateAdmin } from "../../../services/admin_service";
import { login } from "../../../services/login_service";

export default function AdminForm({ admin }) {
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [errorAdmin, setErrorAdmin] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "Nuevo Password") setPassword(e.target.value);
    if (e.target.name === "Antiguo Password") setCheckPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { mensaje, success } = await updateAdmin(checkPassword, password)

      if (mensaje) {
        setErrorAdmin(mensaje)
      } else if (success) {
        setErrorAdmin(null)
        const username = admin.username;
        await login({ username, password });
        navigate("/admin/perfil");
      }
    } catch (error) {
      setErrorAdmin(error.message)
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col">
        <ItemInput handleChange={handleChange} name="Antiguo Password" />
        <ItemInput handleChange={handleChange} name="Nuevo Password" />
        {errorAdmin && <p className="text-red-500 text-center text-lg">{errorAdmin}</p>}
      </label>
      <div className="flex justify-end gap-4 mt-6">
        <button
          id="categorias"
          className="px-4  bg-primary-500 text-white rounded-2xl py-3"
        >
          Confirmar
        </button>
        <Link
          to="/admin"
          className="px-4 bg-gray-400 text-white rounded-2xl py-3"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}

