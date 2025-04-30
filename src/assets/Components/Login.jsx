import React, { useState } from "react";
import "../css/Login.css";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false); // Estado para alternar entre login y registro

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
          // Formulario de registro
          <div className="login__container-register">
            <h2>Regístrate</h2>
            <form className="login__container-register-form">
              <div className="form__content">
                <label className="login__container-register-label">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  placeholder="Nombre Completo"
                  className="login__container-register-input"
                />
              </div>
              <div className="form__content">
                <label className="login__container-register-label">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  placeholder="Correo Electrónico"
                  className="login__container-register-input"
                />
              </div>
              <div className="form__content">
                <label className="login__container-register-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  placeholder="Contraseña"
                  className="login__container-register-input"
                />
              </div>
              <div className="form__content">
                <label className="login__container-register-label">
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  placeholder="Confirmar Contraseña"
                  className="login__container-register-input"
                />
              </div>
              <button
                type="submit"
                className="login__container-register-button"
              >
                Registrarse
              </button>
            </form>
            <p>
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
          // Formulario de inicio de sesión
          <div className="login__container-ingresar">
            <h2>Iniciar Sesión</h2>
            <form className="login__container-ingresar-form">
              <div className="login__container-correo">
                <label>Correo Electrónico</label>
                <input
                  type="text"
                  placeholder="Correo Electrónico"
                  className="login__container-login-inicio-input"
                />
              </div>
              <div className="login__container-password">
                <label>Contraseña</label>
                <input
                  type="password"
                  placeholder="Contraseña"
                  className="login__container-login-inicio-input"
                />
              </div>
              <button
                type="submit"
                className="login__container-login-inicio-button"
              >
                Iniciar Sesión
              </button>
            </form>
            <p>
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
