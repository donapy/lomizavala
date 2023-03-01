import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";

export const EditarCliente = () => {
  const [cliente, setCliente] = useState(false);
  let { id } = useParams();
  const navigate = useNavigate();

  return <div>EditarCliente</div>;
};
