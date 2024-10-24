const express = require('express');
const { crearPerfil, obtenerPerfiles, actualizarPerfil, eliminarPerfil } = require('../Perfiles');

const app = express();
const port = 4000;



//NOTIFICACIONES

// Ruta para crear una notificación
app.post('/crear-notificacion', async (req, res) => {
    const { idUsuario, tipo, mensaje } = req.body; // Capturar los datos del body
    const { data, error } = await crearNotificacion(idUsuario, tipo, mensaje);
    
    if (error) {
        res.status(500).send('Error al crear la notificación');
    } else {
        res.status(200).json({ message: 'Notificación creada exitosamente', data });
    }
});

// Ruta para obtener notificaciones por usuario
app.get('/notificaciones/:idUsuario', async (req, res) => {
    const { idUsuario } = req.params; // Capturar el idUsuario de la URL
    const { data, error } = await obtenerNotificacion(idUsuario);

    if (error) {
        res.status(500).send('Error al obtener notificaciones');
    } else {
        res.status(200).json(data);
    }
});

// Ruta para marcar una notificación como leída
app.put('/notificacion/leida/:idNotificacion', async (req, res) => {
    const { idNotificacion } = req.params; // Capturar el idNotificacion de la URL
    const { data, error } = await marcarNotificacionLeida(idNotificacion);

    if (error) {
        res.status(500).send('Error al marcar notificación como leída');
    } else {
        res.status(200).json({ message: 'Notificación marcada como leída', data });
    }
});

// Ruta para marcar todas las notificaciones como leídas para un usuario
app.put('/notificaciones/marcar-todas-leidas/:idUsuario', async (req, res) => {
    const { idUsuario } = req.params; // Capturar el idUsuario de la URL
    const { data, error } = await marcarTodasLeidas(idUsuario);

    if (error) {
        res.status(500).send('Error al marcar todas las notificaciones como leídas');
    } else {
        res.status(200).json({ message: 'Todas las notificaciones marcadas como leídas', data });
    }
});

// Ruta para filtrar notificaciones por tipo
app.get('/notificaciones/:idUsuario/tipo/:tipoNotificacion', async (req, res) => {
    const { idUsuario, tipoNotificacion } = req.params; // Capturar el idUsuario y el tipoNotificacion de la URL
    const { data, error } = await filtrarNotificacionPorTipo(idUsuario, tipoNotificacion);

    if (error) {
        res.status(500).send('Error al filtrar notificaciones');
    } else {
        res.status(200).json(data);
    }
});

// Ruta para contar las notificaciones no leídas
app.get('/notificaciones/recuento/:idUsuario', async (req, res) => {
    const { idUsuario } = req.params; // Capturar el idUsuario de la URL
    const { count, error } = await recuentoDeNotiLeidas(idUsuario);

    if (error) {
        res.status(500).send('Error al obtener el recuento de notificaciones no leídas');
    } else {
        res.status(200).json({ recuento: count });
    }
});
