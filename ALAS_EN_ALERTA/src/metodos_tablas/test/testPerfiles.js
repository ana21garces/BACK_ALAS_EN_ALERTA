const { obtenerUltimoUsuario} = require('../Perfiles');
const { crearPerfil } = require('../Perfiles');
const { obtenerPerfiles } = require('../Perfiles');
const { actualizarPerfil } = require('../Perfiles');
const { eliminarPerfil } = require('../Perfiles');



// Probar la función obteniendo un ultimo usuario para crear perfil
(async () => {
    const ultimoId = await obtenerUltimoUsuario();
    console.log('Último ID de usuario:', ultimoId);
})();




// Probar la función para crear perfil
(async () => {
    try {
        const nuevoPerfil = await crearPerfil('apasionada por las aves', 'ruta/a/foto.jpg', 'notificaciones por correo');
        console.log('Resultado de la creación del perfil:', nuevoPerfil);
    } catch (error) {
        console.error('Error al crear el perfil:', error);
    }
})();


// Probar la función para obtener perfil 
(async () => {
    try {
        const perfiles = await obtenerPerfiles();
        if (perfiles) {
            console.log('Perfiles obtenidos:', perfiles);
        } else {
            console.log('No se recibieron perfiles.');
        }
    } catch (error) {
        console.error('Error al obtener perfiles:', error);
    }
})();



// Actualizar perfil

(async () => {
    try {
        const id_usuario = 35; // Suponiendo que este es el ID de usuario que quieres actualizar
        const nuevaBio = 'Ingeniera de aves';
        const nuevaFotoPerfil = 'ruta/a/nueva/foto.jpg';
        const nuevasPreferencias = 'notificaciones por SMS';

        const perfilActualizado = await actualizarPerfil(id_usuario, nuevaBio, nuevaFotoPerfil, nuevasPreferencias);
        console.log('Resultado de la actualización del perfil:', perfilActualizado);
    } catch (error) {
        console.error('Error al actualizar el perfil:', error);
    }
})();



// Eliminar perfil
(async () => {
    try {
        const id_perfil = 25; // Suponiendo que este es el ID del perfil que deseas eliminar

        const resultadoEliminacion = await eliminarPerfil(id_perfil);
        if (resultadoEliminacion) {
            console.log('Resultado de la eliminación del perfil:', resultadoEliminacion);
        } else {
            console.log('No se eliminó el perfil o no existe.');
        }
    } catch (error) {
        console.error('Error al intentar eliminar el perfil:', error);
    }
})();



