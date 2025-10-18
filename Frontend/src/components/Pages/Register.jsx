import "../../Register.css";
import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    usuario: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(false);
  const [exito, setExito] = useState(false);
  const [passwordValido, setPasswordValido] = useState(false);

  const validarFormulario = (e) => {
    e.preventDefault();

    // Validación de campos vacíos
    if (
      formData.usuario === "" ||
      formData.email === "" ||
      formData.password === "" ||
      formData.confirmPassword === ""
    ) {
      setError(true);
      setExito(false);
      return;
    }

    // Validación de contraseñas iguales
    if (formData.password !== formData.confirmPassword) {
      setError(true);
      setPasswordValido(true);
      setExito(false);

      return;
    }

    // Validación de complejidad de contraseña
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

    // Si pasa todas las validaciones
    setError(false);
    setPasswordValido(false);
    setExito(true);
  };

  return (
    <>
      <form
        className="container-fluid Register d-flex flex-column gap-3 form-group mt-2 pt-2"
        onSubmit={validarFormulario}
      >
        {error ? (
          <div className="alert alert-danger">
            Por favor, revise los campos.
          </div>
        ) : null}
        {exito ? (
          <div className="alert alert-success">
            <p>Formulario enviado exitosamente!</p>
          </div>
        ) : null}

        <input
          type="text"
          placeholder="Nombre de usuario"
          className="form-control"
          onChange={(e) =>
            setFormData({ ...formData, usuario: e.target.value })
          }
        />
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
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
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

        {passwordValido ? (
          <div className="alert alert-danger">Las contraseñas no coinciden</div>
        ) : null}

        <button type="submit" className="btn btn-secondary mb-3">
          Enviar
        </button>
      </form>

      {exito ? (
        <div className="resultado mt-4 d-flex flex-column align-items-start">
          <h2>Datos del formulario:</h2>
          <p>
            <b>Usuario:</b> {formData.usuario}
          </p>
          <p>
            <b>Email:</b> {formData.email}
          </p>
        </div>
      ) : null}
    </>
  );
};

export default Register;
