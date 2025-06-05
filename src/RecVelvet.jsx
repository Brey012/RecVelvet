import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./assets/css/RecVelvet.css";
import NavBar from "./assets/Components/NavBar";
import SliderCartelera from "./assets/Components/SliderCartelera";
import Login from "./assets/Components/Login";
import Cartelera from "./pages/Cartelera";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./context/PrivateRoute";

function AppRoutes() {
  const location = useLocation();
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
