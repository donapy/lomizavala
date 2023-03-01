const asyncHandler = require("express-async-handler");

const Producto = require("../models/productoModel");

// @desc    Get Producto
// @route   GET /api/producto/getProducto
// @access  Public
const getProducto = asyncHandler(async (req, res) => {
  const productos = await Producto.find();

  res.status(200).json(productos);
});

// @desc    Get Producto
// @route   GET /api/producto/getProductosActivo
// @access  Public
const getProductosActivo = asyncHandler(async (req, res) => {
  const productos = await Producto.aggregate([
    { $match: { activo: true } },
    {
      $project: {
        _id: 0,
        id: "$_id",
        name: "$nombre",
        price: "$precio",
      },
    },
  ]);

  res.status(200).json(productos);
});

// @desc    Create Producto
// @route   POST /api/producto/newProducto
// @access  Private
const newProducto = asyncHandler(async (req, res) => {
  if (!req.body.nombre) {
    res.status(400);
    throw new Error("Error - Falta el campo nombre para insertar el producto");
  }

  const producto = await Producto.create({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    cantidad: req.body.cantidad,
    precio: req.body.precio,
    imagensrc: req.body.imagensrc,
    tamano: req.body.tamano,
    categoria: req.body.categoria,
  });

  res.status(201).json(producto);
});

// @desc    Update Producto
// @route   PUT /api/producto/updateProducto/:id
// @access  Private
const updateProducto = asyncHandler(async (req, res) => {
  const producto = await Producto.findById(req.params);

  if (!producto) {
    res.status(400);
    throw new Error("Error - No se encontro el producto");
  }

  const updatedProducto = await Producto.findByIdAndUpdate(
    req.params,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedProducto);
});

// @desc    Delete Producto
// @route   DELETE /api/producto/deleteProducto/:id
// @access  Private
const deleteProducto = asyncHandler(async (req, res) => {
  const producto = await Producto.findById(req.params);

  if (!producto) {
    res.status(400);
    throw new Error("Error - No se encontro el producto");
  }

  await producto.remove();

  res.status(200).json({ id: req.params });
});

module.exports = {
  getProductosActivo,
  getProducto,
  newProducto,
  updateProducto,
  deleteProducto,
};
