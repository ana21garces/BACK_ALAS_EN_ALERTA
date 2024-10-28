require('dotenv').config(); // Carga las variables de entorno desde .env
const { loginAuth } = require('../autenticacion/loginAuth'); // Asegúrate de que la ruta sea correcta

// Define los datos de prueba
const emailDePrueba = 'alexis@gmail.com'; // Asegúrate de que este email esté en la base de datos
const contraseñaDePrueba = '2022'; // Coloca aquí la contraseña en texto claro que corresponde al usuario

// Función para probar la autenticación de login
async function probarLoginAuth() {
    try {
        // Llama a la función de autenticación con los datos de prueba
        const resultado = await loginAuth(emailDePrueba, contraseñaDePrueba);

        // Verifica si hay errores en el resultado
        if (resultado.error) {
            console.log('Error:', resultado.error);
        } else {
            // Si la autenticación es exitosa, muestra el token y el mensaje
            console.log('Token:', resultado.token);
            console.log('Mensaje:', resultado.message);
        }
    } catch (err) {
        // Maneja cualquier error que ocurra durante la prueba
        console.error('Error en la prueba de loginAuth:', err.message);
    }
}

// Ejecuta la función de prueba
probarLoginAuth();
