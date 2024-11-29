const db = require('./db');
const helper = require('../helper');

// Obtener todos los grados
async function getGrados() {
    const sql = "SELECT id, nombre FROM grado";  // Consulta SQL para obtener los grados
    const rows = await db.query(sql);           // Ejecuta la consulta en la base de datos
    return { data: helper.emptyOrRows(rows) };  // Devuelve los resultados procesados
}

// Obtener asignaturas por grado
async function getAsignaturasPorGrado(nombreGrado) {
    const sql = `
        SELECT 
            a.id, a.nombre, a.creditos, a.curso, a.cuatrimestre, 
            p.nombre AS profesor 
        FROM asignatura a
        LEFT JOIN profesor p ON a.id_profesor = p.id 
        JOIN grado g ON a.id_grado = g.id 
        WHERE g.nombre = ?`;
    const rows = await db.query(sql, [nombreGrado]); // Usa placeholder para prevenir inyección SQL
    return { data: helper.emptyOrRows(rows) };        // Devuelve los resultados procesados
}

module.exports = {
    getGrados,
    getAsignaturasPorGrado
};
