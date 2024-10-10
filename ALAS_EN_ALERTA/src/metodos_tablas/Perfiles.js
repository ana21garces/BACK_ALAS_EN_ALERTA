const supabase = require('../conexion'); 
const { obtenerid } = require('./Usuarios'); 

//crear usuarios
async function crearUsuarios() {
    //desde aqui
    try {
        
    const id_usuario = await obtenerid();

    const { data, error } = await supabase
    .from('perfiles')
    .insert([
    {   id_perfil: 435,
        id_usuario: id_usuario,
        bio:"eyehyrh",
        foto_perfil:"regfreg", 
        preferencias_notificaciones:"regrgtrg"
        },
    ])
    .select();

    if (error) {
        console.error('Error al insertar perfil:', error);
    } else {
        console.log('Perfil insertado correctamente:', data);
    }
} catch (error) {
    console.error('Error en crearUsuarios:', error);
}

    
}
