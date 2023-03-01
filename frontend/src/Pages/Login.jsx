import React, { useState } from "react";
import { Header } from "../Components/Header";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

export const Login = () => {
  const [inputs, setInputs] = useState({});
  const navigate = new useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await Axios.post(
        "http://localhost:5000/api/usuario/loginUsuario",
        inputs
      );
      console.log(result);
      if (result.status === 200) {
        navigate("/menu");
      }
      if (result.status === 400) {
        alert(result.message);
      }
    } catch (error) {
      // console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <div>
      <Header atras="none" />
      <div className="top-page-title">
        <h2 className="title-pages">Iniciar Sesion</h2>
      </div>
      <div className="bot-page-content">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="ci">Ingrese su usuario: </label>
            <input
              type="text"
              name="ci"
              id="ci"
              value={inputs.ci || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Ingrese su contrasenha: </label>
            <input
              type="password"
              name="password"
              id="password"
              value={inputs.password || ""}
              onChange={handleChange}
            />
          </div>
          <button>Ingresar</button>
        </form>
      </div>
    </div>
  );
};
