import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../store/UserContext.jsx";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { token, logout } = useUser();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (err) {
        console.error("❌ Error al obtener datos del perfil:", err);
        setError("No se pudo cargar la información del usuario.");
      }
    };

    if (token) fetchProfile();
  }, [token]);

  if (!token) {
    return (
      <div className="container mt-4">
        <h3>Perfil</h3>
        <p className="text-muted">Debes iniciar sesión para ver tu perfil 🔐</p>
        <button className="btn btn-primary mt-2" onClick={() => navigate("/")}>
          Ir al catálogo de pizzas 🍕
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3>👤 ¿Quién soy?</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      {userData ? (
        <div className="card p-3 mt-3 shadow-sm" style={{ maxWidth: "400px" }}>
          <p>
            <strong>Usuario:</strong> {userData.usuario}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>

          <div className="d-flex flex-column gap-2 mt-3">
            <button
              className="btn btn-danger"
              onClick={() => {
                logout();
                alert("Sesión cerrada correctamente 👋");
              }}
            >
              Cerrar sesión
            </button>

            <button
              className="btn btn-success"
              onClick={() => navigate("/")}
            >
              Ir al catálogo de pizzas 🍕
            </button>
          </div>
        </div>
      ) : (
        <p>Cargando datos del usuario...</p>
      )}
    </div>
  );
};

export default Profile;
