import React, { useState } from "react";
import { Header } from "../Components/Header";
import { RegistrarVenta } from "../Components/Ventas/RegistrarVenta";
import { ListarVenta } from "../Components/Ventas/ListarVenta";

export const Ventas = () => {
  const [show, setShow] = useState("lista");
  return (
    <div>
      <Header atras={"inicio"} />
      <div className="top-page-title">
        {show !== "new" && (
          <>
            <h2 className="title-pages">Ventas</h2>
            <div className="navbar">
              <div className="navbar-items" onClick={() => setShow("lista")}>
                Listar Ventas
              </div>
              <div className="navbar-items" onClick={() => setShow("new")}>
                Realizar Venta
              </div>
            </div>
          </>
        )}
      </div>
      <div className="bot-page-content">
        {show === "lista" && <ListarVenta />}
        {show === "new" && <RegistrarVenta />}
      </div>
    </div>
  );
};
