import * as jose from 'jose';
import { api } from "../constants/api";
const loginApi = `${api}/login`;


const login = async({username, password}) => {
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
}

const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token')
}

const experiedToken = () => {
    const token = localStorage.getItem('token')
    const decodedToken = jose.decodeJwt(token)
    const currentTime = Math.floor(Date.now() / 1000);

    if(decodedToken){
        const exp = decodedToken.exp;
        if(currentTime >= exp){
            return true;
        }
        return false;
    }else{
        console.error("El token no es valido")
    }
}

export { experiedToken, login, logout };

