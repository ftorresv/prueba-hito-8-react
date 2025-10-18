import "../../Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../store/UserContext";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(false);
  const [exito, setExito] = useState(false);
  const [passwordValido, setPasswordValido] = useState(false);
  const { register } = useUser();
  const navigate = useNavigate();

  const validarFormulario = async (e) => {
    e.preventDefault();

    if (
      formData.email === "" ||
      formData.password === "" ||
      formData.confirmPassword === ""
    ) {
      setError(true);
      setExito(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(true);
      setPasswordValido(true);
      setExito(false);
      return;
    }

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

    
    const success = await register({
      email: formData.email,
      password: formData.password,
    });

    if (success) {
      setError(false);
      setPasswordValido(false);
      setExito(true);
      navigate("/profile");
    } else {
      setError(true);
      setExito(false);
      alert("No se pudo registrar el usuario");
    }
  };

  return (
    <>
      <form
        className="container-fluid Register d-flex flex-column gap-3 form-group mt-2 pt-2"
        onSubmit={validarFormulario}
      >
        {error && <div className="alert alert-danger">Por favor, revise los campos.</div>}
        {exito && (
          <div className="alert alert-success">
            <p>Registro exitoso! Puedes <a href="/login">iniciar sesión</a>.</p>
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
          placeholder="Ingrese una contraseña válida"
          className="form-control"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          className="form-control"
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
          onBlur={() => {
            if (formData.password !== formData.confirmPassword) {
              setPasswordValido(true);
            } else {
              setPasswordValido(false);
            }
          }}
        />

        {passwordValido && (
          <div className="alert alert-danger">Las contraseñas no coinciden</div>
        )}

        <button type="submit" className="btn btn-secondary mb-3">
          Enviar
        </button>
      </form>
    </>
  );
};

export default Register;
