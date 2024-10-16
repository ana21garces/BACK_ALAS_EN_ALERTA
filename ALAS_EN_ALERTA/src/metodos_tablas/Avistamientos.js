const supabase = require('../conexion');
const express = require('express');

// Función para crear un registro de avistamientos con descripción y foto
async function crearAvistamiento(descripcion_avistamiento, foto_avistamiento) {
    try {
        
        const { data, error } = await supabase
            .from('avistamientos')
            .insert([
                {
                    descripcion_avistamiento: descripcion_avistamiento,  
                    foto_avistamiento: foto_avistamiento,  
                    fecha_hora_registro: new Date()  // Fecha y hora actuales
                    // Los campos id_ave, id_lugar, id_usuario se generan automáticamente
                }
            ])
            .select();

        if (error) {
            console.error('Error al crear el registro de avistamiento:', error);
            return null;
        } else {
            console.log('Avistamiento registrado:', data);
            console.log('El registro del avistamiento se creó con éxito');
            return data[0].id_avistamiento;  // Retorna el ID del registro creado
        }
    } catch (error) {
        console.error('Error al crear el registro de avistamiento:', error);
        return null;
    }
}

module.exports = { crearAvistamiento };

// Función para obtener todos los avistamientos
async function obtenerAvistamientos() {
    const { data, error } = await supabase
        .from('avistamientos')
        .select('*');

    if (error) {
        console.error('Error al obtener avistamientos:', error);
        return null;
    } else {
        console.log('Avistamientos:', data);
        return data;  // Retorna los datos para el front-end
    }
}

// Función para actualizar un registro de avistamiento con descripción y foto
async function actualizarAvistamiento(id_avistamiento, descripcion_avistamiento, foto_avistamiento) {
    const { data, error } = await supabase
        .from('avistamientos')
        .update({
            descripcion_avistamiento: descripcion_avistamiento, 
            foto_avistamiento: foto_avistamiento  
        })
        .eq('id_avistamiento', id_avistamiento)  // Filtra por el ID del avistamiento
        .select();

    if (error) {
        console.error('Error al actualizar el registro de avistamiento:', error);
        return null;
    } else {
        console.log('Registro de avistamiento actualizado:', data);
        return data;  // Retorna los datos actualizados para el front-end
    }
}

// Función para eliminar un registro de avistamiento
async function eliminarAvistamiento(id_avistamiento) {
    const { error } = await supabase
        .from('avistamientos')
        .delete()
        .eq('id_avistamiento', id_avistamiento);  

    if (error) {
        console.error('Error al eliminar el registro de avistamiento:', error);
        return null;
    } else {
        console.log(`Registro de avistamiento con ID ${id_avistamiento} eliminado correctamente.`);
        return true;  // Retorna true si la eliminación fue exitosa
    }
}

crearAvistamiento();
obtenerAvistamientos();
actualizarAvistamiento();
eliminarAvistamiento();