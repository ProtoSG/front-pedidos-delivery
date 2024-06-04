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

const updateAdmin = async (checkPassword, password) => {
  const response = await fetch(`${adminApi}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ checkPassword, password }),
  })
  const { message, success } = await response.json();
  if (!response.ok) {
    return { 'mensaje': message }
  }
  if (success) {
    return { success };
  } else {
    return new Error("No se encontro un token en la respuesta del servidor")
  }
}

export { getAdmin, updateAdmin }
