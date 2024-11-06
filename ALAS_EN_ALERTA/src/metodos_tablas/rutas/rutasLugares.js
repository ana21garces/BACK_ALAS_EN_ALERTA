const express = require('express');
const { 
    crearLugar, 
    obtenerLugares, 
    actualizarLugar, 
    eliminarLugar 
} = require('./Lugares'); // Asegúrate de que la ruta sea correcta para el archivo de funciones de lugares

const app = express();
const port = 4000;

app.use(express.json()); // Middleware para manejar JSON

// LUGARES

// Endpoint para crear un lugar
app.post('/crear-lugar', async (req, res) => {
    // Extraer los datos del cuerpo de la solicitud
    const { nombre_lugar, descripcion_lugar } = req.body;

    // Llamar a la función crearLugar
    const id_lugar = await crearLugar(nombre_lugar, descripcion_lugar);

    if (id_lugar) {
        res.status(201).json({ message: 'Lugar creado con éxito', id_lugar });
    } else {
        res.status(500).json({ message: 'Error al crear el lugar' });
    }
});

// Endpoint para obtener todos los lugares
app.get('/obtener-lugares', async (req, res) => {
    const lugares = await obtenerLugares();
    if (lugares) {
        res.status(200).json(lugares);
    } else {
        res.status(500).json({ message: 'Error al obtener lugares' });
    }
});

// Endpoint para actualizar un lugar
app.put('/actualizar-lugar', async (req, res) => {
    const { id_lugar, nombre_lugar, descripcion_lugar } = req.body;
    const updatedLugar = await actualizarLugar(id_lugar, nombre_lugar, descripcion_lugar);
    if (updatedLugar) {
        res.status(200).json(updatedLugar);
    } else {
        res.status(500).json({ message: 'Error al actualizar el lugar' });
    }
});

// Endpoint para eliminar un lugar
app.delete('/eliminar-lugar', async (req, res) => {
    const { id_lugar } = req.body;
    const result = await eliminarLugar(id_lugar);
    if (result) {
        res.status(200).json({ message: `Lugar con ID ${id_lugar} eliminado correctamente.` });
    } else {
        res.status(500).json({ message: 'Error al eliminar el lugar' });
    }
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
