const db = require('./db');
const helper = require('../helper');

async function filterProfesor(nombre, apellido1, sexo, departamento) {
    let sql = "SELECT p.nif, p.nombre, p.apellido1, p.apellido2, p.ciudad, p.sexo, d.nombre AS departamento FROM profesor p JOIN departamento d ON p.id_departamento=d.id WHERE 1";

    if (nombre) {
        sql += " AND p.nombre LIKE '%" + nombre + "%'";
    }

    if (apellido1) {
        sql += " AND p.apellido1 LIKE '%" + apellido1 + "%'";
    }

    if (sexo === "H" || sexo === "M") {
        sql += " AND p.sexo='" + sexo + "'";
    }

    if (departamento) {
        sql += " AND d.nombre LIKE '%" + departamento + "%'";
    }

    const rows = await db.query(sql);
    const data = helper.emptyOrRows(rows);
  
    return { data };
}

async function getProfesores() {
    const rows = await db.query("SELECT p.nif, p.nombre, p.apellido1, p.apellido2, p.ciudad, p.sexo, d.nombre AS departamento FROM profesor p JOIN departamento d ON p.id_departamento=d.id");
    const data = helper.emptyOrRows(rows);
    return { data };
}

async function getDepartamentos() {
    const rows = await db.query("SELECT nombre FROM departamento");
    const data = helper.emptyOrRows(rows);
    return { data };
}

module.exports = {
    filterProfesor,
    getDepartamentos,
    getProfesores
};
