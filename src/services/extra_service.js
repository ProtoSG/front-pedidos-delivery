import { api } from '../constants/api';

const extrasApi = `${api}/extra`;
const token = localStorage.getItem('token');


const postExtra = async ({nombre, precio, imagen_url}) => {
    const data = {
        nombre,
        precio : parseFloat(precio),
        imagen_url
    }
    try {
        const response = await fetch(`${extrasApi}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            body: JSON.stringify(data),
        })
        if(!response.ok){
            throw new Error("Hubo un problema al enviar la  solicitud " + response.status )
        }

        const responseData = await response.json();
        console.log('Respuesta del servidor:', responseData);
    }
    catch (error) {
        console.log(error)
    }
}

const getExtras = async () => {
    try {
        const response = await fetch(`${extrasApi}`)
        if(!response.ok){
            throw new Error("Hubo un problema al enviar la  solicitud " + response.status )
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}

const deleteExtra = async (id) => {
    try {
        const response = await fetch(`${extrasApi}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization' : `Bearer ${token}`
            },
        })
        if(!response.ok){
            throw new Error("Hubo un problema al enviar la  solicitud " + response.status )
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}

const updateExtra = async (id, nombre, precio, imagen_url) => {
    const data = {
        nombre,
        precio : parseFloat(precio),
        imagen_url
    }
    try {
        const response = await fetch(`${extrasApi}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            body: JSON.stringify(data),
        })
        if(!response.ok){
            throw new Error("Hubo un problema al enviar la  solicitud " + response.status )
        }
        const responseData = await response.json();
        console.log('Respuesta del servidor:', responseData);
    } catch (error) {
        console.log(error)
    }
}

export { deleteExtra, getExtras, postExtra, updateExtra };
