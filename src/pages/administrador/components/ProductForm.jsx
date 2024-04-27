/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCategorias from "../../../hooks/useCategorias";
import {
  postProducto,
  updateProducto,
} from "../../../services/producto_service";
import ItemInput from "./ItemInput";

export default function ProductForm({ edit, producto }) {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria_id, setCategoria_id] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen_url, setImagen_url] = useState("");

  const { categorias } = useCategorias();

  const navigate = useNavigate();

  useEffect(() => {
    if (edit && producto) {
      setNombre(producto?.nombre);
      setPrecio(producto?.precio);
      setCategoria_id(producto?.categoria.id);
      setDescripcion(producto?.descripcion);
      setImagen_url(producto?.imagen_url);
    }
  }, [producto, edit]);

  const handleChange = (e) => {
    switch (e.target.name) {
      case "Nombre":
        setNombre(e.target.value);
        break;
      case "Precio":
        setPrecio(e.target.value);
        break;
      case "Categoria":
        setCategoria_id(e.target.value);
        break;
      case "Descripcion":
        setDescripcion(e.target.value);
        break;
      case "Imagen":
        setImagen_url(e.target.value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (categorias && categorias.length > 0) {
      setCategoria_id(categorias[0].id);
    }
  }, [categorias]);

  const onSubmit = async (e) => {
    console.log(producto);
    e.preventDefault();
    if (edit) {
      await updateProducto(
        producto?.id,
        nombre,
        precio,
        categoria_id,
        descripcion,
        imagen_url
      );
    } else {
      await postProducto({
        nombre,
        precio,
        categoria_id,
        descripcion,
        imagen_url,
      });
    }
    navigate("/admin");
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="md:grid grid-cols-3 gap-8">
        <label className="col-span-1 flex flex-col">
          <ItemInput handleChange={handleChange} name="Nombre" value={nombre} />
        </label>
        <label className="col-span-1 flex flex-col">
          <ItemInput
            handleChange={handleChange}
            name="Precio"
            type="Number"
            value={precio}
          />
        </label>
        <label className="col-span-1 flex flex-col">
          <span className="px-2 pb-2 mt-4">Categoria:</span>
          <select
            type="text"
            placeholder="Categoria"
            name="Categoria"
            onChange={handleChange}
            value={categoria_id}
            className="border-2 rounded-3xl px-2 py-2 focus:outline-none"
          >
            {categorias?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nombre}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="flex flex-col">
        <ItemInput
          handleChange={handleChange}
          name="Descripcion"
          value={descripcion}
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
          id="productos"
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
