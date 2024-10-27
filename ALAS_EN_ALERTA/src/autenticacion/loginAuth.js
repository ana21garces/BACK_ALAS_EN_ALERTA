const supabase = require('../conexion');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

async function loginAuth(correo_electronico, contraseña) {
    const { data: usuario, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('correo_electronico', correo_electronico)
        .single();

    if (error || !usuario) return { error: 'Usuario o contraseña incorrectos' };

    const esContraseñaCorrecta = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!esContraseñaCorrecta) return { error: 'Usuario o contraseña incorrectos' };

    const token = jwt.sign({ id: usuario.id_usuario, email: usuario.correo_electronico }, JWT_SECRET, { expiresIn: '1h' });
    return { token, message: 'Inicio de sesión exitoso' };
}

module.exports = { loginAuth };
