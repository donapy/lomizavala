import React from "react";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

export const ListarUsuario = () => {
  const {
    data: listaUsuarios,
    isLoading,
    isError,
    refetch,
  } = useQuery(["listausuarios"], async () => {
    let data = await fetchListaUsuarios();
    // console.log(data);
    return data;
  });

  const fetchListaUsuarios = async () => {
    try {
      const result = await Axios.get(
        "http://localhost:5000/api/usuario/getUsuarios"
      );
      // console.log(`Datos: ${result.data}`);
      return result.data;
    } catch (error) {
      return error;
    }
  };

  const handleDelete = async (id) => {
    let confirmation = window.confirm("Estas seguro de eliminar este usuario?");
    if (confirmation) {
      try {
        await Axios.delete(
          `http://localhost:5000/api/usuario/deleteUsuario/${id}`
        );
        alert("Usuario Eliminado");
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
      Listado de Usuarios
      <button onClick={refetch}>Actualizar</button>
      <div>
        {listaUsuarios.map((item, key) => {
          return (
            <div key={key}>
              <h3>{item.nombre}</h3>
              <p>CI: {item.ci}</p>
              <p>Celular: {item.celular}</p>
              <p>Correo: {item.correo}</p>
              <p>Direccion: {item.direccion}</p>
              <p>Numero de Cuenta Bancaria: {item.cuentabanc1}</p>
              <p>Entidad de Cuenta Bancaria: {item.entidadbanc1}</p>
              <p>CI de Cuenta Bancaria: {item.cibanc1}</p>
              <p>Nombre de Cuenta Bancaria: {item.nombrebanc1}</p>
              {/* <Link to={"/usuarios/editar/" + item._id}>Editar</Link> */}
              <button onClick={() => handleDelete(item._id)}>Eliminar</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
