import React, { useState } from "react";
import "../styles/Login.css";
import { registerUser, loginUser } from "/src/services/authServices";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isRegister) {
      setFormData({ ...formData, [name]: value });
    } else {
      setLoginData({ ...loginData, [name]: value });
    }
  };

  // Validar y registrar un nuevo usuario
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Las contraseñas no coinciden.",
        background: "#181818",
        color: "#fff",
        iconColor: "#f91c36",
        confirmButtonColor: "#f91c36",
        customClass: {
          popup: "swal2-custom-popup",
          confirmButton: "swal2-custom-confirm",
        },
      });
      return;
    }

    const result = await registerUser(formData);
    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: result.message,
        background: "#181818",
        color: "#fff",
        iconColor: "#f91c36",
        confirmButtonColor: "#f91c36",
        customClass: {
          popup: "swal2-custom-popup",
          confirmButton: "swal2-custom-confirm",
        },
      });
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setIsRegister(false);
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: result.message,
        background: "#181818",
        color: "#fff",
        iconColor: "#f91c36",
        confirmButtonColor: "#f91c36",
        customClass: {
          popup: "swal2-custom-popup",
          confirmButton: "swal2-custom-confirm",
        },
      });
    }
  };

  // Validar inicio de sesión
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const result = await loginUser(loginData);
    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "Bienvenido",
        text: result.message,
        timer: 1500,
        showConfirmButton: false,
        background: "#181818",
        color: "#fff",
        iconColor: "#f91c36",
        confirmButtonColor: "#f91c36",
        customClass: {
          popup: "swal2-custom-popup",
          confirmButton: "swal2-custom-confirm",
        },
      });
      login(result.user); // Guarda el usuario completo (incluyendo el rol)
      if (result.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: result.message,
        background: "#181818",
        color: "#fff",
        iconColor: "#f91c36",
        confirmButtonColor: "#f91c36",
        customClass: {
          popup: "swal2-custom-popup",
          confirmButton: "swal2-custom-confirm",
        },
      });
    }
  };

  return (
    <section className="login__container">
      <div className="login__container-info">
        <div className="login__container-info-panel">
          <h2>
            ¿Sabes qué es{" "}
            <span style={{ color: "#f91c36" }}>RecVelvet Rewards</span>?
          </h2>
          <p>
            Únete a RecVelvet Rewards de forma rápida y sencilla para empezar a
            disfrutar de los beneficios.
          </p>
          <ul>
            <li>Acumula puntos con cada compra</li>
            <li>Canjea tus puntos por boletos en la taquilla y productos</li>
            <li>Todos los martes 2x1</li>
            <li>Combo Lunes y Jueves a precio preferencial</li>
            <li>Promociones todos los días</li>
          </ul>
          <h3>¿Qué esperas para empezar a disfrutar?</h3>
          <p>
            Regístrate en{" "}
            <span style={{ color: "#f91c36" }}>RecVelvet Rewards</span> y
            comienza a acumular puntos. ¡Entre
            más disfrutes del cine, más recompensas recibirás!
          </p>
        </div>
      </div>

      <div className="login__container-form">
        {isRegister ? (
          <div className="login__container-register">
            <h2>Regístrate</h2>
            <form
              className="login__container-register-form"
              onSubmit={handleRegisterSubmit}
              autoComplete="off"
            >
              <div className="form__content">
                <label>Nombre Completo</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Nombre Completo"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  autoComplete="off"
                />
              </div>
              <div className="form__content">
                <label>Correo Electrónico</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Correo Electrónico"
                  value={formData.email}
                  onChange={handleInputChange}
                  autoComplete="off"
                />
              </div>
              <div className="form__content">
                <label>Contraseña</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleInputChange}
                  autoComplete="new-password"
                />
              </div>
              <div className="form__content">
                <label>Confirmar Contraseña</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmar Contraseña"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  autoComplete="new-password"
                />
              </div>
              <button
                className="login__btn login__btn--primary"
                type="submit"
              >
                <span role="img" aria-label="user">
                  🦸‍♂️
                </span>{" "}
                Registrarse
              </button>
            </form>
            <p className="login__toggle-text">
              ¿Ya tienes cuenta?{" "}
              <span
                className="login__toggle-link"
                onClick={() => setIsRegister(false)}
              >
                Inicia sesión
              </span>
            </p>
          </div>
        ) : (
          <div className="login__container-ingresar">
            <h2>Iniciar Sesión</h2>
            <form
              className="login__container-ingresar-form"
              onSubmit={handleLoginSubmit}
              autoComplete="off"
            >
              <div className="form__content">
                <label>Correo Electrónico</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Correo Electrónico"
                  value={loginData.email}
                  onChange={handleInputChange}
                  autoComplete="off"
                />
              </div>
              <div className="form__content">
                <label>Contraseña</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  value={loginData.password}
                  onChange={handleInputChange}
                  autoComplete="current-password"
                />
              </div>
              <button
                className="login__btn login__btn--primary"
                type="submit"
              >
                <span role="img" aria-label="login">
                  🎬
                </span>{" "}
                Iniciar Sesión
              </button>
            </form>
            <p className="login__toggle-text">
              ¿No tienes cuenta?{" "}
              <span
                className="login__toggle-link"
                onClick={() => setIsRegister(true)}
              >
                Regístrate
              </span>
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Login;
