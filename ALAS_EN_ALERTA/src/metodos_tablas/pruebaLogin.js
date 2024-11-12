import dotenv from 'dotenv';
dotenv.config(); // Carga las variables de entorno desde .env

// Importación dinámica de loginAuth
const { loginAuth } = await import('../autenticacion/loginAuth.js'); 

// Define los datos de prueba
const emailDePrueba = 'yobe@gmail.com'; 
const contraseñaDePrueba = '123'; 

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
