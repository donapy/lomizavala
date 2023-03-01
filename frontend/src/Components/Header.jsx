import React from "react";
import logo from "../Images/lomizavala-logo.jpg";
import { useNavigate } from "react-router-dom";

export const Header = (props) => {
  const navigate = new useNavigate();
  return (
    <div id="header">
      <div id="left-header">
        <img id="img-logo-header" src={logo} alt="logo-lomizavala" />
      </div>
      <div id="mid-header">
        <h1>Lomi Zavala</h1>
      </div>
      <div id="right-header">
        {props.atras === "inicio" && (
          <button className="btn-azul" onClick={() => navigate("/menu")}>
            Inicio
          </button>
        )}
        {props.atras === "cerrarsesion" && (
          <button className="btn-azul" onClick={() => navigate("/")}>
            Cerrar Sesion
          </button>
        )}
        {props.atras === "none" && (
          <button
            className="btn-azul"
            onClick={() => alert("Solo para personal administrativo")}
          >
            ?
          </button>
        )}
      </div>
    </div>
  );
};
