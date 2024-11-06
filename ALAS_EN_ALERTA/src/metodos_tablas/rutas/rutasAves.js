const express = require('express');
const { crearAve, obtenerAves, actualizarAve, eliminarAve } = require('./Aves'); // Asegúrate de que la ruta sea correcta para el archivo de funciones de aves

const app = express();
const port = 4000;

app.use(express.json()); // Middleware para manejar JSON

// AVES

// Endpoint para crear una ave
app.post('/crear-ave', async (req, res) => {
    // Extraer los datos del cuerpo de la solicitud
    const { nombre_ave, descripcion_ave } = req.body;

    // Llamar a la función crearAve
    const id_ave = await crearAve(nombre_ave, descripcion_ave);

    if (id_ave) {
        res.status(201).json({ message: 'Ave creada con éxito', id_ave: id_ave });
    } else {
        res.status(500).json({ message: 'Error al crear el ave' });
    }
});

// Endpoint para obtener todas las aves
app.get('/obtener-aves', async (req, res) => {
    const aves = await obtenerAves();
    if (aves) {
        res.status(200).json(aves);
    } else {
        res.status(500).json({ message: 'Error al obtener aves' });
    }
});

// Endpoint para actualizar un ave
app.put('/actualizar-ave', async (req, res) => {
    const { id_ave, nombre_ave, descripcion_ave } = req.body;
    const updatedAve = await actualizarAve(id_ave, nombre_ave, descripcion_ave);
    if (updatedAve) {
        res.status(200).json(updatedAve);
    } else {
        res.status(500).json({ message: 'Error al actualizar el ave' });
    }
});

// Endpoint para eliminar un ave
app.delete('/eliminar-ave', async (req, res) => {
    const { id_ave } = req.body;
    const result = await eliminarAve(id_ave);
    if (result) {
        res.status(200).json({ message: `Ave con ID ${id_ave} eliminada correctamente.` });
    } else {
        res.status(500).json({ message: 'Error al eliminar el ave' });
    }
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
