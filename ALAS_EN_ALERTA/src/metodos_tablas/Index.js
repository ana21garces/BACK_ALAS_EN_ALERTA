const express = require('express');
const { crearUsuarios, obtenerUsuarios, actualizarUsuarios, eliminarUsuarios } = require('./Usuarios');
const { crearPerfil, obtenerPerfiles, actualizarPerfil, eliminarPerfil } = require('./metodos_tablas/Perfiles');

const app = express();
const port = 4000;

app.use(express.json()); // Middleware para manejar JSON

//USUARIOS 

// Endpoint para crear usuarios
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


//PERFILES
// Endpoint para crear un perfil
app.post('/crear-perfil', async (req, res) => {
    const { id_usuario, bio, foto_perfil, preferencias_notificaciones } = req.body;

    try {
        const { data, error } = await supabase
            .from('perfiles')
            .insert([{ id_usuario, bio, foto_perfil, preferencias_notificaciones }])
            .select();

        if (error) {
            console.error('Error al crear perfil:', error);
            return res.status(400).json({ error: 'Error al crear perfil' });
        }

        console.log('Perfil creado correctamente:', data);
        res.status(201).json({ message: 'Perfil creado correctamente', perfil: data[0] });
    } catch (error) {
        console.error('Error en crearPerfil:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para obtener datos del perfil
app.get('/obtener-perfil', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('perfiles')
            .select('*');

        if (error) {
            console.error('Error al obtener perfil:', error);
            return res.status(400).json({ error: 'Error al obtener perfil' });
        }

        console.log('Usuarios:', data);
        res.status(200).json(data); // Devuelve todos los perfiles
    } catch (error) {
        console.error('Error en obtenerPerfil:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para actualizar un perfil
app.put('/actualizar-perfil/:id_usuario', async (req, res) => {
    const id_usuario = req.params.id_usuario;
    const { nuevaBio, nuevaFotoPerfil, nuevasPreferencias } = req.body;

    try {
        const { data, error } = await supabase
            .from('perfiles')
            .update({
                bio: nuevaBio,
                foto_perfil: nuevaFotoPerfil,
                preferencias_notificaciones: nuevasPreferencias
            })
            .eq('id_usuario', id_usuario)
            .select();

        if (error) {
            console.error('Error al actualizar perfil:', error);
            return res.status(400).json({ error: 'Error al actualizar perfil' });
        }

        console.log('Perfil actualizado correctamente:', data);
        res.status(200).json({ message: 'Perfil actualizado correctamente', perfil: data[0] });
    } catch (error) {
        console.error('Error en actualizarPerfil:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para eliminar un perfil
app.delete('/eliminar-perfil/:id_perfil', async (req, res) => {
    const id_perfil = req.params.id_perfil;

    try {
        if (!id_perfil) {
            console.error('El ID del perfil no puede estar vacío.');
            return res.status(400).json({ error: 'El ID del perfil no puede estar vacío.' });
        }

        const { data, error } = await supabase
            .from('perfiles')
            .delete()
            .eq('id_perfil', id_perfil);

        if (error) {
            console.error('Error al eliminar perfil:', error);
            return res.status(400).json({ error: 'Error al eliminar perfil' });
        }

        console.log('Perfil eliminado correctamente:', data);
        res.status(200).json({ message: 'Perfil eliminado correctamente', resultado: data });
    } catch (error) {
        console.error('Error en eliminarPerfil:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

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

// ------------------- ENDPOINTS DE AVES -------------------

// Endpoint para crear un registro de ave
app.post('/crear-ave', async (req, res) => {
    const { nombre_ave, descripcion_ave } = req.body;
    const nuevaAve = await crearAve(nombre_ave, descripcion_ave);
    if (nuevaAve) {
        res.status(201).json(nuevaAve);
    } else {
        res.status(500).json({ message: 'Error al crear el ave' });
    }
});

// Endpoint para obtener todas las aves
app.get('/obtener-aves', async (req, res) => {
    const aves = await obtenerAves();
    if (aves) {
        res.status(200).json(aves);
    } else {
        res.status(500).json({ message: 'Error al obtener aves' });
    }
});

// Endpoint para actualizar un ave
app.put('/actualizar-ave', async (req, res) => {
    const { id_ave, nombre_ave, descripcion_ave } = req.body;
    const aveActualizada = await actualizarAve(id_ave, nombre_ave, descripcion_ave);
    if (aveActualizada) {
        res.status(200).json(aveActualizada);
    } else {
        res.status(500).json({ message: 'Error al actualizar el ave' });
    }
});

// Endpoint para eliminar un ave
app.delete('/eliminar-ave', async (req, res) => {
    const { id_ave } = req.body;
    const resultado = await eliminarAve(id_ave);
    if (resultado) {
        res.status(200).json({ message: `Ave con ID ${id_ave} eliminada correctamente.` });
    } else {
        res.status(500).json({ message: 'Error al eliminar el ave' });
    }
});

// ------------------- ENDPOINTS DE AVISTAMIENTOS -------------------

// Endpoint para crear un avistamiento
app.post('/crear-avistamiento', async (req, res) => {
    const { descripcion_avistamiento, foto_avistamiento } = req.body;
    const nuevoAvistamiento = await crearAvistamiento(descripcion_avistamiento, foto_avistamiento);
    if (nuevoAvistamiento) {
        res.status(201).json(nuevoAvistamiento);
    } else {
        res.status(500).json({ message: 'Error al crear el avistamiento' });
    }
});

// Endpoint para obtener todos los avistamientos
app.get('/obtener-avistamientos', async (req, res) => {
    const avistamientos = await obtenerAvistamientos();
    if (avistamientos) {
        res.status(200).json(avistamientos);
    } else {
        res.status(500).json({ message: 'Error al obtener avistamientos' });
    }
});

// Endpoint para actualizar un avistamiento
app.put('/actualizar-avistamiento', async (req, res) => {
    const { id_avistamiento, descripcion_avistamiento, foto_avistamiento } = req.body;
    const avistamientoActualizado = await actualizarAvistamiento(id_avistamiento, descripcion_avistamiento, foto_avistamiento);
    if (avistamientoActualizado) {
        res.status(200).json(avistamientoActualizado);
    } else {
        res.status(500).json({ message: 'Error al actualizar el avistamiento' });
    }
});

// Endpoint para eliminar un avistamiento
app.delete('/eliminar-avistamiento', async (req, res) => {
    const { id_avistamiento } = req.body;
    const resultado = await eliminarAvistamiento(id_avistamiento);
    if (resultado) {
        res.status(200).json({ message: `Avistamiento con ID ${id_avistamiento} eliminado correctamente.` });
    } else {
        res.status(500).json({ message: 'Error al eliminar el avistamiento' });
    }
});

// ------------------- ENDPOINTS DE LUGARES -------------------

// Endpoint para crear un lugar
app.post('/crear-lugar', async (req, res) => {
    const { nombre_lugar, descripcion_lugar } = req.body;
    const nuevoLugar = await crearLugar(nombre_lugar, descripcion_lugar);
    if (nuevoLugar) {
        res.status(201).json(nuevoLugar);
    } else {
        res.status(500).json({ message: 'Error al crear el lugar' });
    }
});

// Endpoint para obtener todos los lugares
app.get('/obtener-lugares', async (req, res) => {
    const lugares = await obtenerLugares();
    if (lugares) {
        res.status(200).json(lugares);
    } else {
        res.status(500).json({ message: 'Error al obtener lugares' });
    }
});

// Endpoint para actualizar un lugar
app.put('/actualizar-lugar', async (req, res) => {
    const { id_lugar, nombre_lugar, descripcion_lugar } = req.body;
    const lugarActualizado = await actualizarLugar(id_lugar, nombre_lugar, descripcion_lugar);
    if (lugarActualizado) {
        res.status(200).json(lugarActualizado);
    } else {
        res.status(500).json({ message: 'Error al actualizar el lugar' });
    }
});

// Endpoint para eliminar un lugar
app.delete('/eliminar-lugar', async (req, res) => {
    const { id_lugar } = req.body;
    const resultado = await eliminarLugar(id_lugar);
    if (resultado) {
        res.status(200).json({ message: `Lugar con ID ${id_lugar} eliminado correctamente.` });
    } else {
        res.status(500).json({ message: 'Error al eliminar el lugar' });
    }
});


// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor ejecutándose en el puerto ${4000}`);
});
