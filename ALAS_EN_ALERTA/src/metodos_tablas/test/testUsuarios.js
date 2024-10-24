const { crearUsuarios } = require('../Usuarios');
const { obtenerUsuarios } = require('../Usuarios');
const { actualizarUsuarios} = require('../Usuarios');
const { eliminarUsuarios} = require('../Usuarios');


async function CrearUsuarios() {
    try {
        const idUsuario = await crearUsuarios('Shirley segura', 'sirly@gmail.com', '2022', 'Funcionario');
        if (idUsuario) {
            console.log(`✔️ Usuario creado con ID: ${idUsuario}`);
        } else {
            console.log('❌ Error al crear el usuario');
        }
    } catch (error) {
        console.error('❌ Error durante la creación del usuario:', error);
    }
}

CrearUsuarios();


async function ObtenerUsuarios() {
    const usuarios = await obtenerUsuarios();
    if (usuarios && usuarios.length > 0) {
        console.log(`✔️ Usuarios obtenidos: ${usuarios.length}`);
    } else {
        console.log('❌ Error al obtener usuarios o no hay usuarios');
    }
}

ObtenerUsuarios();


async function ActualizarUsuarios(idUsuario, nuevoTipo) {
    const usuarioActualizado = await actualizarUsuarios(idUsuario, nuevoTipo);
    if (usuarioActualizado) {
        console.log(`✔️ Usuario con ID ${idUsuario} actualizado a tipo ${nuevoTipo}`);
    } else {
        console.log('❌ Error al actualizar usuario');
    }
}

// Probar la actualización de un usuario
ActualizarUsuarios(55, 'Estudiante');



async function probarEliminarUsuarios(idUsuario) {
    const resultado = await eliminarUsuarios(idUsuario);
    if (resultado) {
        console.log(`✔️ Usuario con ID ${idUsuario} eliminado correctamente`);
    } else {
        console.log('❌ Error al eliminar usuario');
    }
}

// Probar la eliminación de un usuario
probarEliminarUsuarios(55);
