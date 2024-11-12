import assert from 'assert'; 
import { expect } from 'chai';
import { crearNotificacion, obtenerNotificacion, marcarNotificacionLeida, marcarTodasLeidas, filtrarNotificacionPorTipo} from '../Notificaciones.js';
import sinon from 'sinon'; 

// Simulamos el ID de un usuario
const idUsuario = 83;
const tipoNotificacion = 'publicacion de ave rufo exitosa';
const mensajeNotificacion = 'Tu avistamiento fue publicado con éxito';
const estadoInicial = 'No Leída';

describe('Pruebas de Notificaciones', function() {
   
    it('Debe crear una notificación', async function() {
        const { data, error } = await crearNotificacion(idUsuario, tipoNotificacion, mensajeNotificacion);
        console.log('Resultado de crearNotificacion:', { data, error });  // Para verificar los datos
    
        
        expect(error).to.be.oneOf([null, undefined]);  
    
        expect(data).to.be.an('array').that.is.not.empty;
        const notificacionCreada = data[0];
        expect(notificacionCreada).to.have.property('id_usuario', idUsuario);
        expect(notificacionCreada).to.have.property('tipo_notificacion', tipoNotificacion);
        expect(notificacionCreada).to.have.property('mensaje_notificacion', mensajeNotificacion);
        expect(notificacionCreada).to.have.property('estado', estadoInicial);  
        expect(notificacionCreada).to.have.property('fecha_notificacion').that.is.a('string');  
    });
    
        it('Debe obtener notificaciones', async function() {
            const idUsuario = 83;  // Cambia esto a un id válido de usuario
    
            
            const { data, error } = await obtenerNotificacion(idUsuario);
    
           
            if (error) {
                console.error('Error al obtener notificaciones:', error);  // Muestra el error en consola
            }
    
            
            expect(error).to.be.null;  // Asegúrate de que no haya error
            expect(data).to.be.an('array').that.is.not.empty;  // Asegúrate de que los datos no estén vacíos
            expect(data[0]).to.have.property('id_usuario', idUsuario);  // Verifica que las notificaciones sean para el usuario correcto
        });
  
        //------------------------------------------------------------------------------------------------
        // Para marcas las notificaciones como leidas 
        it('Debe marcar una notificación como leída para un usuario específico', async () => {
            const idNotificacion = 83; // ID de la notificación que deseas marcar como leída
            const idUsuario = 83; // ID del usuario que deseas que marque la notificación como leída
        
            const respuesta = await marcarNotificacionLeida(idNotificacion, idUsuario);  // Llama a la función con ambos parámetros
        
            expect(respuesta).to.be.an('object');  // Verifica que la respuesta es un objeto
            expect(respuesta.data).to.have.property('estado').equal('Leída');  // Verifica que tiene la propiedad estado igual a "Leída"
        });

        
        //-------------------------------------------------------------------------------------
        it('Debe marcar todas las notificaciones como leídas correctamente', async () => {
            const id_usuario = 83; // Usuario con notificaciones pendientes (con estado "No Leída")
            
            const { message, data } = await marcarTodasLeidas(id_usuario);
        
            
            expect(message).to.equal('Notificaciones marcadas correctamente');
            
            
            expect(data).to.be.an('array').that.is.not.empty;  
            data.forEach(notificacion => {
                expect(notificacion.estado).to.equal('Leída'); 
            });
        });
        
        
        it('Debe manejar el caso en el que no hay notificaciones para el usuario', async () => {
            const idUsuario = 81; // Un usuario que no tiene notificaciones con estado "No Leída"
            
            const { data, message } = await marcarTodasLeidas(idUsuario);
            
            
            expect(message).to.equal('No se encontraron notificaciones para actualizar');
            expect(data).to.be.an('array').that.is.empty;  
        });
        
    
    //-------------------------------------------------------------------------------------
    it('Debe filtrar las notificaciones correctamente por tipo y paginación', async () => {
        // Simula la respuesta de la función 'select' de supabase
        const stub = sinon.stub(supabase.from('Notificaciones'), 'select').returns({
            eq: sinon.stub().returns({
                order: sinon.stub().returns({
                    range: sinon.stub().returns({
                        data: [{ 
                            id_usuario: 81, 
                            tipo_notificacion: 'publicacion de avistamiento con exito', 
                            estado: 'No Leída', 
                            fecha_notificacion: '2024-11-12' 
                        }],
                        error: null,
                    })
                })
            })
        });
    
        // Datos de entrada para el filtro
        const idUsuario = 81;
        const tipoNotificacion = 'publicacion de avistamiento con exito';
        const limite = 10;
        const pagina = 1;
    
        // Llama a la función que se está probando
        const { data, error } = await Notificaciones.filtrarNotificacionPorTipo(idUsuario, tipoNotificacion, limite, pagina);
    
        // Asegúrate de que no haya errores
        expect(error).to.be.null;
    
        // Verifica que los datos sean los esperados
        expect(data).to.be.an('array').that.is.not.empty;
        expect(data[0].tipo_notificacion).to.equal(tipoNotificacion);
        expect(data[0].estado).to.equal('No Leída');
    
        // Restaura el stub después de la prueba
        stub.restore();
    });
   
    //_________________________________________________________________________________

});
