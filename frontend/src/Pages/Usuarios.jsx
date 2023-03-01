import React, { useState } from "react";
import { ListarUsuario } from "../Components/Usuarios/ListarUsuario";
import { RegistrarUsuario } from "../Components/Usuarios/RegistrarUsuario";
import { Header } from "../Components/Header";

export const Usuarios = () => {
  const [show, setShow] = useState("lista");
  return (
    <div>
      <Header atras={"inicio"} />
      <div className="top-page-title">
        <h2 className="title-pages">Usuarios</h2>
        <div className="navbar">
          <div className="navbar-items" onClick={() => setShow("lista")}>
            Listar Usuarios
          </div>
          <div className="navbar-items" onClick={() => setShow("new")}>
            Registrar Usuario
          </div>
        </div>
      </div>
      <div className="bot-page-content">
        {show === "lista" && <ListarUsuario />}
        {show === "new" && <RegistrarUsuario />}
      </div>
    </div>
  );
};
