const mongoose = require("mongoose");

const productoSchema = mongoose.Schema(
  {
    //id
    nombre: {
      type: String,
      require: [true, `Porfavor agregar un nombre al producto`],
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
    precio: {
      type: Number,
      default: 0,
    },
    imagensrc: {
      type: String,
    },
    tamano: {
      type: String,
    },
    categoria: {
      type: String,
    },
    activo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("producto", productoSchema);
