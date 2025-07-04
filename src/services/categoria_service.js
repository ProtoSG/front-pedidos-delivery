import { api } from "../constants/api";

const categoriApi = `${api}/categoria`;

const postCategoria = async ({ nombre }) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${categoriApi}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ nombre }),
    });
    if (!response.ok) {
      throw new Error(
        "Hubo un problema al enviar la  solicitud " + response.status,
      );
    }

    await response.json();
  } catch (error) {
    if (error.status === 401) console.error("No autorizado");
    console.error(error);
  }
};

const getCategorias = async () => {
  const response = await fetch(`${categoriApi}`);
  if (!response.ok) {
    throw new Error(
      "Hubo un problema al enviar la  solicitud " + response.status,
    );
  }
  const data = await response.json();
  return data;
};

/**
 * Elimina una categoría por su ID usando la API.
 * @param {number} id - ID de la categoría a eliminar.
 * @returns {Promise<Object>} Respuesta de la API.
 */
const deleteCategoria = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${categoriApi}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(
        "Hubo un problema al enviar la  solicitud " + response.status,
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const updateCategoria = async (id, nombre) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${categoriApi}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ nombre }),
    });
    if (!response.ok) {
      throw new Error(
        "Hubo un problema al enviar la  solicitud " + response.status,
      );
    }
    await response.json();
  } catch (error) {
    console.error(error);
  }
};

const getRankCategoria = async ({ date }) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${categoriApi}/rank/${date}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(
        "Hubo un problema al enviar la  solicitud " + response.status,
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export {
  deleteCategoria,
  getCategorias,
  getRankCategoria,
  postCategoria,
  updateCategoria,
};
