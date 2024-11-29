import { urlAlumno } from "./utiles.js"; // Importa la URL base de los alumnos desde otro archivo

// Asigna la función 'buscarAlumnos' al objeto global 'window' para que pueda ser utilizada en el HTML
window.buscarAlumnos = buscarAlumnos;

// Función principal que realiza la búsqueda de los alumnos
function buscarAlumnos() {
    // Obtiene los valores ingresados en los campos de búsqueda (ID/NIF y nombre)
    const idNifAlumno = document.getElementById("idNif").value;
    const nombreAlumno = document.getElementById("nombre").value;

    // Define la URL base para la solicitud de búsqueda de alumnos
    let urlAlumnos = urlAlumno + "/buscar";

    // Verifica qué parámetro de búsqueda se ha proporcionado (ID-NIF o nombre)
    if (idNifAlumno && !nombreAlumno) {
        // Si solo se proporciona un ID-NIF, lo agrega a la URL
        urlAlumnos += "?idNif=" + idNifAlumno;
    } else if (nombreAlumno && !idNifAlumno) {
        // Si solo se proporciona un nombre, lo agrega a la URL
        urlAlumnos += "?nombre=" + nombreAlumno;
    } else {
        // Si no se proporciona ninguno de los dos parámetros, muestra un mensaje de alerta y termina la función
        alert("Escoja ID-NIF o Nombre para buscar.");
        return;
    }

    // Obtiene el cuerpo de la tabla donde se mostrarán los resultados de la búsqueda
    const tablaResultados = document.getElementById("resultados");
    tablaResultados.innerHTML = ""; // Limpiar resultados anteriores antes de mostrar nuevos

    // Realiza la solicitud HTTP usando fetch para obtener los datos de los alumnos
    fetch(urlAlumnos, { method: "GET" })
        .then(function(response) {
            // Convierte la respuesta en formato JSON
            return response.json();
        })
        .then(function(data) {
            // Verifica si la respuesta es un array y contiene datos
            if (Array.isArray(data) && data.length > 0) {
                // Si hay alumnos en los resultados, los agrega a la tabla
                data.forEach(function(alumno) {
                    const fila = document.createElement("tr");
                    fila.innerHTML = 
                        "<td>" + alumno.id + "</td>" +  // ID del alumno
                        "<td>" + alumno.nif + "</td>" +  // NIF del alumno
                        "<td>" + alumno.nombre + "</td>" +  // Nombre del alumno
                        "<td>" + alumno.apellido1 + "</td>" +  // Primer apellido del alumno
                        "<td>" + alumno.apellido2 + "</td>" +  // Segundo apellido del alumno
                        "<td>" + alumno.ciudad + "</td>" +  // Ciudad del alumno
                        "<td>" + alumno.sexo + "</td>";  // Sexo del alumno
                    tablaResultados.appendChild(fila); // Agrega la fila a la tabla de resultados
                });
            } else {
                // Si no se encuentran alumnos, muestra un mensaje en la tabla
                const fila = document.createElement("tr");
                fila.innerHTML = "<td colspan='7'>No se encontraron alumnos con los criterios especificados.</td>";
                tablaResultados.appendChild(fila); // Agrega la fila con el mensaje de error
            }
        })
        .catch(function(error) {
            // Si ocurre un error durante la solicitud, muestra un mensaje en la tabla
            const fila = document.createElement("tr");
            fila.innerHTML = "<td colspan='7'>Error al obtener los datos.</td>";
            tablaResultados.appendChild(fila); // Agrega la fila con el mensaje de error
        });
}
