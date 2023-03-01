const express = require("express");
const router = express.Router();
const {
  getCliente,
  newCliente,
  deleteCliente,
  updateCliente,
} = require("../controller/clienteController");

router.get("/getCliente", getCliente);

router.post("/newCliente", newCliente);

router.put("/updateCliente/:_id", updateCliente);

router.delete("/deleteCliente/:_id", deleteCliente);

module.exports = router;
