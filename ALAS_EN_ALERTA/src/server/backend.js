const express = require('express');
const app = express();
const rutasUsuarios = require('../metodos_tablas/rutas/rutasUsuarios');
const rutasPerfiles = require('../metodos_tablas/rutas/rutasPerfiles');
const loginUsuario = require('../autenticacion/loginAuth');
const registrarUsuario = require ('../autenticacion/registerAuth');

require('dotenv').config();


app.use(express.json());

// Rutas
app.use('/usuarios', rutasUsuarios);
app.use('/perfiles', rutasPerfiles);
router.post('/login', loginUsuario);
router.post('/register', registrarUsuario);



const port = 4000;
app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});