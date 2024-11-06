const { crearAve } = require('../Aves'); // Asegúrate de que la ruta sea correcta

// Prueba de la función crearAve
async function ejecutarPruebaCrearAve() {
    const nombreAve = "Colibrí"; // Cambia este nombre a uno válido
    const descripcionAve = "Un pequeño pájaro de colores brillantes, conocido por su capacidad para volar hacia atrás.";

    try {
        const idAve = await crearAve(nombreAve, descripcionAve);
        if (idAve) {
            console.log('Prueba exitosa, ave creada con ID:', idAve);
        } else {
            console.error('Error en la prueba de crearAve: No se pudo crear el ave.');
        }
    } catch (err) {
        console.error('Error ejecutando la prueba:', err);
    }
}

ejecutarPruebaCrearAve();
