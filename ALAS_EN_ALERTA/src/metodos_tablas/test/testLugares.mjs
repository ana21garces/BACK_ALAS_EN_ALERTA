import { expect } from 'chai';
import { crearLugar, obtenerLugares, actualizarLugar, eliminarLugar } from '../Lugares.js';

describe('Funciones para lugares', () => {
  let id_lugar;

  // Crear un lugar antes de realizar las pruebas
  before(async () => {
    const id = await crearLugar('Parque Nacional', 'Un hermoso parque nacional lleno de flora y fauna');
    id_lugar = id;
    console.log('ID de lugar creado:', id_lugar);
    expect(id_lugar).to.not.be.null;
  });

  it('Debe obtener los lugares con éxito', async () => {
    const lugares = await obtenerLugares();
    console.log('Lugares obtenidos:', lugares);
    expect(lugares).to.be.an('array');
    expect(lugares.length).to.be.greaterThan(0);
  });

  it('Debe actualizar un lugar con éxito', async function() {
    const nombre_lugar = 'Parque Natural';  // Nuevo nombre
    const descripcion_lugar = 'Un parque hermoso para avistamientos';  // Nueva descripción

    const resultado = await actualizarLugar(id_lugar, nombre_lugar, descripcion_lugar);

    // Verifica que el resultado no esté vacío
    expect(resultado).to.not.be.null;
    expect(resultado).to.be.an('array').that.is.not.empty;

    // Verifica que el nombre del lugar se haya actualizado
    if (resultado[0]) {
        expect(resultado[0].nombre_lugar).to.equal('Parque Natural');
    } else {
        throw new Error('El lugar no se actualizó correctamente');
    }
  });

  it('Debe eliminar un lugar con éxito', async () => {
    const resultado = await eliminarLugar(id_lugar);
    console.log('Resultado de eliminación:', resultado);
    expect(resultado).to.be.true;
  });

  // Eliminar el lugar de prueba después de las pruebas
  after(async () => {
    const eliminado = await eliminarLugar(id_lugar);
    expect(eliminado).to.be.true;
  });
});
