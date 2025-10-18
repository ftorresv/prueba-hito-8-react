import { createContext, useContext, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);

  // Se utiliza una instancia de axios para las solicitudes API, como la vista en clases (en reemplazo del método fetch)
  const api = axios.create({
    baseURL: "http://localhost:5000/api",
  });

  // Código register
  const register = async (userData) => {
    try {
      const res = await api.post("/auth/register", userData);
      const { token, email } = res.data;
      setToken(token);
      setEmail(email);
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      return true;
    } catch (err) {
      console.error("Oh, no encontramos este usuario; puedes revisar si quizá escribiste algún carácter erróneo:", err.response?.data || err.message);
      return false;
    }
  };

  // Código login
  const login = async (userData) => {
    try {
      const res = await api.post("/auth/login", userData);
      const { token, email } = res.data;
      setToken(token);
      setEmail(email);
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      return true;
    } catch (err) {
      console.error("Error al iniciar sesión:", err.response?.data || err.message);
      return false;
    }
  };

  // Código logout
  const logout = () => {
    setToken(null);
    setEmail(null);
    localStorage.removeItem("token"); // Eliminar token del almacenamiento local
    localStorage.removeItem("email"); // Eliminar email del almacenamiento local
  };

  // Código para obtener el perfil del usuario
  const getProfile = async () => {
    try {
      const storedToken = token || localStorage.getItem("token");
      if (!storedToken) return null;

      const res = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      return res.data; // perfil del usuario
    } catch (err) {
      console.error("Oh no, no encontramos este perfil: quizá lo que buscas está en tu corazón:", err.response?.data || err.message);
      return null;
    }
  };

  return (
    <UserContext.Provider
      value={{ token, email, register, login, logout, getProfile }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado
export const useUser = () => useContext(UserContext);

