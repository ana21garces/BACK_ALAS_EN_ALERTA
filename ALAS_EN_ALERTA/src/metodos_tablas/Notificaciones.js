import supabase from './conexion.js';

export async function crearNotificacion(idUsuario, tipo, mensaje) {
    const { data, error } = await supabase
        .from('Notificaciones')
        .insert([{
            id_usuario: idUsuario,
            tipo_notificacion: tipo,
            mensaje_notificacion: mensaje,
            fecha_notificacion: new Date().toISOString(),
            estado: 'No Leída'
        }])
        .select();  // Selecciona las columnas necesarias o todas por defecto

    if (error) {
        console.error('Error al crear notificación:', error);
        return { error: error.message || error };  // Devuelve el mensaje de error detallado
    } else {
        console.log('Notificación creada:', data);
        return { data };  // Devuelve los datos de la notificación creada
    }
}

export async function obtenerDatosDeNotificaciones(idUsuario) {
    // Aquí puedes colocar tu lógica real para obtener las notificaciones, como una consulta a base de datos.
    if (!idUsuario) throw new Error('El id del usuario es obligatorio');
    
    // Simulando que obtenemos datos de notificaciones
    return [{ id_usuario: idUsuario, mensaje: 'Notificación de prueba' }];
}

export async function obtenerNotificacion(idUsuario) {
    try {
        const { data, error } = await supabase
            .from('Notificaciones')
            .select()
            .eq('id_usuario', idUsuario);

        if (error) {
            throw new Error(error.message);
        }

        return { data: data || [], error: null };  // Asegúrate de devolver un array, aunque sea vacío
    } catch (err) {
        return { data: [], error: err };
    }
}

export async function marcarNotificacionLeida(idNotificacion, idUsuario) {
    try {
        // Actualiza el estado de la notificación para el usuario específico
        const { data, error } = await supabase
            .from('Notificaciones')
            .update({ estado: 'Leída' })  // Cambiar el estado de la notificación
            .eq('id_notificacion', idNotificacion)  // Filtrar por el ID de la notificación
            .eq('id_usuario', idUsuario)  // Asegurarse de que la notificación es del usuario correcto
            .select();  // Obtener la notificación actualizada

        if (error) {
            console.error('Error al actualizar la notificación:', error.message);
            return { data: null, error: error.message };
        }

        if (data.length === 0) {
            console.warn('No se encontró la notificación con el ID proporcionado o no pertenece al usuario.');
            return { data: null, error: 'No se encontró la notificación o no pertenece al usuario.' };
        }

        return { data: data[0], error: null };  // Retorna la notificación actualizada

    } catch (error) {
        console.error('Error al marcar la notificación como leída:', error);
        return { data: null, error: error.message };
    }
}


export async function marcarTodasLeidas(idUsuario) {
    // Buscar las notificaciones del usuario con estado "No Leída"
    const { data, error } = await supabase
        .from('Notificaciones')
        .select('*')
        .eq('id_usuario', idUsuario)
        .eq('estado', 'No Leída');

    if (error) {
        throw new Error('Error al obtener las notificaciones');
    }

    if (data.length === 0) {
        return { message: 'No se encontraron notificaciones para actualizar', data: [] };
    }

    // Marcar todas las notificaciones como leídas
    const { error: updateError } = await supabase
        .from('Notificaciones')
        .update({ estado: 'Leída' })
        .eq('id_usuario', idUsuario)
        .eq('estado', 'No Leída');

    if (updateError) {
        throw new Error('Error al actualizar las notificaciones');
    }

    // Retornar un mensaje de éxito y las notificaciones actualizadas
    const { data: updatedData } = await supabase
        .from('Notificaciones')
        .select('*')
        .eq('id_usuario', idUsuario)
        .eq('estado', 'Leída');

    return { message: 'Notificaciones marcadas correctamente', data: updatedData };
}

export async function filtrarNotificacionPorTipo(idUsuario, tipoNotificacion, limite = 10, pagina = 1) {
    const { data, error } = await supabase
        .from('Notificaciones')
        .select('*')
        .eq('id_usuario', idUsuario)
        .eq('tipo_notificacion', tipoNotificacion)
        .order('fecha_notificacion', { ascending: false })
        .range((pagina - 1) * limite, pagina * limite - 1);

    if (error) {
        console.error('Error al filtrar notificaciones por tipo:', error);
        return { error: error.message };
    }
    return { data };
}

export async function recuentoDeNotiLeidas(idUsuario) {
    const { data, count, error } = await supabase
        .from('Notificaciones')
        .select('id_usuario', { count: 'exact' })
        .eq('id_usuario', idUsuario)
        .eq('estado', 'No Leída');

    if (error) {
        console.error('Error al contar notificaciones no leídas:', error);
        return { error: error.message };
    }
    return { count };
}
