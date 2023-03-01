const mongoose = require("mongoose");

const ventaSchema = mongoose.Schema(
  {
    //id
    fecha: {
      type: Date,
      default: Date.now,
    },
    nrofactura: {
      type: String,
    },
    idcliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cliprov",
    },
    nombrepedido: {
      type: String,
    },
    condicion: {
      type: String,
      values: ["contado", "credito"],
      default: "contado",
    },
    tipo: {
      type: String,
      values: ["local", "delivery", "carryout", "llevar", "otro"],
    },
    pagado: {
      type: Boolean,
      default: false,
    },
    entregado: {
      type: Boolean,
      default: false,
    },
    items: [
      {
        idproducto: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "producto",
        },
        cantidad: {
          type: Number,
          default: 1,
        },
        descripcion: {
          type: String,
        },
        agregados: [
          {
            idingrediente: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "ingrediente",
            },
            cantidad: {
              type: Number,
              default: 1,
            },
            totalagregado: {
              type: Number, //precio * cantidad
            },
          },
        ],
        subtotalproducto: {
          type: Number, //sumatoria de agregados + (precio*cantidad)
        },
        estadoproducto: {
          type: String,
          values: ["en espera", "terminado", "cancelado", "entregado"],
          default: "en espera",
        },
      },
    ],
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
      type: Number, //sumatoria de subtotalproducto de los productos
      default: 0,
    },
    idusuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usuario",
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

module.exports = mongoose.model("venta", ventaSchema);
