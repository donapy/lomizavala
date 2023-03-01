const mongoose = require("mongoose");

const rolSchema = mongoose.Schema(
  {
    //id
    nivel: {
      type: Number,
      require: [true, `Porfavor agregar un nivel al rol`],
      min: 1,
      max: 5,
      unique: true,
    },
    descripcion: {
      type: String,
      default: "Sin descripcion",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("rol", rolSchema);
