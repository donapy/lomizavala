const asyncHandler = require("express-async-handler");

const Timbrado = require("../models/timbradoModel");

// @desc    Get Timbrado
// @route   GET /api/timbrado/getTimbrado
// @access  Private
const getTimbrado = asyncHandler(async (req, res) => {
  const timbrados = await Timbrado.find();

  res.status(200).json(timbrados);
});

// @desc    Create Timbrado
// @route   POST /api/timbrado/newTimbrado
// @access  Private
const newTimbrado = asyncHandler(async (req, res) => {
  if (
    !req.body.nrotimbrado &&
    !req.body.fechainicio &&
    !req.body.fechafin &&
    !req.body.idsucursal &&
    !req.body.nrodesde &&
    !req.body.nrohasta &&
    !req.body.ruc
  ) {
    res.status(400);
    throw new Error("Error - Faltan campos para insertar el timbrado");
  }

  const timbrado = await Timbrado.create({
    nrotimbrado: req.body.nrotimbrado,
    fechainicio: req.body.fechainicio,
    fechafin: req.body.fechafin,
    nrodesde: req.body.nrodesde,
    nrohasta: req.body.nrohasta,
    ruc: req.body.ruc,
    idsucursal: req.body.idsucursal,
  });

  res.status(200).json(timbrado);
});

// @desc    Update Timbrado
// @route   PUT /api/rol/updateTimbrado/:_id
// @access  Private
const updateTimbrado = asyncHandler(async (req, res) => {
  const timbrado = await Timbrado.findById(req.params);

  if (!timbrado) {
    res.status(400);
    throw new Error("Error - No se encontro el timbrado");
  }

  const updatedTimbrado = await Timbrado.findByIdAndUpdate(
    req.params,
    req.body,
    //{ $set: { descripcion: req.body.descripcion } },
    {
      new: true,
    }
  );

  res.status(200).json(updatedTimbrado);
});

// @desc    Delete Timbrado
// @route   DELETE /api/timbrado/deleteTimbrado/:id
// @access  Private
const deleteTimbrado = asyncHandler(async (req, res) => {
  const timbrado = await Timbrado.findById(req.params);

  if (!timbrado) {
    res.status(400);
    throw new Error("Error - No se encontro el timbrado");
  }

  await timbrado.remove();

  res.status(200).json({ id: req.params });
});

module.exports = {
  getTimbrado,
  newTimbrado,
  updateTimbrado,
  deleteTimbrado,
};
