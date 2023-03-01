import React from "react";
import { useNavigate } from "react-router-dom";

export const Menu = () => {
  const navigate = new useNavigate();

  return (
    <div>
      <div className="top-page-title">
        <h2 className="title-pages">Menu</h2>
      </div>
      <div className="bottom-page">
        <div className="menu-options" onClick={() => navigate("/ventas")}>
          Ventas
        </div>
        <div className="menu-options" onClick={() => navigate("/compras")}>
          Compras
        </div>
        <div className="menu-options" onClick={() => navigate("/timbrados")}>
          Timbrados
        </div>
        <div className="menu-options" onClick={() => navigate("/proveedores")}>
          Proveedores
        </div>
        <div className="menu-options" onClick={() => navigate("/clientes")}>
          Clientes
        </div>
        <div className="menu-options" onClick={() => navigate("/usuarios")}>
          Usuarios
        </div>
        <div className="menu-options" onClick={() => navigate("/productos")}>
          Productos
        </div>
        <div className="menu-options" onClick={() => navigate("/ingredientes")}>
          Ingredientes
        </div>
        <div className="menu-options" onClick={() => navigate("/salarios")}>
          Salarios
        </div>
        <div className="menu-options" onClick={() => navigate("/sucursales")}>
          Sucursales
        </div>
        <div className="menu-options" onClick={() => navigate("/auditoria")}>
          Auditoria
        </div>
      </div>
    </div>
  );
};
