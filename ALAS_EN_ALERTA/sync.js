const sequelize = require('./src/prueba.js'); // Ajusta la ruta según tu estructura
const Usuario = require('./models/Users.js');

// Sincroniza el modelo para crear la tabla en la base de datos
sequelize.sync({ force: true }) // `force: true` recrea la tabla si ya existe; úsalo con precaución
  .then(() => {
    console.log('Tabla Usuarios creada con éxito en Railway.');
  })
  .catch((err) => {
    console.error('Error al sincronizar el modelo:', err);
  });