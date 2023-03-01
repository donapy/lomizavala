const express = require("express");
const router = express.Router();
const {
  getTimbrado,
  newTimbrado,
  deleteTimbrado,
  updateTimbrado,
} = require("../controller/timbradoController");

router.get("/getTimbrado/", getTimbrado);

router.post("/newTimbrado", newTimbrado);

router.put("/updateTimbrado/:_id", updateTimbrado);

router.delete("/deleteTimbrado/:_id", deleteTimbrado);

module.exports = router;
