import { api } from '../constants/api';

const productoApi = `${api}/producto`

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

const getProductos = async () => {
  const response = await fetch(`${productoApi}`)
  if (!response.ok) {
    throw new Error("Hubo un problema al enviar la  solicitud " + response.status)
  }
  const data = await response.json();
  return data;
}

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

