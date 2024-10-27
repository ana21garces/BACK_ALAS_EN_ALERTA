const supabase = require('../conexion');
const bcrypt = require('bcrypt');

async function registerAuth(nombre_usuario, correo_electronico, contraseña, tipo_usuario) {
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const { data: usuarioExistente } = await supabase
        .from('usuarios')
        .select('*')
        .eq('correo_electronico', correo_electronico)
        .single();

    if (usuarioExistente) return { error: 'El usuario ya existe' };

    const { data, error } = await supabase
        .from('usuarios')
        .insert([{ nombre_usuario, correo_electronico, contraseña: hashedPassword, tipo_usuario }])
        .select();

    if (error) return { error: 'Error al registrar usuario' };

    return { id: data[0].id_usuario, message: 'Usuario registrado exitosamente' };
}

module.exports = { registerAuth };
