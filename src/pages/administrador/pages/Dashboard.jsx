import { IconPlus } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import useCategorias from "../../../hooks/useCategorias";
import useExtras from "../../../hooks/useExtras";
import useProductos from "../../../hooks/useProductos";
import ActionButtons from "../components/ActionsButtons";
import Table from "../components/Table";

// Función para crear columnas de DataTable
const createColumns = (keys) =>
  keys.map((key) => ({
    name: key,
    selector: (row) => row[key.toLowerCase()],
    compact: true,
    sortable: true,
    center: true,
    width: key === "ID" || key === "Category" || key === "Price" ? "15%" : "",
    minWidth: key === "Acciones" ? "120px" : "",
  }));

const addActionsButtons = (data, tabla) => {
  return (
    data.map((item) => ({
      ...item,

      acciones: <ActionButtons data={item} tabla={tabla} />,
    })) ?? []
  );
};

export default function Dashboard() {
  const productColumns = createColumns([
    "ID",
    "Nombre",
    "Precio",
    "Categoria",
    "Descripcion",
    "Acciones",
  ]);
  const categoryColumns = createColumns(["ID", "Nombre", "Acciones"]);
  const extrasColumns = createColumns(["ID", "Nombre", "Precio", "Acciones"]);

  const { categorias, loadingCategorias, errorCategorias } = useCategorias();
  const { productos, loadingProductos, errorProductos } = useProductos();
  const { extras, loadingExtras, errorExtras } = useExtras();

  const producto_categoria =
    productos.map((producto) => ({
      ...producto,
      categoria: producto.categoria.nombre,
    })) ?? [];

  const newCategorias = addActionsButtons(categorias, "categorias");
  const newProductos = addActionsButtons(producto_categoria, "productos");
  const newExtras = addActionsButtons(extras, "extras");

  return (
    <main className="flex flex-col w-full h-full px-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold my-8">Dashboard</h1>
        <Link
          to="/admin/add-product"
          className="px-6 py-3 bg-primary-500 rounded-2xl text-xl text-white hover:bg-primary-600 flex items-center justify-between gap-4"
        >
          <IconPlus className="size-8" />
          Argegar
        </Link>
      </div>
      <section className="flex flex-col h-[90%]  lg:grid  grid-cols-5 grid-rows-2 gap-8">
        <div className="row-span-1 col-span-5 ">
          <Table
            title="Productos"
            data={newProductos}
            columns={productColumns}
            loading={loadingProductos}
            error={errorProductos}
          />
        </div>
        <div className="col-span-2 row-span-1 ">
          <Table
            title="Categorias"
            data={newCategorias}
            columns={categoryColumns}
            loading={loadingCategorias}
            error={errorCategorias}
          />
        </div>
        <div className="col-span-3 row-span-1 ">
          <Table
            title="Extras"
            data={newExtras}
            columns={extrasColumns}
            loading={loadingExtras}
            error={errorExtras}
          />
        </div>
      </section>
    </main>
  );
}
