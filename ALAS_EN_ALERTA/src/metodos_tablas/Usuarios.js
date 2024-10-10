const supabase = require('../conexion'); 
//crear usuarios
async function crearUsuarios() {
    //modificar segun el frond
    const { data, error } = await supabase
        .from('usuarios')
        .insert([
        { id_usuario: 52245 , nombre_usuario: 'zoar',
          correo_electronico:"gregr@gmail.com", contraseña: "rfweffffer",
          tipo_usuario: "Visitante"
         },
])
      .select()

  if (error) {
      console.error('Error al obtener usuarios:', error);
      return null;
  } else{
    console.log('Usuarios:', data);
    console.log('el usuario se creo con exito')
  }
}

// Función para obtener datos de la tabla usuario
async function obtenerUsuarios() {
    const { data, error } = await supabase
        .from('usuarios')
        .select('*');

    if (error) {
        console.error('Error al obtener usuarios:', error);
        return null;
    }else{
        console.log('Usuarios:', data);
    }
    
}

// Función para actulizar datos
async function actualizarUsuarios() {
    
    const { data, error } = await supabase
    .from('usuarios')
    .update({ tipo_usuario: 'Estudiante' })
    .eq('id_usuario', 767567)
    .select()
        

    if (error) {
        console.error('Error al obtener usuarios:', error);
        return null;
    }else{
        console.log('Usuarios:', data);
    }
    
}
// Función para eliminar
async function eliminarUsuarios() {
    
    const { error } = await supabase
    .from('usuarios')
    .delete()
    .eq('id_usuario', 4444)
        

    if (error) {
        console.error('Error al obtener usuarios:', error);
        return null;
    }
    
    
}

crearUsuarios();
obtenerUsuarios();
actualizarUsuarios();
eliminarUsuarios();



          