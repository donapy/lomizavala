const express = require("express");
const router = express.Router();
const {
  getProveedor,
  newProveedor,
  deleteProveedor,
  updateProveedor,
} = require("../controller/proveedorController");

router.get("/getProveedor", getProveedor);

router.post("/newProveedor", newProveedor);

router.put("/updateProveedor/:id", updateProveedor);

router.delete("/deleteProveedor/:id", deleteProveedor);

module.exports = router;
