import { api } from '../constants/api';

const pedidoApi = `${api}/pedido_producto`

const token = localStorage.getItem('token');
const getRankProducto = async ({ date }) => {
  try {
    const response = await fetch(`${pedidoApi}/rank_productos/${date}`, {
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

export { getRankProducto };
