import { expect } from 'chai';
import { crearAvistamiento, obtenerAvistamientos, actualizarAvistamiento, eliminarAvistamiento } from '../Avistamientos.js';

describe('Funciones para avistamientos', () => {
  it('Debe crear un avistamiento con éxito', async () => {
    const id = await crearAvistamiento('Avistamiento de halcón', 'foto_halcon.jpg');
    console.log('ID de avistamiento creado:', id);
    expect(id).to.not.be.null;
  });

  it('Debe obtener los avistamientos con éxito', async () => {
    const avistamientos = await obtenerAvistamientos();
    console.log('Avistamientos obtenidos:', avistamientos);
    expect(avistamientos).to.be.an('array');
    expect(avistamientos.length).to.be.greaterThan(0);
  });

  it('Debe actualizar un avistamiento con éxito', async function() {
    const id_avistamiento = 4; // Asegúrate de que este ID exista en la base de datos
    const descripcion_avistamiento = 'Avistamiento de águila en vuelo'; // Nueva descripción
    const foto_avistamiento = 'foto_aguila_vuelo.jpg'; // Nueva foto

    const resultado = await actualizarAvistamiento(id_avistamiento, descripcion_avistamiento, foto_avistamiento);

    // Verifica que el resultado no esté vacío
    expect(resultado).to.not.be.null;

    // Verifica que la descripción del avistamiento se haya actualizado
    expect(resultado[0].descripcion_avistamiento).to.equal('Avistamiento de águila en vuelo');
  });

  it('Debe eliminar un avistamiento con éxito', async () => {
    const id = 1;
    const resultado = await eliminarAvistamiento(id);
    console.log('Resultado de eliminación:', resultado);
    expect(resultado).to.be.true;
  });
});
