import "../../Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../store/UserContext";


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [exito, setExito] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();

  const validarFormulario = async (e) => {
    e.preventDefault();

    if (formData.email === "" || formData.password === "") {
      setError(true);
      setExito(false);
      return;
    }
    // Para el testeo del user utilizado (en este caso, "test@test.com"), la validación de la contraseña se omite, por lo que se comenta el siguiente bloque de código (desde linea 103 hasta 112)
    const regexPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-={}[\]:;"'<>,.?/\\]).{6,}$/;

    if (!regexPassword.test(formData.password)) {
      setError(true);
      setExito(false);
      alert(
        "La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula y un caracter especial."
      );
      return;
    }

      const success = await login({
      email: formData.email,
      password: formData.password,
    });

    if (success) {
      setError(false);
      setExito(true);
      navigate("/profile"); // redirigir al perfil
    } else {
      setError(true);
      setExito(false);
      alert("Credenciales incorrectas");
    }
  };

  return (
    <>
      <form
        className="container-fluid Login d-flex flex-column gap-3 form-group mt-2 pt-2"
        onSubmit={validarFormulario}
      >
        {error && <div className="alert alert-danger">Por favor, revisa que hayas escrito correctamente las credenciales de acceso. Si no te has registrado, puedes hacerlo <a href="/register">aquí</a>.</div>}
        {exito && (
          <div className="alert alert-success">
            <p>¡Inicio de sesión exitoso!</p>
          </div>
        )}
        <input
          type="email"
          placeholder="Email"
          className="form-control"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="form-control"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button type="submit" className="btn btn-secondary mb-3">
          Iniciar sesión
        </button>
      </form>
    </>
  );
};

export default Login;
