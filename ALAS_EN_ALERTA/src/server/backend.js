const express = require('express');
const app = express();
const { loginAuth } = require('../autenticacion/loginAuth');
const { registerAuth } = require('../autenticacion/registerAuth');

require('dotenv').config();


app.use(express.json());

// Rutas
app.use('/usuarios', rutasUsuarios);
app.use('/perfiles', rutasPerfiles);


// Endpoint de inicio de sesión
app.post('/login', async (req, res) => {
    const { correo_electronico, contraseña } = req.body;
    const result = await loginAuth(correo_electronico, contraseña);
    res.json(result);
});

// Endpoint de registro
app.post('/register', async (req, res) => {
    const { nombre_usuario, correo_electronico, contraseña, tipo_usuario } = req.body;
    const result = await registerAuth(nombre_usuario, correo_electronico, contraseña, tipo_usuario);
    res.json(result);
});


const port = 4000;
app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});