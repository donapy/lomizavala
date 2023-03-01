const mongoose = require("mongoose");

const sucursalSchema = mongoose.Schema(
  {
    //id
    nombre: {
      type: String,
      require: [true, `Porfavor agregar un nombre al sucursal`],
      unique: true,
    },
    descripcion: {
      type: String,
      default: "Sin descripcion",
    },
    direccion: {
      type: String,
    },
    ciudad: {
      type: String,
    },
    telefono: {
      type: Number,
    },
    celular: {
      type: Number,
    },
    correo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("sucursal", sucursalSchema);
