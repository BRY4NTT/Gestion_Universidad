import { urlProfesor } from "./utiles.js";

document.addEventListener("DOMContentLoaded", () => {
  ListDepartamentos();
  cargarProfesores();
});

window.ListDepartamentos = ListDepartamentos;
function ListDepartamentos() {
    // URL para obtener los departamentos
    const urlDepartamentos = urlProfesor + "/departamento";

    // Solicitar los departamentos
    fetch(urlDepartamentos)
        .then(response => response.json()) // Convertir respuesta a JSON
        .then(data => {
            const select = document.getElementById('departamento');
            select.innerHTML = "<option value=''>Departamento</option>"; // Opción inicial

            // Agregar opciones de departamentos
            data.data.forEach(function(departamento) {
                select.innerHTML += "<option value='" + departamento.nombre + "'>" + departamento.nombre + "</option>";
            });
        })
        .catch(function() {
            console.error('Error al cargar los departamentos');
        });
}

window.cargarProfesores = cargarProfesores;

function cargarProfesores() {
  const tablaResultados = document.getElementById("resultados");

  // Verificar si el elemento existe
  if (!tablaResultados) {
      console.error("No se encontró el elemento con id 'resultados'.");
      return;
  }

  // Limpiar la tabla antes de cargar nuevos datos
  tablaResultados.innerHTML = "";

  // Realizar la solicitud a la API
  fetch(urlProfesor)
      .then(response => response.ok ? response.json() : Promise.reject('Error al obtener datos'))
      .then(data => {
          // Si hay datos de profesores, los agregamos a la tabla
          if (data.data && data.data.length) {
              data.data.forEach(profesor => {
                  let fila = "<tr>" +
                      "<td>" + profesor.nif + "</td>" +
                      "<td>" + profesor.nombre + "</td>" +
                      "<td>" + profesor.apellido1 + "</td>" +
                      "<td>" + profesor.apellido2 + "</td>" +
                      "<td>" + profesor.ciudad + "</td>" +
                      "<td>" + profesor.sexo + "</td>" +
                      "<td>" + profesor.departamento + "</td>" +
                  "</tr>";
                  tablaResultados.innerHTML += fila;  // Agregar fila a la tabla
              });
          } else {
              // Si no hay profesores, mostrar un mensaje en la tabla
              tablaResultados.innerHTML = "<tr><td colspan='7'>No hay profesores registrados.</td></tr>";
          }
      })
      .catch(() => {
          // En caso de error, mostrar un mensaje en la tabla
          tablaResultados.innerHTML = "<tr><td colspan='7'>Error al cargar los datos de los profesores.</td></tr>";
      });
}

window.searchprofe=searchprofe;

function searchprofe() {
  // Obtener los valores del formulario
  const nombre = document.getElementById("nombre").value;
  const apellido1 = document.getElementById("apellido1").value;
  const sexo = document.getElementById("sexo").value;
  const departamento = document.getElementById("departamento").value;

  // Construir la URL para la solicitud
  const url = urlProfesor + "/filtro?nombre=" + nombre + "&apellido1=" + apellido1 + "&sexo=" + sexo + "&departamento=" + departamento;

  // Limpiar resultados anteriores
  const tablaResultados = document.getElementById("resultados");
  tablaResultados.innerHTML = "";

  // Realizar la solicitud
  fetch(url)
      .then(function(response) {
          return response.json();
      })
      .then(function(data) {
          // Si hay datos, agregar a la tabla
          if (Array.isArray(data) && data.length > 0) {
              data.forEach(function(profesor) {
                  tablaResultados.innerHTML += 
                      "<tr>" +
                          "<td>" + profesor.nif + "</td>" +
                          "<td>" + profesor.nombre + "</td>" +
                          "<td>" + profesor.apellido1 + "</td>" +
                          "<td>" + profesor.apellido2 + "</td>" +
                          "<td>" + profesor.ciudad + "</td>" +
                          "<td>" + profesor.sexo + "</td>" +
                          "<td>" + profesor.departamento + "</td>" +
                      "</tr>";
              });
          } else {
              // Si no se encuentran profesores
              tablaResultados.innerHTML = "<tr><td colspan='7'>No se encontraron profesores.</td></tr>";
          }
      })
      .catch(function() {
          // Manejo de errores
          tablaResultados.innerHTML = "<tr><td colspan='7'>Error al obtener los datos.</td></tr>";
      });
}

