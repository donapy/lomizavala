const asyncHandler = require("express-async-handler");

const Sucursal = require("../models/sucursalModel");

// @desc    Get Sucursal
// @route   GET /api/sucursal/getSucursal
// @access  Private
const getSucursal = asyncHandler(async (req, res) => {
  const sucursales = await Sucursal.find();

  res.status(200).json(sucursales);
});

// @desc    Create Sucursal
// @route   POST /api/sucursal/newSucursal
// @access  Private
const newSucursal = asyncHandler(async (req, res) => {
  if (!req.body.nombre) {
    res.status(400);
    throw new Error("Error - Falta el campo nombre para insertar la sucursal");
  }

  const sucursal = await Sucursal.create({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    direccion: req.body.direccion,
    ciudad: req.body.ciudad,
    telefono: req.body.telefono,
    celular: req.body.celular,
    correo: req.body.correo,
  });

  res.status(200).json(sucursal);
});

// @desc    Update Sucursal
// @route   PUT /api/sucursal/updateSucursal/:id
// @access  Private
const updateSucursal = asyncHandler(async (req, res) => {
  const sucursal = await Sucursal.findById(req.params);

  if (!sucursal) {
    res.status(400);
    throw new Error("Error - No se encontro la sucursal");
  }

  const updatedSucursal = await Sucursal.findByIdAndUpdate(
    req.params,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedSucursal);
});

// @desc    Delete Sucursal
// @route   DELETE /api/sucursal/deleteSucursal/:id
// @access  Private
const deleteSucursal = asyncHandler(async (req, res) => {
  const sucursal = await Sucursal.findById(req.params);

  if (!sucursal) {
    res.status(400);
    throw new Error("Error - No se encontro la sucursal");
  }

  await sucursal.remove();

  res.status(200).json({ id: req.params });
});

module.exports = {
  getSucursal,
  newSucursal,
  updateSucursal,
  deleteSucursal,
};
