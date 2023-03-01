const express = require("express");
const router = express.Router();
const {
  getSucursal,
  newSucursal,
  deleteSucursal,
  updateSucursal,
} = require("../controller/sucursalController");

router.get("/getSucursal/", getSucursal);

router.post("/newSucursal", newSucursal);

router.put("/updateSucursal/:_id", updateSucursal);

router.delete("/deleteSucursal/:_id", deleteSucursal);

module.exports = router;
