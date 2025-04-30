import React, { useState } from "react";
import "../css/Login.css";
import { registerUser, loginUser } from "/src/services/authServices";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

const Login = () => {
  const [isRegister, setIsRegister] = useState(false); // Alternar entre registro e inicio de sesión
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
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // Hook para redirigir

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
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    const result = await registerUser(formData);
    setMessage(result.message);

    if (result.success) {
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setIsRegister(false); // Cambiar a inicio de sesión
    }
  };

  // Validar inicio de sesión
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const result = await loginUser(loginData);
    setMessage(result.message);

    if (result.success) {
      navigate("/"); // Redirige al componente SliderCartelera
    }
  };

  return (
    <section className="login__container">
      <div className="login__container-info">
        <div className="login__container-info-panel">
          <h2>¿Sabes qué es RecVelvet Rewards?</h2>
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
            Regístrate en RecVelvet Rewards y comienza a acumular puntos. ¡Entre
            más disfrutes del cine, más recompensas recibirás!
          </p>
        </div>
      </div>

      <div className="login__container-form">
        {isRegister ? (
          <div className="login__container-register">
            <h2>Regístrate</h2>
            <form className="login__container-register-form" onSubmit={handleRegisterSubmit}>
              <div className="form__content">
                <label>Nombre Completo</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Nombre Completo"
                  value={formData.fullName}
                  onChange={handleInputChange}
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
                />
              </div>
              <button type="submit">Registrarse</button>
            </form>
            <p>
              ¿Ya tienes cuenta?{" "}
              <span onClick={() => setIsRegister(false)}>Inicia sesión</span>
            </p>
          </div>
        ) : (
          <div className="login__container-ingresar">
            <h2>Iniciar Sesión</h2>
            <form className="login__container-ingresar-form" onSubmit={handleLoginSubmit}>
              <div className="form__content">
                <label>Correo Electrónico</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Correo Electrónico"
                  value={loginData.email}
                  onChange={handleInputChange}
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
                />
              </div>
              <button type="submit">Iniciar Sesión</button>
            </form>
            <p>
              ¿No tienes cuenta?{" "}
              <span onClick={() => setIsRegister(true)}>Regístrate</span>
            </p>
          </div>
        )}
        {message && <p className="message">{message}</p>}
      </div>
    </section>
  );
};

export default Login;
