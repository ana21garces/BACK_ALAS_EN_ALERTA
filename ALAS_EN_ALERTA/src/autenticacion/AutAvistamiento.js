const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const supabase = require('../metodos_tablas/conexion');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET; // Obtener JWT_SECRET

// Verificar si JWT_SECRET está definido
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET no está definido en el archivo .env');
}

console.log('JWT_SECRET:', JWT_SECRET); // Para verificar el valor de JWT_SECRET

// Función para registrar un nuevo avistamiento
async function registrarAvistamiento(nombre_ave, lugar, descripcion, foto, userId) {
    // Verificar si el usuario está autenticado (userId proporcionado por el token JWT)
    if (!userId) {
        return { error: 'Usuario no autenticado' };
    }

    // Insertar el nuevo avistamiento en la base de datos
    const { data, error } = await supabase
        .from('avistamientos')
        .insert([{ nombre_ave, lugar, descripcion, foto, fecha: new Date(), user_id: userId }])
        .select();

    if (error) {
        console.error('Error al registrar avistamiento:', error);
        return { error: 'Error al registrar avistamiento' };
    }

    return { message: 'Avistamiento registrado exitosamente', avistamiento: data[0] };
}

// Función para obtener los avistamientos registrados por un usuario
async function obtenerAvistamientos(userId) {
    if (!userId) {
        return { error: 'Usuario no autenticado' };
    }

    // Obtener los avistamientos del usuario
    const { data, error } = await supabase
        .from('avistamientos')
        .select('*')
        .eq('user_id', userId);

    if (error) {
        console.error('Error al obtener avistamientos:', error);
        return { error: 'Error al obtener avistamientos' };
    }

    return { avistamientos: data };
}

// Función para autenticar un token JWT
async function authenticate(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado, token no proporcionado' });
    }

    try {
        // Eliminamos el prefijo 'Bearer ' si está presente en el token
        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
        
        // Almacenamos el id del usuario decodificado para usarlo en el siguiente middleware o función
        req.userId = decoded.id;
        next(); // Continuamos con el siguiente middleware o ruta
    } catch (error) {
        return res.status(401).json({ error: 'Token no válido' });
    }
}

// Exportar funciones para ser usadas en otras partes de la aplicación
module.exports = {
    registrarAvistamiento,
    obtenerAvistamientos,
    authenticate
};
