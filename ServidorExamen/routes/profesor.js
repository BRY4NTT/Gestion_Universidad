const express = require("express");
const router = express.Router();
const profesorService = require("../services/profesorService");

router.get("/filtro", async (req, res) => {
    const { nombre, apellido1, sexo, departamento } = req.query;
    try {
        const result = await profesorService.filterProfesor(nombre, apellido1, sexo, departamento);
        if (result.data.length) {
            res.status(200).json(result.data);
        } else {
            res.status(404).json({ msg: "No se encontraron profesores con los criterios especificados" });
        }
    } catch (err) {
        console.error("Error al filtrar profesores:", err.message);
        res.status(500).json({ error: "Error interno al filtrar por profesor" });
    }
});

router.get("/", async (req, res) => {
    try {
        const profesores = await profesorService.getProfesores();
        res.status(200).json(profesores);
    } catch (err) {
        console.error("Error al obtener los profesores:", err.message);
        res.status(500).json({ error: "Error interno al obtener los profesores" });
    }
});

router.get('/departamento', async (req, res) => {
    try {
        const departamentos = await profesorService.getDepartamentos();
        res.json(departamentos);
    } catch (error) {
        console.error('Error al obtener los departamentos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

module.exports = router;
