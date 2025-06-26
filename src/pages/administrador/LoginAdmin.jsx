import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Panel from "../../components/Panel";
import { loginAdmin } from "../../services/admin_service";
import { Toaster, toast } from "sonner";

export default function LoginAdmin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
    setError(null);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setError("Completar los espacios");
      return;
    }
    setIsLoading(true);
    try {
      const { mensaje, token } = await loginAdmin({ username, password });
      console.log({ mensaje, token });
      if (token) {
        toast.success(mensaje || "Bienvenido Administrador");
        navigate("/admin/");
      } else {
        setError(mensaje);
      }
    } catch (error) {
      console.error("Error durante el login de admin:", error);
      setError("Error de conexión. Intente nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col relative justify-center items-center h-dvh -top-20">
      <Toaster richColors position="top-center" />
      <Panel />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80 mt-10">
        <input
          name="username"
          type="text"
          onChange={handleChange}
          placeholder="Usuario admin..."
          className="text-xl py-2 px-4 rounded-3xl"
        />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Contraseña..."
          className="text-xl py-2 px-4 rounded-3xl"
        />
        <button
          disabled={isLoading}
          className="mt-6 px-10 py-3 bg-primary-500 rounded-3xl text-white hover:bg-primary-600 text-xl disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? "Procesando..." : "Ingresar"}
        </button>
        {error && <p className="text-red-600 text-center text-lg">{error}</p>}
        <div className="mt-4 text-center">
          <Link
            to="/login"
            className="text-primary-600 hover:text-primary-800 font-medium"
          >
            ¿Eres usuario? Inicia sesión aquí
          </Link>
        </div>
        <div className="mt-2 text-center">
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
            Volver al menú principal
          </Link>
        </div>
      </form>
    </main>
  );
} 