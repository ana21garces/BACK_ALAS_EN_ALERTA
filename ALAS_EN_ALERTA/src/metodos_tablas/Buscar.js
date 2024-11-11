import supabase from '../conexion.js';


export async function buscarAves(query) {
    try {
        const { data, error } = await supabase
            .from('aves')
            .select('*')
            .ilike('nombre_ave', `%${query}%`)  // Búsqueda insensible a mayúsculas y minúsculas
            .or(`descripcion_ave.ilike.%${query}%`);  // También busca en la descripción

        if (error) {
            console.error('Error al buscar aves:', error);
            return null;
        } else {
            console.log('Aves encontradas:', data);
            return data;  // Devuelve los resultados encontrados
        }
    } catch (error) {
        console.error('Error al buscar aves:', error);
        return null;
    }
}

// Función para buscar lugares por nombre o descripción
export async function buscarLugares(query) {
    try {
        const { data, error } = await supabase
            .from('lugares')
            .select('*')
            .ilike('nombre_lugar', `%${query}%`)  // Búsqueda insensible a mayúsculas y minúsculas
            .or(`descripcion_lugar.ilike.%${query}%`);  // También busca en la descripción

        if (error) {
            console.error('Error al buscar lugares:', error);
            return null;
        } else {
            console.log('Lugares encontrados:', data);
            return data;  // Devuelve los resultados encontrados
        }
    } catch (error) {
        console.error('Error al buscar lugares:', error);
        return null;
    }
}
