/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Panel from "../../components/Panel";
import { login } from "../../services/login_service";

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setMessage("Completar los espacios");
      return;
    }
    try {
      const user = await login({ username, password });

      if (user) {
        const { mensaje, token } = user;
        setUser(user);
        if (mensaje) setMessage(mensaje);

        if (token) {
          navigate("/admin");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <main className="flex flex-col relative justify-center items-center h-dvh -top-20">
      <Panel />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80 mt-10">
        <input
          name="username"
          type="text"
          onChange={handleChange}
          placeholder="Usuario..."
          className="text-xl py-2 px-4 rounded-3xl"
        />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Contraseña..."
          className="text-xl py-2 px-4 rounded-3xl"
        />
        <button className="mt-6 px-10 py-3 bg-primary-500 rounded-3xl text-white hover:bg-primary-600 text-xl">
          Ingresar
        </button>
        {error ? (
          <p className="text-red-500 text-center text-lg">
            Error en el servidor: {error}
          </p>
        ) : (
          <span className="text-red-500 text-center text-lg">{message}</span>
        )}
      </form>
    </main>
  );
}
