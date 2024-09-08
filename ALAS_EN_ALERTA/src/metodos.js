const express = require('express');
const app = express();
const port = 5000;
const connection = require('./db.js');

// Middleware para interpretar JSON
app.use(express.json());

// CREATE (crear un nuevo registro)
app.post('/Usuarios', (req, res) => {
  const { Nombre_Usuario, Correo_Electronico, Contraseña, Tipo_Usuario } = req.body;

  // Validación simple para asegurar que todos los campos están presentes
  if (!Nombre_Usuario || !Correo_Electronico || !Contraseña || !Tipo_Usuario) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  const sql = 'INSERT INTO Usuarios (Nombre_Usuario, Correo_Electronico, Contraseña, Tipo_Usuario) VALUES (?, ?, ?, ?)';

  connection.query(sql, [Nombre_Usuario, Correo_Electronico, Contraseña, Tipo_Usuario], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId, Nombre_Usuario, Correo_Electronico, Contraseña, Tipo_Usuario });
  });
});

app.listen(port, () => {
  console.log('Servidor escuchando en http://localhost:${port}');
});