const asyncHandler = require("express-async-handler");

const Cliente = require("../models/clienteModel");

// @desc    Get Cliente
// @route   GET /api/cliente/getCliente
// @access  Private
const getCliente = asyncHandler(async (req, res) => {
  const clientes = await Cliente.find();

  res.status(200).json(clientes);
});

// @desc    Create Cliente
// @route   POST /api/cliente/newCliente
// @access  Private
const newCliente = asyncHandler(async (req, res) => {
  if (!req.body.nombre || !req.body.ruc) {
    res.status(400);
    throw new Error("Error - Falta algunos campos para insertar el cliente");
  }

  const cliente = await Cliente.create({
    nombre: req.body.nombre,
    ruc: req.body.ruc,
    descripcion: req.body.descripcion,
    celular: req.body.celular,
    correo: req.body.correo,
    direccion: req.body.direccion,
    cuentabanc1: req.body.cuentabanc1,
    entidadbanc1: req.body.entidadbanc1,
    cibanc1: req.body.cibanc1,
    nombrebanc1: req.body.nombrebanc1,
  });

  res.status(200).json(cliente);
});

// @desc    Update Cliente
// @route   PUT /api/cliente/updateCliente/:id
// @access  Private
const updateCliente = asyncHandler(async (req, res) => {
  const cliente = await Cliente.findById(req.params);

  if (!cliente) {
    res.status(400);
    throw new Error("Error - No se encontro el Cliente");
  }

  const updatedCliente = await Cliente.findByIdAndUpdate(req.params, req.body, {
    new: true,
  });

  res.status(200).json(updatedCliente);
});

// @desc    Delete Cliente
// @route   DELETE /api/cliente/deleteCliente/:id
// @access  Private
const deleteCliente = asyncHandler(async (req, res) => {
  const cliente = await Cliente.findById(req.params);

  if (!cliente) {
    res.status(400);
    throw new Error("Error - No se encontro el Cliente");
  }

  await cliente.remove();

  res.status(200).json({ id: req.params });
});

module.exports = {
  getCliente,
  newCliente,
  updateCliente,
  deleteCliente,
};
