const asyncHandler = require("express-async-handler");

const Salario = require("../models/salarioModel");

// @desc    Get Salario
// @route   GET /api/salario/getSalario
// @access  Private
const getSalario = asyncHandler(async (req, res) => {
  const salarios = await Salario.find();

  res.status(200).json(salarios);
});

// @desc    Create Salario
// @route   POST /api/salario/newSalario
// @access  Private
const newSalario = asyncHandler(async (req, res) => {
  if (!req.body.total || !req.body.forma || !req.body.idusuario) {
    res.status(400);
    throw new Error("Error - Falta algunos campos para insertar el salario");
  }

  const salario = await Salario.create({
    descripcion: req.body.descripcion,
    total: req.body.total,
    forma: req.body.forma,
    idusuario: req.body.idusuario,
  });

  res.status(200).json(salario);
});

// @desc    Update Salario
// @route   PUT /api/salario/updateSalario/:id
// @access  Private
const updateSalario = asyncHandler(async (req, res) => {
  const salario = await Salario.findById(req.params);

  if (!salario) {
    res.status(400);
    throw new Error("Error - No se encontro el salario");
  }

  const updatedSalario = await Salario.findByIdAndUpdate(req.params, req.body, {
    new: true,
  });

  res.status(200).json(updatedSalario);
});

// @desc    Delete Salario
// @route   DELETE /api/salario/deleteSalario/:id
// @access  Private
const deleteSalario = asyncHandler(async (req, res) => {
  const salario = await Salario.findById(req.params);

  if (!salario) {
    res.status(400);
    throw new Error("Error - No se encontro el salario");
  }

  await salario.remove();

  res.status(200).json({ id: req.params });
});

module.exports = {
  getSalario,
  newSalario,
  updateSalario,
  deleteSalario,
};
