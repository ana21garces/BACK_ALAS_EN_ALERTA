const express = require('express'); // Importar express
const { register, login } = require('./controladores');

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', register);

// Ruta para iniciar sesión
router.post('/login', login);

module.exports = router;