const asyncHandler = require("express-async-handler");
const Auditoria = require("../models/auditoriaModel");

// @desc    Get Auditoria
// @route   GET /api/auditoria/getAuditoria
// @access  Private
const getAuditoria = asyncHandler(async (req, res) => {
  const auditorias = await Auditoria.find();
  res.status(200).json(auditorias);
});

// @desc    Create Auditoria
// @route   POST /api/auditoria/newAuditoria
// @access  Private
const newAuditoria = asyncHandler(async (req, res) => {
  if (
    !req.body.descripcion ||
    !req.body.modulo ||
    !req.body.accion ||
    !req.body.idusuario ||
    !req.body.idsucursal
  ) {
    res.status(400);
    throw new Error("Error - Falta algunos campos para insertar una auditoria");
  }

  const auditoria = await Auditoria.create({
    descripcion: req.body.descripcion,
    modulo: req.body.modulo,
    accion: req.body.accion,
    idusuario: req.body.idusuario,
    idsucursal: req.body.idsucursal,
  });
  res.status(200).json(auditoria);
});

// @desc    Update Auditoria
// @route   PUT /api/auditoria/updateAuditoria/:id
// @access  Private
// const updateAuditoria = asyncHandler(async (req, res) => {
//   const auditoria = await Auditoria.findById(req.params.id);

//   if (!auditoria) {
//     res.status(400);
//     throw new Error("Error - No se encontro la auditoria");
//   }

//   const updatedAuditoria = await Auditoria.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     {
//       new: true,
//     }
//   );

//   res.status(200).json(updatedAuditoria);
// });

// @desc    Delete Auditoria
// @route   DELETE /api/auditoria/deleteAuditoria/:id
// @access  Private
// const deleteAuditoria = asyncHandler(async (req, res) => {
//   const auditoria = await Auditoria.findById(req.params.id);

//   if (!auditoria) {
//     res.status(400);
//     throw new Error("Error - No se encontro la auditoria");
//   }

//   await auditoria.remove();

//   res.status(200).json({ id: req.params.id });
// });

module.exports = {
  getAuditoria,
  newAuditoria,
  // updateAuditoria,
  // deleteAuditoria,
};
