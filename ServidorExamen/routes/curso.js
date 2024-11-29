const express = require("express");
const router = express.Router();
const cursoService = require("../services/cursoService");

// Ruta para obtener todos los grados
router.get('/grados', async (req, res) => {
    try {
        const grados = await cursoService.getGrados(); // Obtiene los grados
        res.json(grados); // Responde con los grados obtenidos
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los grados' }); // Maneja error
    }
});

// Ruta para obtener asignaturas por grado
router.get('/asignaturas', async (req, res) => {
    const { idGrado } = req.query;  // Obtiene idGrado desde los parámetros de la URL
    if (!idGrado) {
        return res.status(400).json({ message: "El parámetro idGrado es obligatorio." }); // Validación
    }
    
    try {
        const asignaturas = await cursoService.getAsignaturasPorGrado(idGrado); // Obtiene las asignaturas por grado
        res.json(asignaturas); // Responde con las asignaturas obtenidas
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las asignaturas' }); // Maneja error
    }
});

module.exports = router;
