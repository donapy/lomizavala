import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export const RegistrarCliente = () => {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    nombre: yup.string().min(4).max(60).required("Razon social es necesario"),
    ruc: yup.string().min(6).max(15).required(),
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
        "http://localhost:5000/api/cliprov/newCliProv",
        datos
      );
      // console.log(result);
      if (result.status === 201) {
        alert("Se ha registrado el Cliente");
        navigate(0);
      }
    } catch (error) {
      error.response && alert(error.response.data.message);
    }
  };

  return (
    <div>
      <h3>Registrar Cliente Nuevo</h3>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p>Razon Social</p>
          <input
            type="text"
            placeholder="Razon Social..."
            {...register("nombre")}
          />
          <p>{errors.nombre?.message}</p>
          <p>Ruc</p>
          <input type="text" placeholder="RUC..." {...register("ruc")} />
          <p>{errors.ruc?.message}</p>
          <input type="submit" value="Registrar" />
        </form>
      </div>
    </div>
  );
};
