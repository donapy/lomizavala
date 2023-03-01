const asyncHandler = require("express-async-handler");

const Compra = require("../models/compraModel");

// @desc    Get Compra
// @route   GET /api/compra/getCompra
// @access  Private
const getCompra = asyncHandler(async (req, res) => {
  const compras = await Compra.find();

  res.status(200).json(compras);
});

// @desc    Create Compra
// @route   POST /api/compra/newCompra
// @access  Private
const newCompra = asyncHandler(async (req, res) => {
  if (!req.body.totalgeneral || !req.body.items || !req.body.idproveedor) {
    res.status(400);
    throw new Error("Error - Falta algunos campos para insertar la compra");
  }

  const compra = await Compra.create({
    totaliva5: req.body.totaliva5,
    totaliva10: req.body.totaliva10,
    totalexenta: req.body.totalexenta,
    totalgeneral: req.body.totalgeneral,
    descripcion: req.body.descripcion,
    items: req.body.items,
    idproveedor: req.body.idproveedor,
    idsucursal: req.body.idsucursal,
  });

  res.status(200).json(compra);
});

// @desc    Update Compra
// @route   PUT /api/compra/updateCompra/:id
// @access  Private
const updateCompra = asyncHandler(async (req, res) => {
  const compra = await Compra.findById(req.params);

  if (!compra) {
    res.status(400);
    throw new Error("Error - No se encontro la compra");
  }

  const updatedCompra = await Compra.findByIdAndUpdate(req.params, req.body, {
    new: true,
  });

  res.status(200).json(updatedCompra);
});

// @desc    Delete Compra
// @route   DELETE /api/compra/deleteCompra/:id
// @access  Private
const deleteCompra = asyncHandler(async (req, res) => {
  const compra = await Compra.findById(req.params);

  if (!compra) {
    res.status(400);
    throw new Error("Error - No se encontro la compra");
  }

  await compra.remove();

  res.status(200).json({ id: req.params });
});

module.exports = {
  getCompra,
  newCompra,
  updateCompra,
  deleteCompra,
};
