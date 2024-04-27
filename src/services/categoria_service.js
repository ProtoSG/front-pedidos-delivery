import { api } from '../constants/api';

const categoriApi = `${api}/categoria`;

const token = localStorage.getItem('token');

const postCategoria = async ({nombre}) => {
    try {
        const response = await fetch(`${categoriApi}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            body: JSON.stringify({nombre}),
        })
        if(!response.ok){
            throw new Error("Hubo un problema al enviar la  solicitud " + response.status )
        }

        const responseData = await response.json();
        console.log('Respuesta del servidor:', responseData);
    }
    catch (error) {
        if(error.status === 401) console.error("No autorizado")
        console.error(error)
    }
}

const getCategorias = async () => {
    const response = await fetch(`${categoriApi}`)
    if(!response.ok){
        throw new Error("Hubo un problema al enviar la  solicitud " + response.status )
    }
    const data = await response.json();
    return data;
}

const deleteCategoria = async (id) => {
    try {
        const response = await fetch(`${categoriApi}/${id}`, {
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

const updateCategoria = async (id, nombre) => {
    try {
        const response = await fetch(`${categoriApi}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            body: JSON.stringify({nombre}),
        })
        if(!response.ok){
            throw new Error("Hubo un problema al enviar la  solicitud " + response.status )
        }
        const res = await response.json();
        console.log('Respuesta del servidor:', res);
    } catch (error) {
        console.error(error)
    }
}

const getRankCategoria = async({date}) => {
    try {
        const response = await fetch(`${categoriApi}/rank/${date}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if(!response.ok){
            throw new Error("Hubo un problema al enviar la  solicitud " + response.status )
        }
        const data = await response.json()
        return data
    } catch (e) {
        console.error(error)
        
    }
}


export { deleteCategoria, getCategorias, getRankCategoria, postCategoria, updateCategoria };

