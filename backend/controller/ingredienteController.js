const asyncHandler = require("express-async-handler");

const Ingrediente = require("../models/ingredienteModel");

// @desc    Get Ingrediente
// @route   GET /api/ingrediente/getIngrediente
// @access  Private
const getIngrediente = asyncHandler(async (req, res) => {
  const ingredientes = await Ingrediente.find();

  res.status(200).json(ingredientes);
});

// @desc    Create Ingrediente
// @route   POST /api/ingrediente/newIngrediente
// @access  Private
const newIngrediente = asyncHandler(async (req, res) => {
  if (!req.body.nombre) {
    res.status(400);
    throw new Error(
      "Error - Falta el campo nombre para agregar un nuevo ingrediente"
    );
  }
  const ingrediente = await Ingrediente.create({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    cantidad: req.body.cantidad,
    imagensrc: req.body.imagensrc,
    precio: req.body.precio,
  });

  res.status(200).json(ingrediente);
});

// @desc    Update Ingrediente
// @route   PUT /api/ingrediente/updateIngrediente/:id
// @access  Private
const updateIngrediente = asyncHandler(async (req, res) => {
  const ingrediente = await Ingrediente.findById(req.params);

  if (!ingrediente) {
    res.status(400);
    throw new Error("Error - No se encontro el ingrediente");
  }

  const updatedIngrediente = await Ingrediente.findByIdAndUpdate(
    req.params,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedIngrediente);
});

// @desc    Delete Ingrediente
// @route   DELETE /api/ingrediente/deleteIngrediente/:id
// @access  Private
const deleteIngrediente = asyncHandler(async (req, res) => {
  const ingrediente = await Ingrediente.findById(req.params);

  if (!ingrediente) {
    res.status(400);
    throw new Error("Error - No se encontro el ingrediente");
  }

  await ingrediente.remove();

  res.status(200).json({ id: req.params });
});

module.exports = {
  getIngrediente,
  newIngrediente,
  updateIngrediente,
  deleteIngrediente,
};
