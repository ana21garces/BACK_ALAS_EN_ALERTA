const supabase = require('./conexion');
const express = require('express');


// Función para obtener el último id_usuario disponible
async function obtenerUltimoUsuario() {
    try {
        // Obtener el último usuario creado (suponiendo que los id_usuario están en orden ascendente)
        const { data, error } = await supabase
            .from('usuarios')
            .select('id_usuario')
            .order('id_usuario', { ascending: false })  // Ordenar de manera descendente para obtener el último
            .limit(1)  // Limitar a un solo resultado
            .single();

        if (error || !data) {
            console.error('Error al obtener el último usuario:', error);
            return null;
        }

        return data.id_usuario;
    } catch (error) {
        console.error('Error en obtenerUltimoUsuario:', error);
        return null;
    }
}

async function crearPerfil(nuevaBio = '', nuevaFotoPerfil = '', nuevasPreferencias = '') {
    try {
        // Obtener el último id_usuario disponible
        const id_usuario = await obtenerUltimoUsuario();

        if (!id_usuario) {
            console.error('No se pudo encontrar un usuario válido.');
            return null;
        }

        console.log('Verificando si el usuario con ID:', id_usuario, 'ya tiene un perfil...');

        // Verificar si el usuario ya tiene un perfil asociado
        const { data: perfilExistente, error: errorPerfil } = await supabase
            .from('perfiles')
            .select('id_usuario')
            .eq('id_usuario', id_usuario)
            .limit(1) // Recupera solo un registro si existen duplicados
            .maybeSingle();

        if (errorPerfil) {
            console.error('Error al verificar si el perfil ya existe: ', errorPerfil);
            return null;
        }

        if (perfilExistente) {
            console.log(`El usuario con ID ${id_usuario} ya tiene un perfil.`);
            return null; // Evitar crear el perfil si ya existe
        }

        // Crear el perfil asociado a ese usuario
        console.log('Creando perfil para el usuario con ID:', id_usuario);
        const { data, error } = await supabase
            .from('perfiles')
            .insert([
                {
                    id_usuario: id_usuario, // Clave foránea
                    bio: nuevaBio,
                    foto_perfil: nuevaFotoPerfil,
                    preferencias_notificaciones: nuevasPreferencias
                }
            ])
            .select();

        if (error) {
            console.error('Error al crear perfil: ', error);
            return null;
        } else {
            console.log('Perfil creado correctamente: ', data);
            return data; // Retorna el perfil creado
        }
    } catch (error) {
        console.error('Error en crearPerfil:', error);
        return null;
    }
}


// Función para obtener todos los perfiles
async function obtenerPerfiles() {
    try {
        const { data, error } = await supabase
            .from('perfiles')
            .select('*'); // Seleccionar todos los campos

        if (error) {
            console.error('Error al obtener perfiles:', error);
            return null;
        } else {
            console.log('Perfiles obtenidos: ', data);
            return data; // Retorna los perfiles obtenidos
        }
    } catch (error) {
        console.error('Error en obtenerPerfiles:', error);
        return null;
    }
}

// Función para actualizar un perfil
async function actualizarPerfil(id_usuario, nuevaBio = '', nuevaFotoPerfil = '', nuevasPreferencias = '') {
    try {
        const { data, error } = await supabase
            .from('perfiles')
            .update({
                bio: nuevaBio,
                foto_perfil: nuevaFotoPerfil,
                preferencias_notificaciones: nuevasPreferencias
            })
            .eq('id_usuario', id_usuario) // Filtra por la clave foránea (id_usuario)
            .select();

        if (error) {
            console.error('Error al actualizar perfil: ', error);
            return null;
        } else {
            console.log('Perfil actualizado correctamente: ', data);
            return data; // Retorna los datos actualizados
        }
    } catch (error) {
        console.error('Error en actualizarPerfil:', error);
        return null;
    }
}

// Función para eliminar un perfil
async function eliminarPerfil(id_perfil) {
    try {
        if (!id_perfil) {
            console.error('El ID del perfil no puede estar vacío.');
            return null;
        }

        const { data, error } = await supabase
            .from('perfiles')
            .delete()
            .eq('id_perfil', id_perfil); // Eliminar por el id_perfil

        if (error) {
            console.error('Error al eliminar perfil:', error);
            return null;
        }

        console.log('Perfil eliminado correctamente:', data);
        return data; // Retorna el resultado de la eliminación
    } catch (error) {
        console.error('Error en eliminarPerfil:', error);
        return null;
    }
}



module.exports = {
    obtenerUltimoUsuario,
    crearPerfil,
    obtenerPerfiles,
    actualizarPerfil,
    eliminarPerfil,
};
