import { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import { actualizarPerfil } from "../../../services/usuario_service";
import { Toaster, toast } from "sonner";

export default function Perfil() {
  const { usuario, isLoading } = useAuth(true);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    direccion: "",
    telefono: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (usuario) {
      setFormData({
        nombre: usuario.nombre || "",
        email: usuario.email || "",
        direccion: usuario.direccion || "",
        telefono: usuario.telefono || ""
      });
    }
  }, [usuario]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await actualizarPerfil(formData);

      if (result.error) {
        toast.error(result.mensaje || "Error al actualizar perfil");
      } else {
        toast.success("Perfil actualizado con éxito");
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      toast.error("Error al comunicarse con el servidor");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Toaster richColors position="bottom-right" />

      <h1 className="text-2xl font-bold mb-6">Mi Perfil</h1>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {!isEditing ? (
          <div className="p-6">
            <div className="flex items-start">
              <div className="w-20 h-20 bg-primary-200 text-primary-800 rounded-full flex items-center justify-center text-3xl font-bold mr-6">
                {usuario?.nombre?.charAt(0).toUpperCase() || "U"}
              </div>

              <div className="flex-1">
                <h2 className="text-xl font-semibold">{usuario?.nombre}</h2>
                <p className="text-gray-600">{usuario?.email}</p>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Dirección</p>
                    <p className="font-medium">{usuario?.direccion || "No especificada"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Teléfono</p>
                    <p className="font-medium">{usuario?.telefono || "No especificado"}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t pt-6">
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition"
              >
                Editar Perfil
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Completo
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Correo Electrónico
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  readOnly
                />
                <p className="text-xs text-gray-500 mt-1">El correo electrónico no se puede modificar</p>
              </div>

              <div>
                <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-1">
                  Dirección
                </label>
                <input
                  id="direccion"
                  name="direccion"
                  type="text"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  type="text"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    Guardando...
                  </span>
                ) : (
                  'Guardar Cambios'
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  if (usuario) {
                    setFormData({
                      nombre: usuario.nombre || "",
                      email: usuario.email || "",
                      direccion: usuario.direccion || "",
                      telefono: usuario.telefono || ""
                    });
                  }
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
