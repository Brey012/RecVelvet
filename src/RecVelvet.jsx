import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./styles/RecVelvet.css";
import NavBar from "./components/NavBar";
import SliderCartelera from "./components/SliderCartelera";
import Login from "./components/Login";
import Cartelera from "./pages/Cartelera";
import { AuthProvider, useAuth } from "./context/AuthContext";
import PrivateRoute from "./context/PrivateRoute";
import Reservas from "./pages/reserva/Reservas";
import Admin from "./pages/Admin";
import PeliculasInfo from "./pages/PeliculasInfo";
import MiReserva from "./pages/MiReserva"

function AppRoutes() {
  const location = useLocation();
  const { user } = useAuth();
  const hideNav = location.pathname === "/login";

  return (
    <>
      {!hideNav && <NavBar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <SliderCartelera />
            </PrivateRoute>
          }
        />
        <Route
          path="/cartelera"
          element={
            <PrivateRoute>
              <Cartelera />
            </PrivateRoute>
          }
        />
        <Route
          path="/reservas"
          element={
            <PrivateRoute>
              <Reservas />
            </PrivateRoute>
          }
        />
        <Route
          path="/peliculasinfo"
          element={
            <PrivateRoute>
              <PeliculasInfo />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              {user?.role === "admin" ? <Admin /> : <Navigate to="/" />}
            </PrivateRoute>
          }
        />
        <Route
          path="/mireserva"
          element={
            <PrivateRoute>
              <MiReserva />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

const RecVelvet = () => (
  <AuthProvider>
    <Router>
      <div className="body-container">
        <AppRoutes />
      </div>
    </Router>
  </AuthProvider>
);

export default RecVelvet;
