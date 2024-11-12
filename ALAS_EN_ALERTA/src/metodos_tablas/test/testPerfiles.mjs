import assert from 'assert'; 
import { obtenerUltimoUsuario, obtenerPerfiles, crearPerfil, actualizarPerfil, eliminarPerfil } from '../Perfiles.js';
import { expect } from 'chai';

describe('Gestión de Perfiles', () => {
    it('Debe obtener el último ID de usuario', async () => {
        const ultimoId = await obtenerUltimoUsuario();
        assert(ultimoId !== null, 'Se debe obtener un ID de usuario válido');
        console.log('Último ID de usuario:', ultimoId);
    });

    it('Debe verificar si el usuario tiene un perfil y crear uno si no existe', async () => {
        const perfilesExistentes = await obtenerPerfiles();
        console.log('Perfiles existentes:', perfilesExistentes);

        const ultimoId = await obtenerUltimoUsuario();
        const perfilExistente = perfilesExistentes.find(p => p.id_usuario === ultimoId);

        let perfilCreado;
        if (perfilExistente) {
            perfilCreado = perfilExistente;
            console.log('Perfil existente encontrado:', perfilCreado);
        } else {
            perfilCreado = await crearPerfil('bio del usuario', 'ruta/a/foto.jpg', 'notificaciones por correo');
            console.log('Nuevo perfil creado:', perfilCreado);
        }

        assert(perfilCreado && perfilCreado.id_perfil, 'El perfil debe tener un ID válido');
        console.log('Perfil con ID válido:', perfilCreado.id_perfil);
    });

    it('Debe actualizar el perfil correctamente', async () => {
        const id_perfil = 48;
        const nuevosDatos = {
            bio: 'Amo las aves con mi vida',
            foto_perfil: 'ruta/actualizada/foto.jpg',
            preferencias_notificaciones: 'notificaciones por correo'
        };

        const perfilActualizado = await actualizarPerfil(id_perfil, nuevosDatos);
        expect(perfilActualizado).to.exist;
        console.log('Perfil actualizado:', perfilActualizado);
        expect(perfilActualizado.bio).to.equal(nuevosDatos.bio);
        expect(perfilActualizado.foto_perfil).to.equal(nuevosDatos.foto_perfil);
        expect(perfilActualizado.preferencias_notificaciones).to.equal(nuevosDatos.preferencias_notificaciones);
    });

    it('Debe verificar que solo se ha creado un perfil para el usuario', async () => {
        const ultimoId = await obtenerUltimoUsuario();
        const perfilesExistentes = await obtenerPerfiles();
        const perfilesUsuario = perfilesExistentes.filter(p => p.id_usuario === ultimoId);
        assert(perfilesUsuario.length <= 1, 'Debe haber solo un perfil asociado al usuario');
        console.log('Cantidad de perfiles asociados al usuario:', perfilesUsuario.length);
    });

    

    it('Debe eliminar el perfil correctamente', async function () {
        this.timeout(10000); // Aumenta el tiempo de espera a 10 segundos
    
        const id_perfil = 65;  // Cambia este ID según el perfil que quieras eliminar para la prueba
    
        // Llamar a la función para eliminar el perfil
        await eliminarPerfil(id_perfil);
    
        // Espera breve para que la eliminación se refleje en la base de datos
        await new Promise(resolve => setTimeout(resolve, 5000)); // Esperar 5 segundos
    
        // Verificar que el perfil ya no existe en la lista de perfiles
        const perfilesExistentes = await obtenerPerfiles();
        const perfilEliminado = perfilesExistentes.find(p => p.id_perfil === id_perfil);
    
        // Verificar que el perfil ya no existe
        expect(perfilEliminado).to.be.undefined;  // El perfil ya no debería estar en la lista
    });
    
    
    
    
});