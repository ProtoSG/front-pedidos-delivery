import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ItemInput from "./ItemInput";
import { updateAdmin } from "../../../services/admin_service";
import { login } from "../../../services/login_service";
import useUpdateAdmin from "../hooks/useUpdateAdmin";

export default function AdminForm({ admin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [errorAdmin, setErrorAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUsername(admin.username)
  }, [])

  const handleChange = (e) => {
    if (e.target.name === "Username") setUsername(e.target.value);
    if (e.target.name === "Password") setPassword(e.target.value);
    if (e.target.name === "CheckPassword") setCheckPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { error } = updateAdmin(username, checkPassword, password)
    if (error) {
      setErrorAdmin(error);
      return;
    }
    await login({ username, password });
    navigate("/admin/perfil");
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col">
        <ItemInput handleChange={handleChange} name="Username" value={username} />
        <ItemInput handleChange={handleChange} name="CheckPassword" />
        <ItemInput handleChange={handleChange} name="NewPassword" />
        {errorAdmin && <p className="text-red-500 text-center text-lg">{errorAdmin}</p>}
      </label>
      <div className="flex justify-end gap-4 mt-6">
        <button
          id="categorias"
          className="px-4  bg-primary-500 text-white rounded-2xl py-3"
        >
          Editar
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

