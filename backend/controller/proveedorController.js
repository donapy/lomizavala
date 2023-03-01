const asyncHandler = require("express-async-handler");

const Proveedor = require("../models/proveedorModel");

// @desc    Get Proveedor
// @route   GET /api/proveedor/getProveedor
// @access  Private
const getProveedor = asyncHandler(async (req, res) => {
  const proveedores = await Proveedor.find();

  res.status(200).json(proveedores);
});

// @desc    Create Proveedor
// @route   POST /api/proveedor/newProveedor
// @access  Private
const newProveedor = asyncHandler(async (req, res) => {
  if (!req.body.nombre) {
    res.status(400);
    throw new Error("Error - Falta el campo nombre para insertar el proveedor");
  }

  const proveedor = await Proveedor.create({
    ruc: req.body.ruc,
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    celular: req.body.celular,
    correo: req.body.correo,
    direccion: req.body.direccion,
    cuentabanc1: req.body.cuentabanc1,
    entidadbanc1: req.body.entidadbanc1,
    cibanc1: req.body.cibanc1,
    nombrebanc1: req.body.nombrebanc1,
  });

  res.status(200).json(proveedor);
});

// @desc    Update Proveedor
// @route   PUT /api/proveedor/updateProveedor/:id
// @access  Private
const updateProveedor = asyncHandler(async (req, res) => {
  const proveedor = await Proveedor.findById(req.params.id);

  if (!proveedor) {
    res.status(400);
    throw new Error("Error - No se encontro el proveedor");
  }

  const updatedProveedor = await Proveedor.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedProveedor);
});

// @desc    Delete Proveedor
// @route   DELETE /api/proveedor/deleteProveedor/:id
// @access  Private
const deleteProveedor = asyncHandler(async (req, res) => {
  const proveedor = await Proveedor.findById(req.params.id);

  if (!proveedor) {
    res.status(400);
    throw new Error("Error - No se encontro el proveedor");
  }

  await proveedor.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getProveedor,
  newProveedor,
  updateProveedor,
  deleteProveedor,
};
