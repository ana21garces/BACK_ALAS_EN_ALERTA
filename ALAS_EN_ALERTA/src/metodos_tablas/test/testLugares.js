const { crearLugar } = require('../Lugares'); // Asegúrate de que la ruta sea correcta

// Prueba de la función crearLugar
async function ejecutarPruebaCrearLugar() {
    const nombreLugar = "Parque Nacional"; // Nombre del lugar
    const descripcionLugar = "Un hermoso parque nacional lleno de naturaleza."; // Descripción del lugar

    try {
        const idLugar = await crearLugar(nombreLugar, descripcionLugar);
        if (idLugar) {
            console.log('Prueba exitosa, lugar creado con ID:', idLugar);
        } else {
            console.error('Error en la prueba de crearLugar: No se pudo crear el lugar.');
        }
    } catch (err) {
        console.error('Error ejecutando la prueba:', err);
    }
}

ejecutarPruebaCrearLugar();
