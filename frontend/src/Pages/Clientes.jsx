import React, { useState } from "react";
import { ListarCliente } from "../Components/Clientes/ListarCliente";
import { RegistrarCliente } from "../Components/Clientes/RegistrarCliente";
import { Header } from "../Components/Header";

export const Clientes = () => {
  const [show, setShow] = useState("lista");
  return (
    <div>
      <Header atras={"inicio"} />
      <div className="top-page-title">
        <h2 className="title-pages">Clientes</h2>
        <div className="navbar">
          <div className="navbar-items" onClick={() => setShow("lista")}>
            Listar Clientes
          </div>
          <div className="navbar-items" onClick={() => setShow("new")}>
            Registrar Cliente
          </div>
        </div>
      </div>
      <div className="bot-page-content">
        {show === "lista" && <ListarCliente />}
        {show === "new" && <RegistrarCliente />}
      </div>
    </div>
  );
};
