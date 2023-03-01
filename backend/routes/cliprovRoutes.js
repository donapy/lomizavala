// merged cliente and proveedor
const express = require("express");
const router = express.Router();
const {
  getCliente,
  getProveedor,
  newCliProv,
  deleteCliProv,
  updateCliProv,
} = require("../controller/cliprovController");

router.get("/getCliente/", getCliente);

router.get("/getProveedor/", getProveedor);

router.post("/newCliProv", newCliProv);

router.put("/updateCliProv/:_id", updateCliProv);

router.delete("/deleteCliProv/:_id", deleteCliProv);

module.exports = router;
