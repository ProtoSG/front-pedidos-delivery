import { api } from '../constants/api';

const productoApi = `${api}/producto`

/**
 * Crea un nuevo producto en la API.
 * @param {Object} data - Datos del producto a crear.
 * @returns {Promise<Object>} Respuesta de la API.
 */
const postProducto = async ({ nombre, precio, categoria_id, descripcion, imagen_url }) => {
  const token = localStorage.getItem("token");
  const data = {
    nombre,
    precio: parseFloat(precio),
    categoria_id: parseInt(categoria_id),
    descripcion,
    imagen_url
  }
  try {
    const response = await fetch(`${productoApi}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error("Hubo un problema al enviar la  solicitud " + response.status)
    }

    const responseData = await response.json();
    return responseData;
  }
  catch (error) {
    console.error(error)
  }
}

/**
 * Obtiene todos los productos desde la API.
 * @returns {Promise<Array>} Lista de productos.
 */
const getProductos = async () => {
  const response = await fetch(`${productoApi}`)
  if (!response.ok) {
    throw new Error("Hubo un problema al enviar la  solicitud " + response.status)
  }
  const data = await response.json();
  return data;
}

/**
 * Elimina un producto por su ID usando la API.
 * @param {number} id - ID del producto a eliminar.
 * @returns {Promise<Object>} Respuesta de la API.
 */
const deleteProducto = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${productoApi}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
    if (!response.ok) {
      throw new Error("Hubo un problema al enviar la  solicitud " + response.status)
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error)
  }
}

/**
 * Actualiza un producto existente en la API.
 * @param {number} id - ID del producto a actualizar.
 * @param {Object} data - Datos actualizados del producto.
 * @returns {Promise<Object>} Respuesta de la API.
 */
const updateProducto = async (id, nombre, precio, categoria_id, descripcion, imagen_url) => {
  const token = localStorage.getItem("token");
  const data = {
    nombre,
    precio: parseFloat(precio),
    categoria_id: parseInt(categoria_id),
    descripcion,
    imagen_url
  }
  try {
    const response = await fetch(`${productoApi}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error("Hubo un problema al enviar la  solicitud " + response.status)
    }

    const responseData = await response.json();
    return responseData;
  }
  catch (error) {
    console.error(error)
  }
}

export { deleteProducto, getProductos, postProducto, updateProducto };

