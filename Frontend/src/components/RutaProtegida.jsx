import { Navigate } from "react-router-dom";
import { useUser } from "../store/UserContext";

function RutaProtegida({ children }) {
  const { token } = useUser();
  return token ? children : <Navigate to="/login" replace />;
}

export default RutaProtegida;
