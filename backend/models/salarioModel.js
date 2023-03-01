const mongoose = require("mongoose");

const salarioSchema = mongoose.Schema(
  {
    //id
    descripcion: {
      type: String,
      default: "Sin descripcion",
    },
    total: {
      type: Number,
      require: [true, `Porfavor agregar un total al salario`],
    },
    fecha: {
      type: Date,
      default: Date.now,
    },
    forma: {
      type: String,
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

module.exports = mongoose.model("salario", salarioSchema);
