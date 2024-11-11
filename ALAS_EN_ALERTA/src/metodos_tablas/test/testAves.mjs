import { expect } from 'chai';
import { crearAve, obtenerAves, actualizarAve, eliminarAve } from '../Aves.js';

describe('Funciones para aves', () => {
  it('Debe crear un ave con éxito', async () => {
    const id = await crearAve('Águila', 'Ave rapaz de gran tamaño');
    console.log('ID de ave creado:', id);
    expect(id).to.not.be.null;
  });

  it('Debe obtener un ave con éxito', async () => {
    const aves = await obtenerAves();
    console.log('Aves obtenidas:', aves);
    expect(aves).to.be.an('array');
    expect(aves.length).to.be.greaterThan(0);
  });

  
    it('Debe actualizar un ave con éxito', async function() {
      const id_ave = 4;  // Asegúrate de que este ID exista en la base de datos
      const nombre_ave = 'Águila real';  // Nuevo nombre
      const descripcion_ave = 'Un águila majestuosa, símbolo de fuerza';  // Nueva descripción

      const resultado = await actualizarAve(id_ave, nombre_ave, descripcion_ave);

      // Verifica que el resultado no esté vacío
      expect(resultado).to.not.be.null;

      // Verifica que el nombre de la ave se haya actualizado
      expect(resultado[0].nombre_ave).to.equal('Águila real');
    
  });

  it('Debe eliminar un ave con éxito', async () => {
    const id = 1;
    const resultado = await eliminarAve(id);
    console.log('Resultado de eliminación:', resultado);
    expect(resultado).to.be.true;
  });
});
