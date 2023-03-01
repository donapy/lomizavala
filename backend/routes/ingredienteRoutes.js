const express = require("express");
const router = express.Router();
const {
  getIngrediente,
  newIngrediente,
  deleteIngrediente,
  updateIngrediente,
} = require("../controller/ingredienteController");

router.get("/getIngrediente", getIngrediente);

router.post("/newIngrediente", newIngrediente);

router.put("/updateIngrediente/:_id", updateIngrediente);

router.delete("/deleteIngrediente/:_id", deleteIngrediente);

module.exports = router;
