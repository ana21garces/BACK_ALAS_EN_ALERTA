const express = require('express');
const { crearPerfil, obtenerPerfiles, actualizarPerfil, eliminarPerfil } = require('../Perfiles');

const app = express();
const port = 4000;



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