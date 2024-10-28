require('dotenv').config(); // Carga las variables de entorno desde .env
const { registerAuth } = require('../autenticacion/registerAuth');

// Función de prueba para registrar un nuevo usuario
async function testRegisterAuth() {
    console.log('Probando registro de nuevo usuario...');
    let result = await registerAuth('maye', 'maye@gmail.com', '123', 'Visitante');
    console.log('Resultado de registro exitoso:', result);

    // Intentar registrar el mismo usuario para probar la existencia
    console.log('Probando registro de usuario existente...');
    result = await registerAuth('maye', 'maye@gmail.com', '123', 'Visitante');
    console.log('Resultado de registro existente:', result);
}

// Ejecutar la prueba
testRegisterAuth().catch((error) => console.error('Error en la prueba:', error));