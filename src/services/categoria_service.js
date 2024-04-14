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
        console.log(error)
    }
}

const getCategorias = async () => {
    try {
        const response = await fetch(`${categoriApi}`)
        if(!response.ok){
            throw new Error("Hubo un problema al enviar la  solicitud " + response.status )
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
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
    console.log({id}, {nombre})
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
        console.log(error)
    }
}


export { deleteCategoria, getCategorias, postCategoria, updateCategoria };

