/* eslint-disable react/prop-types */
import { useState } from "react";
import CategoryForm from "../components/CategoryForm";
import ExtraForm from "../components/ExtraForm";
import ProductForm from "../components/ProductForm";

const lista = [
  {
    id: 1,
    name: "Productos",
  },
  {
    id: 2,
    name: "Categorias",
  },
  {
    id: 3,
    name: "Extras",
  },
];

const AddProduct = () => {
  const [active, setActive] = useState("Productos");

  const handleClick = (e) => {
    setActive(e.target.innerText);
  };

  const renderForm = () => {
    switch (active) {
      case "Productos":
        return <ProductForm />;
      case "Categorias":
        return <CategoryForm />;
      case "Extras":
        return <ExtraForm />;
      default:
        return null;
    }
  };

  return (
    <main className="flex flex-col w-full px-10">
      <h1 className="text-3xl font-bold my-8">Agregar Producto</h1>
      <section className="bg-white rounded-2xl px-6 py-10 shadow-lg">
        <nav>
          <ul className="flex gap-6">
            {lista.map((item) => (
              <button
                key={item.id}
                onClick={handleClick}
                className={`transition ${
                  active === item.name
                    ? "text-primary-500 border-b-2 border-primary-500"
                    : "text-primary-800"
                }`}
              >
                {item.name}
              </button>
            ))}
          </ul>
        </nav>
        <div className="mt-8">{renderForm()}</div>
      </section>
    </main>
  );
};
export default AddProduct;
