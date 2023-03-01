const express = require("express");
const router = express.Router();
const {
  getUsuario,
  newUsuario,
  deleteUsuario,
  updateUsuario,
  loginUsuario,
  getUsuarios,
} = require("../controller/usuarioController");

const { protect } = require("../middleware/authMiddleware");

router.get("/getUsuarios", getUsuarios);

router.get("/getUsuario/:_id", getUsuario);

router.post("/newUsuario", newUsuario);

router.put("/updateUsuario/:_id", updateUsuario);

router.delete("/deleteUsuario/:_id", deleteUsuario);

router.post("/loginUsuario", loginUsuario);

module.exports = router;
