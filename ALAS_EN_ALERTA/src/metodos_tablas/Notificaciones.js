const supabase = require('./conexion');
const express = require('express');


async function crearNotificacion(idUsuario, tipo, mensaje) {
    const { data, error } = await supabase
        .from('Notificaciones')
        .insert([{
            ID_Usuario: idUsuario, // Utiliza el idUsuario recibido
            Tipo_Notificacion: tipo,
            Mensaje_Notificacion: mensaje,
            Fecha_Notificacion: new Date().toISOString(),
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



async function obtenerNotificacion(idUsuario, limite = 10, pagina = 1) {
    const offset = (pagina - 1) * limite;
    const { data, error } = await supabase
        .from('Notificaciones')
        .select()
        .eq('ID_Usuario', idUsuario)
        .order('Fecha_Notificacion', { ascending: false })
        .limit(limite)
        .offset(offset);
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


async function filtrarNotificacionPorTipo(idUsuario, tipoNotificacion, limite = 10, pagina = 1) {
    const offset = (pagina - 1) * limite;
    const { data, error } = await supabase
        .from('Notificaciones')
        .select()
        .eq('ID_Usuario', idUsuario)
        .eq('Tipo_Notificacion', tipoNotificacion)
        .order('Fecha_Notificacion', { ascending: false })
        .limit(limite)
        .offset(offset);
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