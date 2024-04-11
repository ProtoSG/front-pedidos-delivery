import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postExtra, updateExtra } from "../../../services/extra_service";
import ItemInput from "./ItemInput";

/* eslint-disable react/prop-types */
export default function ExtraForm({ edit, extra }) {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen_url, setImagen_url] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (edit && extra) {
      setNombre(extra?.nombre);
      setPrecio(extra?.precio);
      setImagen_url(extra?.imagen_url);
    }
  }, [extra, edit]);

  const handleChange = (e) => {
    switch (e.target.name) {
      case "Nombre":
        setNombre(e.target.value);
        break;
      case "Precio":
        setPrecio(e.target.value);
        break;
      case "Imagen":
        setImagen_url(e.target.value);
        break;
      default:
        break;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (edit) {
      await updateExtra(extra?.id, nombre, precio, imagen_url);
    } else {
      await postExtra({ nombre, precio, imagen_url });
    }
    navigate("/admin");
  };

  return (
    <form className="flex flex-col gap-4">
      <label className="flex flex-col">
        <ItemInput handleChange={handleChange} name="Nombre" value={nombre} />
      </label>
      <label className="flex flex-col">
        <ItemInput
          handleChange={handleChange}
          name="Precio"
          type="Number"
          value={precio}
        />
      </label>
      <label className="flex flex-col">
        <ItemInput
          handleChange={handleChange}
          name="Imagen"
          value={imagen_url}
        />
      </label>
      <div className="flex justify-end gap-4 mt-6">
        <button
          id="extras"
          onClick={onSubmit}
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
