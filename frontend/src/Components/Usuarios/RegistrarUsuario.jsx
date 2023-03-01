import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export const RegistrarUsuario = () => {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    nombre: yup.string().min(4).max(60).required("Nombre es necesario"),
    ci: yup.string().min(6).max(15).required("CI es necesario"),
    password: yup.string().min(6).required("Contrasenha es necesario"),
    celular: yup.string(),
    correo: yup.string(),
    direccion: yup.string(),
    cuentabanc1: yup.string(),
    entidadbanc1: yup.string(),
    cibanc1: yup.string(),
    nombrebanc1: yup.string(),
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
        "http://localhost:5000/api/usuario/newUsuario",
        datos
      );
      // console.log(result);
      if (result.status === 201) {
        alert("Se ha registrado el Usuario");
        navigate(0);
      }
    } catch (error) {
      error.response && alert(error.response.data.message);
    }
  };

  return (
    <div>
      <h3>Registrar Usuario Nuevo</h3>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p>Nombre</p>
          <input type="text" placeholder="Nombre..." {...register("nombre")} />
          <p>{errors.nombre?.message}</p>

          <p>CI</p>
          <input type="text" placeholder="CI..." {...register("ci")} />
          <p>{errors.ci?.message}</p>

          <p>Contrasenha</p>
          <input
            type="password"
            placeholder="Password..."
            {...register("password")}
          />
          <p>{errors.password?.message}</p>

          <p>Celular</p>
          <input
            type="text"
            placeholder="Celular..."
            {...register("celular")}
          />
          <p>{errors.celular?.message}</p>

          <p>Correo</p>
          <input type="text" placeholder="Correo..." {...register("correo")} />
          <p>{errors.correo?.message}</p>

          <p>Direccion</p>
          <input
            type="text"
            placeholder="Direccion..."
            {...register("direccion")}
          />
          <p>{errors.direccion?.message}</p>

          <p>Cuenta Bancaria</p>
          <input
            type="text"
            placeholder="Cuenta Bancaria..."
            {...register("cuentabanc1")}
          />
          <p>{errors.cuentabanc1?.message}</p>

          <p>Entidad Bancaria</p>
          <input
            type="text"
            placeholder="Entidad Bancaria..."
            {...register("entidadbanc1")}
          />
          <p>{errors.entidadbanc1?.message}</p>

          <p>Ci/RUC Bancario</p>
          <input
            type="text"
            placeholder="CI/RUC Bancario..."
            {...register("cibanc1")}
          />
          <p>{errors.cibanc1?.message}</p>

          <p>Titular Bancario</p>
          <input
            type="text"
            placeholder="Titular Bancario..."
            {...register("nombrebanc1")}
          />
          <p>{errors.nombrebanc1?.message}</p>

          <input type="submit" value="Registrar" />
        </form>
      </div>
    </div>
  );
};
