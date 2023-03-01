const mongoose = require("mongoose");

const compraSchema = mongoose.Schema(
  {
    //id
    fecha: {
      type: Date,
      default: Date.now,
    },
    totaliva5: {
      type: Number,
      default: 0,
    },
    totaliva10: {
      type: Number,
      default: 0,
    },
    totalexenta: {
      type: Number,
      default: 0,
    },
    totalgeneral: {
      type: Number,
      default: 0,
    },
    items: [
      {
        idgrendiente: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ingrediente",
        },
        descripcion: {
          type: String,
        },
        cantidad: {
          type: Number,
          default: 0,
        },
        descripcion: {
          type: String,
        },
        precio: {
          type: Number,
          default: 0,
        },
        iva5: {
          type: Number,
          default: 0,
        },
        iva10: {
          type: Number,
          default: 0,
        },
        exenta: {
          type: Number,
          default: 0,
        },
        totalingrediente: {
          type: Number,
          default: 0,
        },
      },
    ],
    idproveedor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "proveedor",
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

module.exports = mongoose.model("compra", compraSchema);
