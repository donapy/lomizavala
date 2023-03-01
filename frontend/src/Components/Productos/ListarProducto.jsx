import React from "react";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

export const ListarProducto = () => {
  const {
    data: listaProductos,
    isLoading,
    isError,
    refetch,
  } = useQuery(["listaproductos"], async () => {
    let data = await fetchListaProductos();
    // console.log(data);
    return data;
  });

  const fetchListaProductos = async () => {
    try {
      const result = await Axios.get(
        "http://localhost:5000/api/producto/getProducto"
      );
      // console.log(`Datos: ${result.data}`);
      return result.data;
    } catch (error) {
      return error;
    }
  };

  const handleDelete = async (id) => {
    let confirmation = window.confirm(
      "Estas seguro de eliminar este producto?"
    );
    if (confirmation) {
      try {
        await Axios.delete(
          `http://localhost:5000/api/producto/deleteProducto/${id}`
        );
        alert("Producto Eliminado");
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
      Listado de Productos
      <button onClick={refetch}>Actualizar</button>
      <div>
        {listaProductos.map((item, key) => {
          return (
            <div key={key}>
              <h3>{item.nombre}</h3>
              <p>
                <img src={item.imagensrc} alt="foto_producto" />
              </p>
              <p>Descripcion: {item.descripcion}</p>
              <p>Cantidad: {item.cantidad}</p>
              <p>Precio: {item.precio}</p>
              <p>Tamanho: {item.tamano}</p>
              <p>Categoria: {item.categoria}</p>
              <p>Activo: {item.activo}</p>

              {/* <Link to={"/productos/editar/" + item._id}>Editar</Link> */}
              <button onClick={() => handleDelete(item._id)}>Eliminar</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
