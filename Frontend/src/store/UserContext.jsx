import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(true); // Simulado, parte en true

  const logout = () => setToken(false);
  const login = () => setToken(true);

  return (
    <UserContext.Provider value={{ token, logout, login }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado
export const useUser = () => useContext(UserContext);
