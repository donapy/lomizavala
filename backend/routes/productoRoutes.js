const express = require("express");
const router = express.Router();
const {
  getProductosActivo,
  getProducto,
  newProducto,
  deleteProducto,
  updateProducto,
} = require("../controller/productoController");

router.get("/getProductosActivo/", getProductosActivo);

router.get("/getProducto/", getProducto);

router.post("/newProducto", newProducto);

router.put("/updateProducto/:_id", updateProducto);

router.delete("/deleteProducto/:_id", deleteProducto);

module.exports = router;
