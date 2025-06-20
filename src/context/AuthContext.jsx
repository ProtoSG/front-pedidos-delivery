import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { login as loginService } from '../services/login_service';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Aquí podrías validar el token contra el backend si fuera necesario.
    // Por ahora, solo lo cargamos del localStorage.
    if (token) {
      // Podrías decodificar el token para obtener info del usuario.
      setUser({ isAuthenticated: true }); 
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    const data = await loginService({ email, password });
    if (data && data.token) {
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser({ isAuthenticated: true });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}; 