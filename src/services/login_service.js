import { api } from "../constants/api";
const loginApi = `${api}/login`;

const login = async({username, password}) => {
    try {
        const response = await fetch(`${loginApi}`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({username, password}),
        })
        const data = await response.json();
        

        if(!response.ok){
            if (response.status === 404) return ({'mensaje' : data.mensaje})
            else if(response.status === 401) return ({'mensaje' : data.mensaje})
        }
        if(data.token){
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data))
            return data;
        }else{
            return new Error("No se encontro un token en la respuesta del servidor")
        }
    } catch (error) {
        console.error(error)        
    }
}

const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token')
}

export { login, logout };

