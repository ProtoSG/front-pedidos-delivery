import { api } from '../constants/api';

const extraApi = `${api}/pedido_extra`

const getRankExtra = async ({ date }) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${extraApi}/rank_extra/${date}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    if (!response.ok) {
      throw new Error("Hubo un problema al enviar la  solicitud " + response.status)
    }
    const data = await response.json()
    return data
  } catch (e) {
    console.error(e)
  }
}

export { getRankExtra }
