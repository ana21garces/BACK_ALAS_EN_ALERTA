const supabase = require('./conexion');
const { crearUsuarios } = require('./Usuarios');
const { crearPerfil} = require('./Perfiles');
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

// Función para crear notificación
async function crearNotificacion(idUsuario, tipo, mensaje) {
    const id_usuario = await obtenerUltimoUsuario();
    const { data, error } = await supabase
        .from('Notificaciones')
        .insert([{
            ID_Usuario: id_usuario,
            Tipo_Notificacion: tipo,
            Mensaje_Notificacion: mensaje,
            Fecha_Notificacion: new Date().toISOString(), // Genera la fecha actual
            Estado: 'No Leída'
        }])
        .select();
    if (error) {
        console.error('Error al crear notificación:', error);
    } else {
        console.log('Notificación creada:', data);
    }
    return { data, error };
}


async function obtenerNotificacion(idUsuario) {
    const { data, error } = await supabase
        .from('Notificaciones')
        .select()
        .eq('ID_Usuario', idUsuario)
        .order('Fecha_Notificacion', { ascending: false });
    return { data, error };
}


async function marcarNotificacionLeida(idNotificacion) {
    const { data, error } = await supabase
        .from('Notificaciones')
        .update({ Estado: 'Leída' })
        .eq('ID_Notificacion', idNotificacion);
    return { data, error };
}

// Marcar todas las notificaciones como leídas
async function marcarTodasLeidas(idUsuario) {
    const { data, error } = await supabase
        .from('Notificaciones')
        .update({ Estado: 'Leída' }) // Cambia el estado a 'Leída'
        .eq('ID_Usuario', idUsuario)
        .eq('Estado', 'No Leída'); // Solo las no leídas
    return { data, error };
}

async function filtrarNotificacionPorTipo(idUsuario, tipoNotificacion) {
    const { data, error } = await supabase
        .from('Notificaciones')
        .select()
        .eq('ID_Usuario', idUsuario)
        .eq('Tipo_Notificacion', tipoNotificacion)
        .order('Fecha_Notificacion', { ascending: false });
    return { data, error };
}

async function recuentoDeNotiLeidas(idUsuario) {
    const { count, error } = await supabase
        .from('Notificaciones')
        .select('*', { count: 'exact' })
        .eq('ID_Usuario', idUsuario)
        .eq('Estado', 'No Leída');
    return { count, error };
}


module.exports = {
    crearNotificacion,
    obtenerNotificacion,
    marcarNotificacionLeida,
    marcarTodasLeidas,
    filtrarNotificacionPorTipo,
    recuentoDeNotiLeidas
};