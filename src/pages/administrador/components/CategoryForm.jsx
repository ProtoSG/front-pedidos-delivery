/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  postCategoria,
  updateCategoria,
} from "../../../services/categoria_service";
import ItemInput from "./ItemInput";

export default function CategoryForm({ edit, categoria }) {
  const [nombre, setNombre] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (edit && categoria) {
      setNombre(categoria?.nombre);
    }
  }, [categoria, edit]);

  const handleChange = (e) => {
    if (e.target.name === "Nombre") setNombre(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (edit) {
      await updateCategoria(categoria?.id, nombre);
    } else {
      await postCategoria({ nombre });
    }
    navigate("/admin");
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col">
        <ItemInput handleChange={handleChange} name="Nombre" value={nombre} />
      </label>
      <div className="flex justify-end gap-4 mt-6">
        <button
          id="categorias"
          className="px-4  bg-primary-500 text-white rounded-2xl py-3"
        >
          <>{edit ? "Editar" : "Agregar"}</>
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
