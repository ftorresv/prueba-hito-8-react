import { Link } from "react-router-dom";
function NotFound() {
  return (
    <div className="container text-center my-5">
      <h1 style={{ fontSize: "6rem" }}>404</h1>
      <h2>¡Ups! Página no encontrada 🍕</h2>
      <p className="lead">
        Parece que la pizza que buscabas se quemó en el horno... 🔥
      </p>
      <Link to="/" className="btn btn-success mt-3">
        🔙 Volver al inicio
      </Link>
    </div>
  );
}

export default NotFound;
