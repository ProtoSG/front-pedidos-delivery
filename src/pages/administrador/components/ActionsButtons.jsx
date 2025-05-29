import PropTypes from "prop-types";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { deleteCategoria } from "../../../services/categoria_service";
import { deleteExtra } from "../../../services/extra_service";
import { deleteProducto } from "../../../services/producto_service";

ActionButtons.propTypes = {
  data: PropTypes.object.isRequired,
  tabla: PropTypes.string.isRequired,
};

export default function ActionButtons({ data, tabla }) {
  const handleDelete = async (id) => {
    if (tabla == "categorias") await deleteCategoria(id);
    if (tabla == "productos") await deleteProducto(id);
    if (tabla == "extras") await deleteExtra(id);
  };

  return (
    <div className="flex gap-4">
      <Link
        to={`/admin/update-${tabla.slice(0, -1)}/${data.id}`}
        className="bg-primary-500 text-white rounded-2xl py-2 px-4"
      >
        <IconEdit className="size-5" />
      </Link>
      <form onSubmit={() => handleDelete(data.id)}>
        <button className="bg-red-500 text-white rounded-2xl py-2 px-4">
          <IconTrash className="size-5" />
        </button>
      </form>
    </div>
  );
}
