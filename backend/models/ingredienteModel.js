const mongoose = require("mongoose");

const ingredienteSchema = mongoose.Schema(
  {
    //id
    nombre: {
      type: String,
      require: [true, `Porfavor agregar un nombre al ingrediente`],
      unique: true,
    },
    descripcion: {
      type: String,
      default: "Sin descripcion",
    },
    cantidad: {
      type: Number,
      default: 0,
    },
    imagensrc: {
      type: String,
    },
    precio: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ingrediente", ingredienteSchema);
