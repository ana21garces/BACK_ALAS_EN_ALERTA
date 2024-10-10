const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'alasenalerta',
    port: 3306 // El puerto correcto para MySQL
  });


db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];

    jwt.verify(token, 'secret_key', (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.user = authData;
        next();
      }
    });
  } else {
    res.sendStatus(403);  // Prohibido si no hay token
  }
};

// Ruta para realizar la búsqueda (protegida con el token)
router.get('/buscar-avistamientos', verifyToken, (req, res) => {
  const { nombre_ave, lugar_avistamiento, usuario } = req.query;

  let query = 'SELECT * FROM avistamientos WHERE 1=1';
  
  if (nombre_ave) {
    query += ` AND nombre_ave LIKE '%${nombre_ave}%'`;
  }
  if (lugar_avistamiento) {
    query += ` AND lugar_avistamiento LIKE '%${lugar_avistamiento}%'`;
  }
  if (usuario) {
    query += ` AND usuario LIKE '%${usuario}%'`;
  }

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al realizar la búsqueda:', err);
      return res.status(500).json({ error: 'Error al realizar la búsqueda' });
    }
    res.json(results);
  });
});

module.exports = router;