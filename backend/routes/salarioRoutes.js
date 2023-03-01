const express = require("express");
const router = express.Router();
const {
  getSalario,
  newSalario,
  deleteSalario,
  updateSalario,
} = require("../controller/salarioController");

router.get("/getSalario", getSalario);

router.post("/newSalario", newSalario);

router.put("/updateSalario/:_id", updateSalario);

router.delete("/deleteSalario/:_id", deleteSalario);

module.exports = router;
