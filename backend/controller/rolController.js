const asyncHandler = require("express-async-handler");

const Rol = require("../models/rolModel");

// @desc    Get Rol
// @route   GET /api/rol/getRol
// @access  Private
const getRol = asyncHandler(async (req, res) => {
  const roles = await Rol.find();

  res.status(200).json(roles);
});

// @desc    Create Rol
// @route   POST /api/rol/newRol
// @access  Private
const newRol = asyncHandler(async (req, res) => {
  if (!req.body.nivel && !req.body.descripcion) {
    res.status(400);
    throw new Error("Error - Falta el campo nivel para insertar el rol");
  }

  const rol = await Rol.create({
    nivel: req.body.nivel,
    descripcion: req.body.descripcion,
  });

  res.status(200).json(rol);
});

// @desc    Update Rol
// @route   PUT /api/rol/updateRol/:_id
// @access  Private
const updateRol = asyncHandler(async (req, res) => {
  const rol = await Rol.findById(req.params);

  if (!rol) {
    res.status(400);
    throw new Error("Error - No se encontro el rol");
  }

  const updatedRol = await Rol.findByIdAndUpdate(
    req.params,
    req.body,
    //{ $set: { descripcion: req.body.descripcion } },
    {
      new: true,
    }
  );

  res.status(200).json(updatedRol);
});

// @desc    Delete Rol
// @route   DELETE /api/rol/deleteRol/:id
// @access  Private
const deleteRol = asyncHandler(async (req, res) => {
  const rol = await Rol.findById(req.params);

  if (!rol) {
    res.status(400);
    throw new Error("Error - No se encontro el rol");
  }

  await rol.remove();

  res.status(200).json({ id: req.params });
});

module.exports = {
  getRol,
  newRol,
  updateRol,
  deleteRol,
};
