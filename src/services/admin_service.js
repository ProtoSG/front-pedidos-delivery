import { api } from "../constants/api";

const adminApi = `${api}/admin`

const getAdminById = async ({ id }) => {
  const response = await fetch(`${adminApi}/${id}`)
  if (!response.ok) {
    throw new Error("Hubo un problema al enviar la  solicitud " + response.status)
  }
  const data = await response.json();
  return data;
}

const updateAdmin = async (id, username, password) => {
  try {
    const response = await fetch(`${adminApi}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    if (!response.ok) {
      throw new Error("Hubo un problema al enviar la  solicitud " + response.status)
    }
    const res = await response.json();
    console.log('Respuesta del servidor:', res);
  } catch (error) {
    console.error(error)
  }
}

export { getAdminById, updateAdmin }
