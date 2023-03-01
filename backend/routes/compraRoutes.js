const express = require("express");
const router = express.Router();
const {
  getCompra,
  newCompra,
  deleteCompra,
  updateCompra,
} = require("../controller/compraController");

router.get("/getCompra", getCompra);

router.post("/newCompra", newCompra);

router.put("/updateCompra/:_id", updateCompra);

router.delete("/deleteCompra/:_id", deleteCompra);

module.exports = router;
