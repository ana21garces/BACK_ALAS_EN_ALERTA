import supabase from '../conexion.js';


export async function crearAvistamiento(descripcion_avistamiento, foto_avistamiento) {
    try {
        const fecha_publicacion = new Date(); // Genera la fecha y hora actuales

        const { data, error } = await supabase
            .from('avistamientos')
            .insert([{
                descripcion_avistamiento,
                foto_avistamiento,
                fecha_publicacion,           // Agrega la fecha de publicación
                fecha_avistamiento: new Date() // Fecha y hora actuales para el registro
                // Los campos id_ave, id_lugar, id_usuario se generan automáticamente
            }])
            .select();

        if (error) {
            console.error('Error al crear el registro de avistamiento:', error);
            return null;
        } else {
            console.log('Avistamiento registrado:', data);
            return data[0]?.id_avistamiento; // Retorna el ID del registro creado si existe
        }
    } catch (error) {
        console.error('Error al crear el registro de avistamiento:', error);
        return null;
    }
}

// Función para obtener todos los avistamientos
export async function obtenerAvistamientos() {
    const { data, error } = await supabase
        .from('avistamientos')
        .select('*');

    if (error) {
        console.error('Error al obtener avistamientos:', error);
        return null;
    } else {
        console.log('Avistamientos:', data);
        return data; // Retorna los datos para el front-end
    }
}

// Función para actualizar un registro de avistamiento con descripción y foto
export async function actualizarAvistamiento(id_avistamiento, descripcion_avistamiento, foto_avistamiento) {
    const { data, error } = await supabase
        .from('avistamientos')
        .update({
            descripcion_avistamiento,
            foto_avistamiento
        })
        .eq('id_avistamiento', id_avistamiento)
        .select();

    if (error) {
        console.error('Error al actualizar el registro de avistamiento:', error);
        return null;
    } else {
        console.log('Registro de avistamiento actualizado:', data);
        return data; // Retorna los datos actualizados para el front-end
    }
}

// Función para eliminar un registro de avistamiento
export async function eliminarAvistamiento(id_avistamiento) {
    const { error } = await supabase
        .from('avistamientos')
        .delete()
        .eq('id_avistamiento', id_avistamiento);

    if (error) {
        console.error('Error al eliminar el registro de avistamiento:', error);
        return false;
    } else {
        console.log(`Registro de avistamiento con ID ${id_avistamiento} eliminado correctamente.`);
        return true; // Retorna true si la eliminación fue exitosa
    }
}
