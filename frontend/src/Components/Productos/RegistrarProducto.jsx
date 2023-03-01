import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export const RegistrarProducto = () => {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    nombre: yup
      .string()
      .min(4)
      .max(40)
      .required("Nombre del Producto es necesario"),
    descripcion: yup.string(),
    cantidad: yup.number().integer(),
    precio: yup.number().positive().integer(),
    imgsrc: yup.string(),
    tamano: yup.string(),
    categoria: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (datos) => {
    // console.log(datos);
    try {
      const result = await Axios.post(
        "http://localhost:5000/api/producto/newProducto",
        datos
      );
      // console.log(result);
      if (result.status === 201) {
        alert("Se ha registrado el Producto");
        navigate(0);
      }
    } catch (error) {
      error.response && alert(error.response.data.message);
    }
  };

  return (
    <div>
      <h3>Registrar Producto Nuevo</h3>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p>Nombre Producto</p>
          <input
            type="text"
            placeholder="Producto..."
            {...register("nombre")}
          />
          <p>{errors.nombre?.message}</p>

          <p>Descripcion</p>
          <input
            type="text"
            placeholder="Descripcion..."
            {...register("descripcion")}
          />
          <p>{errors.descripcion?.message}</p>

          <p>Cantidad</p>
          <input type="number" placeholder="0" {...register("cantidad")} />
          <p>{errors.cantidad?.message}</p>

          <p>Precio</p>
          <input type="number" placeholder="0" {...register("precio")} />
          <p>{errors.precio?.message}</p>

          <p>Tamanho</p>
          <input
            type="string"
            placeholder="Tamanho..."
            {...register("tamano")}
          />
          <p>{errors.tamano?.message}</p>

          <p>Categoria</p>
          <input
            type="string"
            placeholder="Categoria..."
            {...register("categoria")}
          />
          <p>{errors.categoria?.message}</p>

          <p>Url de Imagen</p>
          <input type="string" placeholder="Link..." {...register("imgsrc")} />
          <p>{errors.imgsrc?.message}</p>

          <input type="submit" value="Registrar" />
        </form>
      </div>
    </div>
  );
};
