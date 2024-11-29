// Importación de módulos necesarios
const db = require('./db');  // Para interactuar con la base de datos
const helper = require('../helper');  // Contiene funciones auxiliares como emptyOrRows
const config = require('../config');  // (Este módulo no se usa en el código actual, pero se importa)

// Función principal para obtener datos de un alumno
async function getAlumno(idNif, nombre) {
    // Inicializa el mensaje de búsqueda
    let SearchMsg = "búsqueda de alumno";  // Mensaje predeterminado que indica el inicio de la búsqueda

    // Si se recibe un NIF válido, cambia el mensaje de búsqueda
    if (DniValido(idNif)) {
        SearchMsg = "Buscando alumno por NIF: " + idNif;  // Si el NIF es válido, se indica que la búsqueda es por NIF
    } else if (idNif !== undefined) {
        SearchMsg = "Buscando alumno por ID: " + idNif;  // Si no es un NIF pero es un ID, se indica búsqueda por ID
    }

    // Construcción inicial de la consulta SQL
    let sql = "SELECT id, nif, nombre, apellido1, apellido2, ciudad, sexo FROM alumno WHERE 1 ";  // Selección de campos

    // Si el NIF es válido, se agrega un filtro en la consulta SQL para buscar por NIF
    if (DniValido(idNif)) {
        sql += " AND nif = '" + idNif + "'";  // Si el NIF es válido, añade un filtro en la consulta para buscar ese NIF
    } else if (idNif !== undefined) {
        sql += " AND id = " + idNif;  // Si el NIF no es válido pero existe un ID, busca por ID
    }

    // Si se proporciona un nombre, se agrega un filtro para buscar por nombre parcial
    if (nombre !== undefined) {
        sql += " AND nombre LIKE '%" + nombre + "%'";  // Usa LIKE para permitir búsquedas parciales del nombre
    }

    // Ejecución de la consulta SQL
    const rows = await db.query(sql);  // Realiza la consulta en la base de datos
    const data = helper.emptyOrRows(rows);  // Utiliza helper.emptyOrRows para manejar los resultados (vacíos o con datos)

    // Actualiza el mensaje de búsqueda dependiendo de si se encontraron resultados
    if (data.length === 0) {
        SearchMsg = "No se encontró ningún alumno con los parámetros dados.";  // Si no hay resultados, actualiza el mensaje
    } else {
        SearchMsg = "Se encontraron " + data.length + " alumno(s).";  // Si se encuentran resultados, muestra cuántos alumnos fueron encontrados
    }

    // Devuelve los resultados de la búsqueda
    return { data };  // Retorna los datos obtenidos (alumnos encontrados)
}

// Función que verifica si el NIF proporcionado tiene el formato correcto
function DniValido(dni) {
    // Expresión regular que valida un NIF español (8 dígitos seguidos de una letra)
    const regex = /^[0-9]{8}[A-Za-z]$/;

    // Retorna si el DNI cumple con el formato de la expresión regular
    if (!regex.test(dni)) {
        return false;  // Si no cumple con el formato, devuelve false
    }

    return true;  // Si cumple, devuelve true
}

// Exportación de la función getAlumno para que pueda ser utilizada en otros archivos
module.exports = {
    getAlumno
};
