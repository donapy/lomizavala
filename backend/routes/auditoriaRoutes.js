const express = require("express");
const router = express.Router();
const {
  getAuditoria,
  newAuditoria,
  // deleteAuditoria,
  // updateAuditoria,
} = require("../controller/auditoriaController");

router.get("/getAuditoria", getAuditoria);

router.post("/newAuditoria", newAuditoria);

// router.put("/updateAuditoria/:_id", updateAuditoria);

// router.delete("/deleteAuditoria/:_id", deleteAuditoria);

module.exports = router;
