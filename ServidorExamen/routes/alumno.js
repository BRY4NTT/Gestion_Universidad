// RUTAS
const express = require("express");
const router = express.Router();
const alumnoService = require("../services/alumnoService");

// Buscar Alumno por ID, NIF o nombre
router.get("/buscar", async function (req, res) {
    const { idNif, nombre } = req.query;  // Obtener parámetros de la query

    try {
        // Llamamos al servicio que busca el alumno por ID, NIF o nombre
        const result = await alumnoService.alumnoIdNif(idNif, nombre);

        // Si encontramos resultados, los enviamos como respuesta
        if (result.data.length > 0) {
            res.status(200).json(result.data);
        } else {
            // Si no encontramos resultados, enviamos un mensaje de no encontrado
            res.status(404).json({ msg: "No se encontró ningún alumno con los criterios especificados." });
        }
    } catch (err) {
        // En caso de error, enviamos un mensaje de error
        res.status(500).json({ error: err.message || "Error interno al realizar la búsqueda." });
    }
});

// Exportamos el router
module.exports = router;
