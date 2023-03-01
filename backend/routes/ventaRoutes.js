const express = require("express");
const router = express.Router();
const {
  getVentasActiva,
  getVentas,
  newVenta,
  deleteVenta,
  updateVenta,
} = require("../controller/ventaController");

router.get("/getVentas", getVentas);

router.get("/getVentasActiva", getVentasActiva);

router.post("/newVenta", newVenta);

router.put("/updateVenta/:_id", updateVenta);

router.delete("/deleteVenta/:_id", deleteVenta);

module.exports = router;
