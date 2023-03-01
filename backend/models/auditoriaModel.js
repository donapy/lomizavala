const mongoose = require("mongoose");

const auditoriaSchema = mongoose.Schema(
  {
    //id
    descripcion: {
      type: String,
    },
    modulo: {
      type: String,
    },
    accion: {
      type: String,
    },
    fecha: {
      type: Date,
      default: Date.now,
    },
    idusuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usuario",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("auditoria", auditoriaSchema);
