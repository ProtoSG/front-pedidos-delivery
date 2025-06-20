import * as jose from "jose";
import { api } from "../constants/api";
const loginApi = `${api}/login`;

const login = async ({ username, password }) => {
  const csrf = await getCSRFToken();

  const response = await fetch(`${loginApi}`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      'X-CSRFToken': csrf   
    },
    body: JSON.stringify({ username, password }),
  });
  const { mensaje, token } = await response.json();

  if (!response.ok) {
    return { mensaje: mensaje };
  }
  if (token) {
    localStorage.setItem("token", token);
    return { token };
  } else {
    return new Error("No se encontro un token en la respuesta del servidor");
  }
};

const logout = () => {
  localStorage.removeItem("token");
};

const experiedToken = () => {
  const token = localStorage.getItem("token");
  const decodedToken = jose.decodeJwt(token);
  const currentTime = Math.floor(Date.now() / 1000);

  if (!decodedToken || typeof decodedToken.exp !== "number") {
    console.error("El token no es válido o no contiene el campo 'exp'");
    return true;
  }
  return currentTime >= decodedToken.exp;
};

const getCSRFToken = async() => {
  const r = await fetch(`${api}/csrf-token`, {
    credentials: 'include'
  })

  const { csrf_token } = await r.json()
  return csrf_token
}

export { experiedToken, login, logout, getCSRFToken };

