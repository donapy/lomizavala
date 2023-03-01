const express = require("express");
const router = express.Router();
const {
  getRol,
  newRol,
  deleteRol,
  updateRol,
} = require("../controller/rolController");

router.get("/getRol/", getRol);

router.post("/newRol", newRol);

router.put("/updateRol/:_id", updateRol);

router.delete("/deleteRol/:_id", deleteRol);

module.exports = router;
