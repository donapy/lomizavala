const mongoose = require("mongoose");

const proveedorSchema = mongoose.Schema(
  {
    //id
    ruc: {
      type: String,
      unique: true,
    },
    nombre: {
      type: String,
      require: [true, `Porfavor agregar un nombre al proveedor`],
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("proveedor", proveedorSchema);
