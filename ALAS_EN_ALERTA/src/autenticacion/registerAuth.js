import path from 'path';
import dotenv from 'dotenv';
import supabase from '../metodos_tablas/conexion.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Configuración de dotenv para cargar el archivo .env
dotenv.config({ path: path.resolve(path.dirname(''), '../../.env') });

const JWT_SECRET = process.env.JWT_SECRET; // Obtener JWT_SECRET

console.log('JWT_SECRET:', JWT_SECRET); // Para verificar el valor de JWT_SECRET

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET no está definido en el archivo .env'); // Comprobar que esté definido
}

export async function registerAuth(nombre_usuario, correo_electronico, contraseña, tipo_usuario) {
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Verificar si el usuario ya existe (sin usar .single())
    const { data: usuariosExistentes, error: existingUserError } = await supabase
        .from('usuarios')
        .select('*')
        .eq('correo_electronico', correo_electronico);

    if (existingUserError) {
        console.error('Error al verificar usuario existente:', existingUserError);
        return { error: 'Error al verificar usuario existente' };
    }

    // Si encuentra algún usuario con el mismo correo
    if (usuariosExistentes && usuariosExistentes.length > 0) {
        return { error: 'El usuario ya existe' };
    }

    // Registrar nuevo usuario
    const { data, error } = await supabase
        .from('usuarios')
        .insert([{ nombre_usuario, correo_electronico, contraseña: hashedPassword, tipo_usuario }])
        .select();

    if (error) {
        console.error('Error al registrar usuario:', error);
        return { error: 'Error al registrar usuario' };
    }

    return { id: data[0].id_usuario, message: 'Usuario registrado exitosamente' };
}
