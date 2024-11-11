import supabase from '../conexion.js';


export async function crearAve(nombre_ave, descripcion_ave) {
    try {
        const { data, error } = await supabase
            .from('aves')
            .insert([{
                nombre_ave,
                descripcion_ave
            }])
            .select();

        if (error) {
            console.error('Error al crear el registro de ave:', error);
            return null;
        } else {
            console.log('Ave registrada:', data);
            return data[0]?.id_ave;
        }
    } catch (error) {
        console.error('Error al crear el registro de ave:', error);
        return null;
    }
}

// Función para obtener todos los registros de aves
export async function obtenerAves() {
    const { data, error } = await supabase
        .from('aves')
        .select('*');

    if (error) {
        console.error('Error al obtener aves:', error);
        return null;
    } else {
        console.log('Aves:', data);
        return data;
    }
}

// Función para actualizar un registro de ave
export async function actualizarAve(id_ave, nombre_ave, descripcion_ave) {
    const { data, error } = await supabase
        .from('aves')
        .update({
            nombre_ave,
            descripcion_ave
        })
        .eq('id_ave', id_ave)
        .select();

    if (error) {
        console.error('Error al actualizar el registro de ave:', error);
        return null;
    } else {
        console.log('Registro de ave actualizado:', data);
        return data;
    }
}

// Función para eliminar un registro de ave
export async function eliminarAve(id_ave) {
    const { error } = await supabase
        .from('aves')
        .delete()
        .eq('id_ave', id_ave);

    if (error) {
        console.error('Error al eliminar el registro de ave:', error);
        return false;
    } else {
        console.log(`Registro de ave con ID ${id_ave} eliminado correctamente.`);
        return true;
    }
}
