const mongoose = require("mongoose");

const timbradoSchema = mongoose.Schema(
  {
    //id
    nrotimbrado: {
      type: String,
      require: true,
      unique: true,
    },
    descripcion: {
      type: String,
      default: "Sin descripcion",
    },
    fechainicio: {
      type: Date,
    },
    fechafin: {
      type: Date,
    },
    ruc: {
      type: String,
    },
    nrodesde: {
      type: String,
    },
    nrohasta: {
      type: String,
    },
    idsucursal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sucursal",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("timbrado", timbradoSchema);
