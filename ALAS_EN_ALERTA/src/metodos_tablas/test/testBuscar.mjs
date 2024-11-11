import { expect } from 'chai';
import { buscarAves, buscarLugares } from '../Buscar.js';

describe('Funciones de búsqueda', () => {
  it('Debe buscar aves por nombre con éxito', async () => {
    const query = 'Águila';  // Ejemplo de búsqueda por nombre de ave
    const resultado = await buscarAves(query);
    console.log('Resultado de la búsqueda de aves:', resultado);

    // Verifica que el resultado no esté vacío
    expect(resultado).to.be.an('array').that.is.not.empty;

    // Verifica que los nombres de las aves contengan la palabra 'Águila'
    resultado.forEach((ave) => {
      expect(ave.nombre_ave.toLowerCase()).to.include(query.toLowerCase());
    });
  });

  it('Debe buscar lugares por nombre con éxito', async () => {
    const query = 'Parque';  // Ejemplo de búsqueda por nombre de lugar
    const resultado = await buscarLugares(query);
    console.log('Resultado de la búsqueda de lugares:', resultado);

    // Verifica que el resultado no esté vacío
    expect(resultado).to.be.an('array').that.is.not.empty;

    // Verifica que los nombres de los lugares contengan la palabra 'Parque'
    resultado.forEach((lugar) => {
      expect(lugar.nombre_lugar.toLowerCase()).to.include(query.toLowerCase());
    });
  });

  it('Debe devolver un arreglo vacío si no se encuentran resultados de aves', async () => {
    const query = 'NoExiste';  // Búsqueda con un término que no debe existir
    const resultado = await buscarAves(query);
    console.log('Resultado de búsqueda de aves con término no encontrado:', resultado);

    // Verifica que el resultado sea un arreglo vacío
    expect(resultado).to.be.an('array').that.is.empty;
  });

  it('Debe devolver un arreglo vacío si no se encuentran resultados de lugares', async () => {
    const query = 'NoExiste';  // Búsqueda con un término que no debe existir
    const resultado = await buscarLugares(query);
    console.log('Resultado de búsqueda de lugares con término no encontrado:', resultado);

    // Verifica que el resultado sea un arreglo vacío
    expect(resultado).to.be.an('array').that.is.empty;
  });
});
