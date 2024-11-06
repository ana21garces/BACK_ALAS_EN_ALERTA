const express = require('express');
const { 
    crearAvistamiento, 
    obtenerAvistamientos, 
    actualizarAvistamiento, 
    eliminarAvistamiento 
} = require('./Avistamientos'); // Asegúrate de que la ruta sea correcta para el archivo de funciones de avistamientos

const app = express();
const port = 4000;

app.use(express.json()); // Middleware para manejar JSON

// AVISTAMIENTOS

// Endpoint para crear un avistamiento
app.post('/crear-avistamiento', async (req, res) => {
    // Extraer los datos del cuerpo de la solicitud
    const { descripcion_avistamiento, foto_avistamiento } = req.body;

    // Llamar a la función crearAvistamiento
    const id_avistamiento = await crearAvistamiento(descripcion_avistamiento, foto_avistamiento);

    if (id_avistamiento) {
        res.status(201).json({ message: 'Avistamiento creado con éxito', id_avistamiento });
    } else {
        res.status(500).json({ message: 'Error al crear el avistamiento' });
    }
});

// Endpoint para obtener todos los avistamientos
app.get('/obtener-avistamientos', async (req, res) => {
    const avistamientos = await obtenerAvistamientos();
    if (avistamientos) {
        res.status(200).json(avistamientos);
    } else {
        res.status(500).json({ message: 'Error al obtener avistamientos' });
    }
});

// Endpoint para actualizar un avistamiento
app.put('/actualizar-avistamiento', async (req, res) => {
    const { id_avistamiento, descripcion_avistamiento, foto_avistamiento } = req.body;
    const updatedAvistamiento = await actualizarAvistamiento(id_avistamiento, descripcion_avistamiento, foto_avistamiento);
    if (updatedAvistamiento) {
        res.status(200).json(updatedAvistamiento);
    } else {
        res.status(500).json({ message: 'Error al actualizar el avistamiento' });
    }
});

// Endpoint para eliminar un avistamiento
app.delete('/eliminar-avistamiento', async (req, res) => {
    const { id_avistamiento } = req.body;
    const result = await eliminarAvistamiento(id_avistamiento);
    if (result) {
        res.status(200).json({ message: `Avistamiento con ID ${id_avistamiento} eliminado correctamente.` });
    } else {
        res.status(500).json({ message: 'Error al eliminar el avistamiento' });
    }
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
