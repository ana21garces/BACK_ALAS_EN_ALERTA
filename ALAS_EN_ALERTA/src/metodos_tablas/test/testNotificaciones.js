const { crearNotificacion } = require('../Notificaciones');

// Prueba de la función crearNotificacion
async function ejecutarPruebaCrearNotificacion() {
    const idUsuario = 35; // Cambia este ID a uno válido en tu tabla de Usuarios
    const tipo = "Seguimiento";
    const mensaje = "Has recibido un nuevo seguidor";

    try {
        const { data, error } = await crearNotificacion(idUsuario, tipo, mensaje);
        if (error) {
            console.error('Error en la prueba de crearNotificacion:', error);
        } else {
            console.log('Prueba exitosa, notificación creada:', data);
        }
    } catch (err) {
        console.error('Error ejecutando la prueba:', err);
    }
}

ejecutarPruebaCrearNotificacion();
