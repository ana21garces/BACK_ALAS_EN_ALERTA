import assert from 'assert';  // Añadir esta línea en la parte superior de tu archivo
import { expect } from 'chai';
import { crearUsuarios, obtenerUsuarios, actualizarUsuarios, eliminarUsuarios } from '../Usuarios.js';

describe('CRUD Usuarios', function() {
    let idUsuario;

    // Crear un usuario antes de las pruebas
    before(async () => {
        idUsuario = await crearUsuarios('Andres', 'andres@gmail.com', 'contraseña123', 'Funcionario');
    });

    // Test de actualización
    it('Debería actualizar el tipo de usuario', async () => {
        const tipo_usuario = 'Admin'; // El nuevo tipo de usuario
        const result = await actualizarUsuarios(idUsuario, tipo_usuario);

        // Verificar que result no sea null usando assert.ok()
        assert.ok(result);  // Verifica que result no sea null ni undefined
        // Verificar que el tipo de usuario haya sido actualizado correctamente
        assert.equal(result[0].tipo_usuario, tipo_usuario);
    });

    // Test de eliminación de usuario por ID
    it('Debería eliminar un usuario por su ID', async () => {
    const idUsuario = 72;  // Cambia este ID al del usuario que deseas eliminar
    const result = await eliminarUsuarios(idUsuario);
    assert.equal(result, true, `El usuario con ID ${idUsuario} debería ser eliminado correctamente`);
    });


    
    // Test de obtención de usuarios
    it('Debería obtener todos los usuarios', async () => {
        const result = await obtenerUsuarios();
        assert.ok(result);  // Verifica que result no sea null ni undefined
        assert(Array.isArray(result));  // Verifica que sea un array
    });
});
