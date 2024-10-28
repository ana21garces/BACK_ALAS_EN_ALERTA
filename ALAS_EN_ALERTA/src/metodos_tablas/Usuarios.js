const supabase = require ('./conexion');
const express = require('express');
const bcrypt = require('bcrypt');



// Función para crear usuarios
async function crearUsuarios(nombre_usuario, correo_electronico, contraseña, tipo_usuario) {
    try {
        // Encriptar la contraseña recibida como parámetro
        const hashedPassword = await bcrypt.hash(contraseña, 10);

        // Insertar los datos en la tabla 'usuarios' usando Supabase
        const { data, error } = await supabase
            .from('usuarios')
            .insert([
                {
                    nombre_usuario: nombre_usuario,
                    correo_electronico: correo_electronico,
                    contraseña: hashedPassword, // Usar la contraseña hasheada
                    tipo_usuario: tipo_usuario
                }
            ])
            .select();

        // Verificar si hubo algún error al insertar
        if (error) {
            console.error('Error al crear usuario:', error);
            return null;
        } else {
            console.log('Usuarios:', data);
            console.log('El usuario se creó con éxito');
            return data[0].id_usuario;
        }
    } catch (error) {
        console.error('Error al crear usuario:', error);
        return null;
    }
}

// Función para obtener todos los usuarios
async function obtenerUsuarios() {
    const { data, error } = await supabase
        .from('usuarios')
        .select('*');

    if (error) {
        console.error('Error al obtener usuarios:', error);
        return null;
    } else {
        console.log('Usuarios:', data);
        return data; // Retorna los datos para el front-end
    }
}

// Función para actualizar un usuario
async function actualizarUsuarios(id_usuario, tipo_usuario) {
    const { data, error } = await supabase
        .from('usuarios')
        .update({ tipo_usuario: tipo_usuario })  // Recibe el tipo de usuario como parámetro
        .eq('id_usuario', id_usuario)  // Filtra por el ID de usuario
        .select();

    if (error) {
        console.error('Error al actualizar usuario:', error);
        return null;
    } else {
        console.log('Usuario actualizado:', data);
        return data;  // Retorna los datos actualizados para el front-end
    }
}

// Función para eliminar un usuario
async function eliminarUsuarios(id_usuario) {
    const { error } = await supabase
        .from('usuarios')
        .delete()
        .eq('id_usuario', id_usuario);  // Recibe el ID de usuario como parámetro

    if (error) {
        console.error('Error al eliminar usuario:', error);
        return null;
    } else {
        console.log(`Usuario con ID ${id_usuario} eliminado correctamente.`);
        return true;  // Retorna true si la eliminación fue exitosa
    }
}

module.exports = { 
    crearUsuarios,
    obtenerUsuarios,
    actualizarUsuarios,
    eliminarUsuarios

 };