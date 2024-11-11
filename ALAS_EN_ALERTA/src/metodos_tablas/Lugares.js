import supabase from '../conexion.js';


export async function crearLugar(nombre_lugar, descripcion_lugar) {
    try {
        const { data, error } = await supabase
            .from('lugares')
            .insert([{
                nombre_lugar,
                descripcion_lugar
                // El campo id_lugar se genera automáticamente
            }])
            .select();

        if (error) {
            console.error('Error al crear el registro de lugar:', error);
            return null;
        } else {
            console.log('Lugar registrado:', data);
            return data[0]?.id_lugar; // Retorna el ID del registro creado si existe
        }
    } catch (error) {
        console.error('Error al crear el registro de lugar:', error);
        return null;
    }
}

// Función para obtener todos los lugares
export async function obtenerLugares() {
    const { data, error } = await supabase
        .from('lugares')
        .select('*');

    if (error) {
        console.error('Error al obtener lugares:', error);
        return null;
    } else {
        console.log('Lugares:', data);
        return data; // Retorna los datos para el front-end
    }
}

// Función para actualizar un registro de lugar con nombre y descripción
export async function actualizarLugar(id_lugar, nombre_lugar, descripcion_lugar) {
    const { data, error } = await supabase
        .from('lugares')
        .update({
            nombre_lugar,
            descripcion_lugar
        })
        .eq('id_lugar', id_lugar)
        .select();

    if (error) {
        console.error('Error al actualizar el registro de lugar:', error);
        return null;
    } else {
        console.log('Registro de lugar actualizado:', data);
        return data; // Retorna los datos actualizados para el front-end
    }
}

// Función para eliminar un registro de lugar
export async function eliminarLugar(id_lugar) {
    const { error } = await supabase
        .from('lugares')
        .delete()
        .eq('id_lugar', id_lugar); // Filtra por el ID del lugar

    if (error) {
        console.error('Error al eliminar el registro de lugar:', error);
        return false;
    } else {
        console.log(`Registro de lugar con ID ${id_lugar} eliminado correctamente.`);
        return true; // Retorna true si la eliminación fue exitosa
    }
}
