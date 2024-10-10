// pruebaCRUD.js
import {
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario,
} from './conexion.js'; // Asegúrate de que la ruta sea correcta

async function pruebaCRUD() {
    // Crear un nuevo usuario
    const nuevoUsuario = await crearUsuario('Juan', 'juan@example.com');
    console.log('Usuario creado:', nuevoUsuario);

    // Leer todos los usuarios
    const usuarios = await obtenerUsuarios();
    console.log('Usuarios:', usuarios);

    // Leer un usuario por ID (asumiendo que el nuevo usuario tiene un ID)
    if (nuevoUsuario && nuevoUsuario[0].id) {
        const usuario = await obtenerUsuarioPorId(nuevoUsuario[0].id);
        console.log('Usuario encontrado:', usuario);
    }

    // Actualizar el usuario
    if (nuevoUsuario && nuevoUsuario[0].id) {
        const usuarioActualizado = await actualizarUsuario(nuevoUsuario[0].id, 'Juan Actualizado', 'juan_actualizado@example.com');
        console.log('Usuario actualizado:', usuarioActualizado);
    }

    // Eliminar el usuario
    if (nuevoUsuario && nuevoUsuario[0].id) {
        const usuarioEliminado = await eliminarUsuario(nuevoUsuario[0].id);
        console.log('Usuario eliminado:', usuarioEliminado);
    }
}

// Ejecutar la prueba
pruebaCRUD();

