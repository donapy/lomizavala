const asyncHandler = require("express-async-handler");

const CliProv = require("../models/cliprovModel");

// @desc    Get Cliente
// @route   GET /api/cliprov/getCliente
// @access  Private
const getCliente = asyncHandler(async (req, res) => {
  const clientes = await CliProv.find({ cliente: true });

  res.status(200).json(clientes);
});

// @desc    Get Proveedor
// @route   GET /api/cliprov/getProveedor
// @access  Private
const getProveedor = asyncHandler(async (req, res) => {
  const proveedores = await CliProv.find({ proveedor: true });

  res.status(200).json(proveedores);
});

// @desc    Create Cliente/Proveedor
// @route   POST /api/cliprov/newCliProv
// @access  Private
const newCliProv = asyncHandler(async (req, res) => {
  if (!req.body.nombre || !req.body.ruc) {
    res.status(400);
    throw new Error("Error - Falta algunos campos obligatorios");
  }

  const cliprov = await CliProv.create({
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
    cliente: req.body.cliente,
    proveedor: req.body.proveedor,
  });

  res.status(201).json(cliprov);
});

// @desc    Update Cliente/Proveedor
// @route   PUT /api/cliprov/updateCliProv/:id
// @access  Private
const updateCliProv = asyncHandler(async (req, res) => {
  const cliprov = await CliProv.findById(req.params);

  if (!cliprov) {
    res.status(400);
    throw new Error("Error - No se encontro el Cliente/Proveedor");
  }

  const updatedCliProv = await CliProv.findByIdAndUpdate(req.params, req.body, {
    new: true,
  });

  res.status(200).json(updatedCliProv);
});

// @desc    Delete Cliente/Proveedor
// @route   DELETE /api/cliprov/deleteCliProv/:id
// @access  Private
const deleteCliProv = asyncHandler(async (req, res) => {
  const cliprov = await CliProv.findById(req.params);

  if (!cliprov) {
    res.status(400);
    throw new Error("Error - No se encontro el Cliente/Proveedor");
  }

  await cliprov.remove();

  res.status(200).json({ id: req.params });
});

module.exports = {
  getCliente,
  getProveedor,
  newCliProv,
  updateCliProv,
  deleteCliProv,
};
