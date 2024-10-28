const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const supabase = require('../metodos_tablas/conexion');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET; // Obtener JWT_SECRET

console.log('JWT_SECRET:', JWT_SECRET); // Para verificar el valor de JWT_SECRET

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET no está definido en el archivo .env'); // Comprobar que esté definido
}

async function loginAuth(correo_electronico, contraseña) {
    try {
        const { data: usuario, error } = await supabase
            .from('usuarios')
            .select('*')
            .eq('correo_electronico', correo_electronico)
            .single();

        if (error || !usuario) {
            return { 
                success: false, 
                message: 'No se pudo encontrar un usuario con ese correo electrónico.' 
            };
        }

        const esContraseñaCorrecta = await bcrypt.compare(contraseña, usuario.contraseña);

        if (!esContraseñaCorrecta) {
            return { 
                success: false, 
                message: 'La contraseña ingresada es incorrecta.' 
            };
        }

        const token = jwt.sign(
            { id: usuario.id_usuario, email: usuario.correo_electronico },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return { 
            success: true,
            message: 'Inicio de sesión exitoso',
            token: token  // Este token se usará en el frontend pero no se mostrará al usuario
        };
    } catch (error) {
        return {
            success: false,
            message: 'Error en el servidor'
        };
    }
}
module.exports = { loginAuth };
