import React from "react";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

export const ListarVenta = () => {
  const {
    data: listaVentas,
    isLoading,
    isError,
    refetch,
  } = useQuery(["listaventas"], async () => {
    let data = await fetchListaVentas();
    // console.log(data);
    return data;
  });

  const fetchListaVentas = async () => {
    try {
      const result = await Axios.get(
        "http://localhost:5000/api/venta/getVentas"
      );
      // console.log(`Datos: ${result.data}`);
      return result.data;
    } catch (error) {
      return error;
    }
  };

  const handleDelete = async (id) => {
    let confirmation = window.confirm("Estas seguro de eliminar este venta?");
    if (confirmation) {
      try {
        await Axios.delete(`http://localhost:5000/api/venta/deleteVenta/${id}`);
        refetch();
        alert("Venta Eliminada");
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
      Listado de Ventas
      <button onClick={refetch}>Actualizar</button>
      <div>
        {listaVentas.map((item, key) => {
          return (
            <div key={key}>
              {/* <h3>{item.nrofactura}</h3> */}
              <p>Cliente: {item.idcliente}</p>
              <p>Fecha: {item.fecha}</p>
              <p>Nombre pedido: {item.nombrepedido}</p>
              <p>Tipo: {item.tipo}</p>
              {/* <p>Pagado: {item.pagado}</p> */}
              {/* <p>Total IVA 5%: {item.totaliva5}</p> */}
              {/* <p>Total IVA 10%: {item.totaliva10}</p> */}
              {/* <p>Total Exenta: {item.totalexenta}</p> */}
              <p>Total General: {item.totalgeneral}</p>
              {/* <p>Vendedor: {item.idusuario}</p> */}
              {/* <p>Productos: {item.items}</p>  */}
              {/* <Link to={"/ventas/editar/" + item._id}>Editar</Link> */}
              <button onClick={() => handleDelete(item._id)}>Eliminar</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
