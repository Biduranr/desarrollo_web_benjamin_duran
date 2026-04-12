const cuerpoTabla = document.getElementById("cuerpo-tabla");
const msjVacio = document.getElementById("msje-vacio");
const tabla = document.getElementById("tabla-miembros");

const miembros = [
    {
        nombre: 'Alexis Sanchez',
        email: 'alexis.sanchez@example.com',
        telefono: '912345678',
        tipo: 'Estudiante',
        detalle: 'plan-comun',
    },
    {
        nombre: 'Maria Garcia',
        email: 'maria.garcia@example.com',
        telefono: '987654321',
        tipo: 'Profesor',
        detalle: 'Departamento de Ciencias de la Computación',
    }
];

const renderTable = () => {
    cuerpoTabla.innerHTML = "";

    if (miembros.length === 0) {
        msjVacio.classList.remove("oculto");
        tabla.classList.add("oculto");
        return;
    } else {
        msjVacio.classList.add("oculto");
        tabla.classList.remove("oculto");
    }

    miembros.forEach(miembro => {
        const fila = document.createElement("tr");
        
        const celdaNombre = document.createElement("td");
        celdaNombre.textContent = miembro.nombre;

        const celdaEmail = document.createElement("td");
        celdaEmail.textContent = miembro.email;

        const celdaTelefono = document.createElement("td");
        celdaTelefono.textContent = miembro.telefono;

        const celdaTipo = document.createElement("td");
        celdaTipo.textContent = miembro.tipo;

        const celdaDetalle = document.createElement("td");
        celdaDetalle.textContent = miembro.detalle;

        fila.appendChild(celdaNombre);
        fila.appendChild(celdaEmail);
        fila.appendChild(celdaTelefono);
        fila.appendChild(celdaTipo);
        fila.appendChild(celdaDetalle);
        cuerpoTabla.appendChild(fila);
    });
};

renderTable();