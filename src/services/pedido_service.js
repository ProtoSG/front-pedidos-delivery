import { api } from '../constants/api';

const pedidoApi = `${api}/pedido`

const postPedido = async ({total}) => {
    try {
        const response = await fetch(`${pedidoApi}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({total}),
        })
        if(!response.ok){
            throw new Error("Hubo un problema al enviar la  solicitud " + response.status )
        }
        const responseData = await response.json();
        console.log('Respuesta del servidor:', responseData);
    } catch (e) {
        console.error(e)
        
    }
}

export { postPedido };
