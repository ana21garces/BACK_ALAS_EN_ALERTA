const express = require('express');
const { crearUsuarios, obtenerUsuarios, actualizarUsuarios, eliminarUsuarios } = require('./Usuarios');

const app = express();
const port = 4000;

app.use(express.json()); // Middleware para manejar JSON

//USUARIOS 

/* Endpoint para crear usuarios
app.post('/crear-usuario', async (req, res) => {
    // Extraer los datos del cuerpo de la solicitud
    const { nombre_usuario, correo_electronico, contraseña, tipo_usuario } = req.body;

    // Llamar a la función crearUsuarios
    const id_usuario = await crearUsuarios(nombre_usuario, correo_electronico, contraseña, tipo_usuario);

    if (id_usuario) {
        res.status(201).json({ message: 'Usuario creado con éxito', id_usuario: id_usuario });
    } else {
        res.status(500).json({ message: 'Error al crear el usuario' });
    }

});

// Endpoint para obtener todos los usuarios
app.get('/obtener-usuarios', async (req, res) => {
    const usuarios = await obtenerUsuarios();
    if (usuarios) {
        res.status(200).json(usuarios);
    } else {
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
});
// Endpoint para actualizar un usuario
app.put('/actualizar-usuario', async (req, res) => {
    const { id_usuario, tipo_usuario } = req.body;
    const updatedUser = await actualizarUsuarios(id_usuario, tipo_usuario);
    if (updatedUser) {
        res.status(200).json(updatedUser);
    } else {
        res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
});

// Endpoint para eliminar un usuario
app.delete('/eliminar-usuario', async (req, res) => {
    const { id_usuario } = req.body;
    const result = await eliminarUsuarios(id_usuario);
    if (result) {
        res.status(200).json({ message: `Usuario con ID ${id_usuario} eliminado correctamente.` });
    } else {
        res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
});
*/