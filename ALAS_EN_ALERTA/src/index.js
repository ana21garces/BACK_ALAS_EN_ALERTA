const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const rutasUsuarios = require('./rutas'); // Ajusta la ruta si es necesario

// Imprime las variables de entorno para verificar que se están cargando
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);

// Crear conexión con MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1);
  }
  console.log('Conectado a la base de datos MySQL');
});

app.get('/', (req, res) => {
  res.send('Alas en Alerta');
});

// Usar las rutas de usuario (rutas de registro y login)
app.use('/', rutasUsuarios);  // Aquí asocias las rutas que están en el archivo rutasUsuarios


app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = db;  // Exportar la conexión para usarla en otros archivos