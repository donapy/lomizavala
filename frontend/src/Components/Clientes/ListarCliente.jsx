import React from "react";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

export const ListarCliente = () => {
  const {
    data: listaClientes,
    isLoading,
    isError,
    refetch,
  } = useQuery(["listaclientes"], async () => {
    let data = await fetchListaClientes();
    // console.log(data);
    return data;
  });

  const fetchListaClientes = async () => {
    try {
      const result = await Axios.get(
        "http://localhost:5000/api/cliprov/getCliente"
      );
      // console.log(`Datos: ${result.data}`);
      return result.data;
    } catch (error) {
      return error;
    }
  };

  const handleDelete = async (id) => {
    let confirmation = window.confirm("Estas seguro de eliminar este cliente?");
    if (confirmation) {
      try {
        await Axios.delete(
          `http://localhost:5000/api/cliprov/deleteCliProv/${id}`
        );
        alert("Cliente Eliminado");
        refetch();
      } catch (error) {
        error.response && alert(error.response.data.message);
      }
    }
  };

  if (isError) {
    return <h1>Error</h1>;
  }
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <div>
      Listado de Clientes
      <button onClick={refetch}>Actualizar</button>
      <div>
        {listaClientes.map((item, key) => {
          return (
            <div key={key}>
              <h3>{item.nombre}</h3>
              <p>RUC: {item.ruc}</p>
              {/* <Link to={"/clientes/editar/" + item._id}>Editar</Link> */}
              <button onClick={() => handleDelete(item._id)}>Eliminar</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
