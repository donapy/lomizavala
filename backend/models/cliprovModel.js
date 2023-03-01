const mongoose = require("mongoose");

const cliprovSchema = mongoose.Schema(
  {
    //id
    ruc: {
      type: String,
      unique: true,
      require: true,
    },
    nombre: {
      type: String,
      require: [true, `Porfavor agregar un nombre`],
    },
    descripcion: {
      type: String,
    },
    celular: {
      type: Number,
    },
    direccion: {
      type: String,
    },
    correo: {
      type: String,
    },
    cuentabanc1: {
      type: String,
    },
    entidadbanc1: {
      type: String,
    },
    cibanc1: {
      type: String,
    },
    nombrebanc1: {
      type: String,
    },
    cliente: {
      type: Boolean,
      default: true,
    },
    proveedor: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("cliprov", cliprovSchema);
