import supabase from './conexion.js';

export async function obtenerUltimoUsuario() {
    try {
        const { data, error } = await supabase
            .from('usuarios')
            .select('id_usuario')
            .order('id_usuario', { ascending: false })
            .limit(1)
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

export async function crearPerfil(nuevaBio = '', nuevaFotoPerfil = '', nuevasPreferencias = '') {
    try {
        const id_usuario = await obtenerUltimoUsuario(); // Obtener el ID del último usuario

        if (!id_usuario) {
            console.error('No se pudo encontrar un usuario válido.');
            return null;
        }

        console.log('Verificando si el usuario con ID:', id_usuario, 'ya tiene un perfil...');

        // Verificar si ya existe un perfil para este usuario
        const { data: perfilExistente, error: errorPerfil } = await supabase
            .from('perfiles')
            .select('id_perfil, id_usuario, bio, foto_perfil, preferencias_notificaciones') // Selecciona los campos completos del perfil
            .eq('id_usuario', id_usuario)
            .limit(1)
            .maybeSingle(); // Obtiene un único perfil si existe

        if (errorPerfil) {
            console.error('Error al verificar si el perfil ya existe: ', errorPerfil);
            return null;
        }

        // Si el perfil ya existe, lo devolvemos sin crear uno nuevo
        if (perfilExistente) {
            console.log(`El usuario con ID ${id_usuario} ya tiene un perfil.`);
            return perfilExistente;
        }

        // Si no existe un perfil, lo creamos
        console.log('Creando perfil para el usuario con ID:', id_usuario);
        const { data, error } = await supabase
            .from('perfiles')
            .insert([{
                id_usuario: id_usuario,
                bio: nuevaBio,
                foto_perfil: nuevaFotoPerfil,
                preferencias_notificaciones: nuevasPreferencias
            }])
            .select();

        if (error) {
            console.error('Error al crear perfil: ', error);
            return null;
        } else {
            console.log('Perfil creado correctamente: ', data);
            return data[0];  // Devolver el primer elemento del array, que es el perfil recién creado
        }
    } catch (error) {
        console.error('Error en crearPerfil:', error);
        return null;
    }
}

export async function obtenerPerfiles() {
    try {
        const { data, error } = await supabase
            .from('perfiles') 
            .select('*');
        
        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        console.error('Error al obtener los perfiles:', error);
        return [];
    }
}


export async function actualizarPerfil(id_perfil, nuevosDatos) {
    try {
        const { data, error } = await supabase
            .from('perfiles')
            .update(nuevosDatos)
            .eq('id_perfil', id_perfil)
            .select('*');

        if (error) throw new Error(`Error al actualizar perfil: ${error.message}`);
        if (!data.length) throw new Error('Perfil no encontrado');

        console.log('Perfil actualizado:', data[0]);
        return data[0];
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

export async function eliminarPerfil(id_perfil) {
    try {
        // Intentar eliminar el perfil de la base de datos
        const { data, error } = await supabase
            .from('perfiles')
            .delete()
            .eq('id_perfil', id_perfil);

        // Manejo de errores
        if (error) {
            console.error('Error al eliminar perfil:', error.message);
            return false;  // Retorna false si hay un error
        }

        // Verificación de si la eliminación fue exitosa
        if (data && data.length > 0) {
            console.log(`Perfil con ID ${id_perfil} eliminado correctamente.`);
            return true;  // Retorna true si se eliminó el perfil
            
        } else {
            // Si no se encontró el perfil para eliminar
            return false;  // Retorna false si no se encontró el perfil
        }
    } catch (error) {
        // Manejo de excepciones generales
        console.error('Error en eliminarPerfil:', error.message);
        return false;  // Retorna false si hubo un error en el proceso
    }
}
