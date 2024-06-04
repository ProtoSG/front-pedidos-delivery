import { api } from '../constants/api';

const pedidoApi = `${api}/pedido`

const token = localStorage.getItem('token');
const postPedido = async ({ total, productos, extras }) => {
  try {
    const response = await fetch(`${pedidoApi}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ total, productos, extras }),
    })
    if (!response.ok) {
      throw new Error("Hubo un problema al enviar la  solicitud " + response.status)
    }
    const responseData = await response.json();
    return responseData;
  } catch (e) {
    console.error(e)
  }
}

const getTotalDias = async () => {
  try {
    const response = await fetch(`${pedidoApi}/datos_dias`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
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

const getTotalSemanas = async () => {
  try {
    const response = await fetch(`${pedidoApi}/datos_semanas`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
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


const getTotalMeses = async () => {
  try {
    const response = await fetch(`${pedidoApi}/datos_meses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
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


const getTotalAnos = async () => {
  try {
    const response = await fetch(`${pedidoApi}/datos_anos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
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

export { getTotalAnos, getTotalDias, getTotalMeses, getTotalSemanas, postPedido };

