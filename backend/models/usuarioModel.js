const mongoose = require("mongoose");

const usuarioSchema = mongoose.Schema(
  {
    //id
    ci: {
      type: String,
      require: [true, `Porfavor agregar un ci al usuario`],
      unique: true,
    },
    nombre: {
      type: String,
      require: [true, `Porfavor agregar un nombre al usuario`],
    },
    password: {
      type: String,
      require: [true, `Porfavor agregar una contraseña al usuario`],
    },
    celular: {
      type: String,
    },
    correo: {
      type: String,
    },
    direccion: {
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
    contactososnombre: {
      type: String,
    },
    contactososcelular: {
      type: String,
    },
    idsucursal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sucursal",
    },
    idrol: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "rol",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("usuario", usuarioSchema);
