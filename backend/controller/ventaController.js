const asyncHandler = require("express-async-handler");

const Venta = require("../models/ventaModel");
const Cliente = require("../models/cliprovModel");

// @desc    Get Venta
// @route   GET /api/venta/getVentas
// @access  Private
const getVentas = asyncHandler(async (req, res) => {
  const ventas = await Venta.find();

  res.status(200).json(ventas);
});

// @desc    Get Venta Activa
// @route   GET /api/venta/getVentasActiva
// @access  Private
const getVentasActiva = asyncHandler(async (req, res) => {
  // const ventas = await Venta.find({ entregado: false });
  const ventas = await Venta.find({ entregado: false }).populate(
    "items.idproducto"
  );

  // console.log(ventas);
  res.status(200).json(ventas);
});

// @desc    Create Venta
// @route   POST /api/venta/newVenta
// @access  Private
const newVenta = asyncHandler(async (req, res) => {
  // if (
  //   !req.body.tipo || //local-delivery-carryout-llevar
  //   !req.body.pagado || //true-false
  //   !req.body.totalgeneral ||
  //   !req.body.nrofactura ||
  //   !req.body.items ||
  //   !req.body.idusuario ||
  //   !req.body.idsucursal ||
  //   !req.body.idcliente
  // ) {
  //   res.status(400);
  //   throw new Error("Error - Faltan campos para insertar la venta");
  // }

  const cliente = await Cliente.find({ ruc: req.body.ruc, cliente: true });
  // console.log(cliente.length);
  if (cliente.length === 0) {
    return res
      .status(404)
      .json({ message: "El RUC no corresponde a ningun cliente" });
  }

  const venta = await Venta.create({
    nrofactura: req.body.nrofactura,
    nombrepedido: req.body.nombrepedido,
    condicion: req.body.condicion,
    tipo: req.body.tipo,
    pagado: req.body.pagado,
    totaliva5: req.body.totaliva5,
    totaliva10: req.body.totaliva10,
    totalexenta: req.body.totalexenta,
    totalgeneral: req.body.totalgeneral,
    items: req.body.items, //verificar si esta bien
    idcliente: cliente._id,
    idusuario: req.body.idusuario,
    idsucursal: req.body.idsucursal,
  });

  if (venta) {
    res.status(201).json(venta);
  } else {
    res.status(400).json({ message: "Error al registrar la orden" });
  }
});

// @desc    Update Venta
// @route   PUT /api/venta/updateVenta/:id
// @access  Private
const updateVenta = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const venta = await Venta.findById(req.params);
  // console.log(venta.entregado);
  const updatedVenta = await Venta.findByIdAndUpdate(req.params, req.body, {
    new: true,
  });

  res.status(200).json({ message: "Se ha actualizado el estado del pedido" });
});

// @desc    Delete Venta
// @route   DELETE /api/venta/deleteVenta/:id
// @access  Private
const deleteVenta = asyncHandler(async (req, res) => {
  const venta = await Venta.findById(req.params);

  if (!venta) {
    res.status(400);
    throw new Error("Error - No se encontro la venta");
  }

  await venta.remove();

  res.status(200).json({ id: req.params });
});

module.exports = {
  getVentasActiva,
  getVentas,
  newVenta,
  updateVenta,
  deleteVenta,
};
