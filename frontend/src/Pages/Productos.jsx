import React, { useState } from "react";
import { ListarProducto } from "../Components/Productos/ListarProducto";
import { RegistrarProducto } from "../Components/Productos/RegistrarProducto";
import { Header } from "../Components/Header";

export const Productos = () => {
  const [show, setShow] = useState("lista");
  return (
    <div>
      <Header atras={"inicio"} />
      <div className="top-page-title">
        <h2 className="title-pages">Productos</h2>
        <div className="navbar">
          <div className="navbar-items" onClick={() => setShow("lista")}>
            Listar Productos
          </div>
          <div className="navbar-items" onClick={() => setShow("new")}>
            Registrar Producto
          </div>
        </div>
      </div>
      <div className="bot-page-content">
        {show === "lista" && <ListarProducto />}
        {show === "new" && <RegistrarProducto />}
      </div>
    </div>
  );
};
