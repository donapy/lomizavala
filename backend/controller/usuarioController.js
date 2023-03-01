const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcypt = require("bcryptjs");

const Usuario = require("../models/usuarioModel");

// @desc    Get Usuario
// @route   GET /api/usuario/getUsuario/:_id
// @access  Private
const getUsuario = asyncHandler(async (req, res) => {
  const user = await Usuario.find({ ci: req.params._id });

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "Usuario no encontrado" });
  }
});

// @desc    Get Usuarios
// @route   POST /api/usuario/getUsuarios
// @access  Public
const getUsuarios = asyncHandler(async (req, res) => {
  const usuarios = await Usuario.find();
  res.status(200).json(usuarios);
});

// @desc    Create Usuario
// @route   POST /api/usuario/newUsuario
// @access  Public
const newUsuario = asyncHandler(async (req, res) => {
  const {
    ci,
    nombre,
    password,
    celular,
    correo,
    direccion,
    cuentabanc1,
    entidadbanc1,
    cibanc1,
    nombrebanc1,
    contactososnombre,
    contactososcelular,
    idsucursal,
    idrol,
  } = req.body;
  if (!nombre || !ci || !password) {
    res.status(400).json({ message: "Faltan campos claves" });
  }

  //check if user exists
  const usuarioexiste = await Usuario.findOne({ ci });
  if (usuarioexiste) {
    res.status(400).json({ message: "El usuario ya existe" });
  }

  //hash password
  const salt = await bcypt.genSalt(10);
  const hashedPassword = await bcypt.hash(password, salt);

  const usuario = await Usuario.create({
    ci,
    nombre,
    password: hashedPassword,
    celular,
    correo,
    direccion,
    cuentabanc1,
    entidadbanc1,
    cibanc1,
    nombrebanc1,
    contactososnombre,
    contactososcelular,
    idsucursal,
    idrol,
  });

  if (usuario) {
    res.status(201).json({
      success: true,
      id: usuario._id,
      nombre: usuario.nombre,
      idsucursal: usuario.idsucursal,
      idrol: usuario.idrol,
      token: generateToken(usuario._id),
    });
  } else {
    res.status(400).json({ message: "No se pudo crear el usuario" });
  }
});

// @desc    Update Usuario
// @route   PUT /api/usuario/updateUsuario/:id
// @access  Private
const updateUsuario = asyncHandler(async (req, res) => {
  //VERIFICAR
  const usuario = await Usuario.findById(req.params);

  if (!usuario) {
    res.status(400).json({ message: "No se encontro el usuario" });
  }

  const updatedUsuario = await Usuario.findByIdAndUpdate(req.params, req.body, {
    new: true,
  });

  res.status(200).json(updatedUsuario);
});

// @desc    Delete Usuario
// @route   DELETE /api/usuario/deleteUsuario/:id
// @access  Private
const deleteUsuario = asyncHandler(async (req, res) => {
  const usuario = await Usuario.findById(req.params);

  if (!usuario) {
    res.status(400).json({ message: "Error - No se encontro el usuario" });
  }

  await usuario.remove();

  res.status(200).json({ id: req.params });
});

// @desc    Login Usuario
// @route   POST /api/usuario/login
// @access  Public
const loginUsuario = asyncHandler(async (req, res) => {
  const { ci, password } = req.body;
  // console.log(ci + " - " + password);
  //check for user ci
  const usuario = await Usuario.findOne({ ci });

  //check if user exists and password is correct
  if (usuario && (await bcypt.compare(password, usuario.password))) {
    res.status(200).json({
      id: usuario._id,
      nombre: usuario.nombre,
      // idsucursal: usuario.idsucursal,
      // idrol: usuario.idrol,
      // token: generateToken(usuario._id),
    });
  } else {
    res.status(400).json({ message: "No coinciden las credenciales" });
  }
});

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports = {
  getUsuario,
  newUsuario,
  updateUsuario,
  deleteUsuario,
  loginUsuario,
  getUsuarios,
};
