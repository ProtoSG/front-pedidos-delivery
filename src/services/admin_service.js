import { api } from "../constants/api";

const adminApi = `${api}/admin`

const token = localStorage.getItem('token');

const getAdmin = async () => {
  const response = await fetch(`${adminApi}/profile`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  if (!response.ok) {
    throw new Error("Hubo un problema al enviar la  solicitud " + response.status)
  }
  const data = await response.json();
  return data;
}

const updateAdmin = async (username, checkPassword, password) => {
  try {
    const response = await fetch(`${adminApi}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ username, checkPassword, password }),
    })
    if (!response.ok) {
      throw new Error("Hubo un problema al enviar la  solicitud " + response.status)
    }
    const res = await response.json();
    console.log('Respuesta del servidor:', res);
  } catch (error) {
    console.error(error)
    return { error: error.message }
  }
}

export { getAdmin, updateAdmin }
