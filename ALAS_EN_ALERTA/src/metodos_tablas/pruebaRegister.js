import dotenv from 'dotenv';
dotenv.config(); // Carga las variables de entorno desde .env

// Función de prueba para registrar un nuevo usuario
async function testRegisterAuth() {
    // Importa registerAuth dinámicamente
    const { registerAuth } = await import('../autenticacion/registerAuth.js'); // Asegúrate de que el archivo y ruta sean correctos
    
    console.log('Probando registro de nuevo usuario...');
    let result = await registerAuth('yobelys', 'yobe@gmail.com', '123', 'Funcionario');
    console.log('Resultado de registro exitoso:', result);

    // Intentar registrar el mismo usuario para probar la existencia
    console.log('Probando registro de usuario existente...');
    result = await registerAuth('yobelys', 'yobe@gmail.com', '123', 'Funcionario');
    console.log('Resultado de registro existente:', result);
}

// Ejecutar la prueba
testRegisterAuth().catch((error) => console.error('Error en la prueba:', error));
