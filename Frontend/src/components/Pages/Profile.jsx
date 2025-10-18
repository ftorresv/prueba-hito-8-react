import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const userEmail = "felipe@mamma-mia.cl"; 

  const handleLogout = () => {
    console.log("Sesión cerrada");
    navigate("/login");
  };

  return (
    <div className="container text-center my-5">
      <h2>👤 Perfil de Usuario</h2>
      <p className="lead">Correo: <strong>{userEmail}</strong></p>
      <button onClick={handleLogout} className="btn btn-danger">
        🔒 Cerrar Sesión
      </button>
    </div>
  );
}

export default Profile;
