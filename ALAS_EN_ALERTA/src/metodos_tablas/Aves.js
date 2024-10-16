const supabase = require('../conexion');
const express = require('express');

// Función para crear un registro de aves con nombre y descripción
async function crearAve(nombre_ave, descripcion_ave) {
    try {
        
        const { data, error } = await supabase
            .from('aves')
            .insert([
                {
                    nombre_ave: nombre_ave,
                    descripcion_ave: descripcion_ave,  
                    
                    // No incluimos 'id_ave' porque será generado automáticamente
                }
            ])
            .select();

        if (error) {
            console.error('Error al crear el registro de ave:', error);
            return null;
        } else {
            console.log('Ave registrada:', data);
            console.log('El registro del ave se creó con éxito');
            return data[0].id_ave;  // Retorna el ID del registro creado
        }
    } catch (error) {
        console.error('Error al crear el registro de ave:', error);
        return null;
    }
}

module.exports = { crearAve };

// Función para obtener todas las aves
async function obtenerAves() {
    const { data, error } = await supabase
        .from('aves')
        .select('*');

    if (error) {
        console.error('Error al obtener aves:', error);
        return null;
    } else {
        console.log('Aves:', data);
        return data;  // Retorna los datos para el front-end
    }
}

// Función para actualizar un registro de ave con nombre y descripción
async function actualizarAve(id_ave, nombre_ave, descripcion_ave) {
    const { data, error } = await supabase
        .from('aves')
        .update({
            nombre_ave: nombre_ave,
            descripcion_ave: descripcion_ave,  // Actualiza la descripción del ave
            
        })
        .eq('id_ave', id_ave)  // Filtra por el ID del ave
        .select();

    if (error) {
        console.error('Error al actualizar el registro de ave:', error);
        return null;
    } else {
        console.log('Registro de ave actualizado:', data);
        return data;  // Retorna los datos actualizados para el front-end
    }
}

// Función para eliminar un registro de ave
async function eliminarAve(id_ave) {
    const { error } = await supabase
        .from('aves')
        .delete()
        .eq('id_ave', id_ave);  // Filtra por el ID del ave

    if (error) {
        console.error('Error al eliminar el registro de ave:', error);
        return null;
    } else {
        console.log(`Registro de ave con ID ${id_ave} eliminado correctamente.`);
        return true;  // Retorna true si la eliminación fue exitosa
    }
}

crearAve();
obtenerAves();
actualizarAve();
eliminarAve();
