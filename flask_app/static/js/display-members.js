const cuerpoTabla = document.getElementById("cuerpo-tabla");
const msjVacio = document.getElementById("msje-vacio");
const tabla = document.getElementById("tabla-miembros");
const filtroTipo = document.getElementById("filtro-tipo");
const ordenarPor = document.getElementById("ordenar-por");
const btnPrev = document.getElementById("prev-btn");
const btnNext = document.getElementById("next-btn");
const txtPagina = document.getElementById("pagina-actual");  

let paginaActual = 1;
const miembrosPorPagina = 5;

const miembros = [
    {
        nombre: 'Alexis Sanchez',
        email: 'alexis.sanchez@example.com',
        telefono: '912345678',
        tipo: 'Estudiante',
        detalle: 'plan-comun',
    },
    {
        nombre: 'Cristiano Ronaldo',
        email: 'cristiano.ronaldo@example.com',
        telefono: '987654321',
        tipo: 'Profesor',
        detalle: 'Departamento de Ciencias de la Computación',
    },
    { 
        nombre: 'Lionel Messi', 
        email: 'messi@example.com', 
        telefono: '955555555', 
        tipo: 'Estudiante', 
        detalle: 'plan-comun' 
    },
    { 
        nombre: 'Zinedine Zidane', 
        email: 'zizou@example.com', 
        telefono: '944444444', 
        tipo: 'Profesor', 
        detalle: 'DCC' },
    { 
        nombre: 'Ronaldinho Gaucho', 
        email: 'r10@example.com', 
        telefono: '933333333', 
        tipo: 'Estudiante', 
        detalle: 'plan-comun' },
    { 
        nombre: 'Kylian Mbappe', 
        email: 'kiki@example.com', 
        telefono: '922222222', 
        tipo: 'Administrativo',
        detalle: 'N/A'
    }
];


const renderTable = () => {
    cuerpoTabla.innerHTML = "";

    const tipoSeleccionado = filtroTipo.value;
    let miembrosFiltrados = miembros.filter(m => {
        return tipoSeleccionado === "todos" || m.tipo === tipoSeleccionado;
    });

    const criterioOrden = ordenarPor.value;
    miembrosFiltrados.sort((a, b) => {
        if (criterioOrden === "nombre-asc") {
            return a.nombre.localeCompare(b.nombre);
        }
        if (criterioOrden === "nombre-desc") {
            return b.nombre.localeCompare(a.nombre);
        }
        if (criterioOrden === "email") {
            return a.email.localeCompare(b.email);
        }
        return 0;
    });

    const totalPaginas = Math.ceil(miembrosFiltrados.length / miembrosPorPagina);
    if (paginaActual > totalPaginas) paginaActual = totalPaginas;

    const inicio = (paginaActual - 1) * miembrosPorPagina;
    const fin = inicio + miembrosPorPagina;
    const miembrosPagina = miembrosFiltrados.slice(inicio, fin);

    if (miembros.length === 0) {
        msjVacio.classList.remove("oculto");
        tabla.classList.add("oculto");
        return;
    } else {
        msjVacio.classList.add("oculto");
        tabla.classList.remove("oculto");
    }

    miembrosPagina.forEach(miembro => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${miembro.nombre}</td>
            <td>${miembro.email}</td>
            <td>${miembro.telefono}</td>
            <td>${miembro.tipo}</td>
            <td>${miembro.detalle || 'No especificado'}</td>
        `;
        cuerpoTabla.appendChild(fila);
    });

    txtPagina.textContent = `Página ${paginaActual} de ${totalPaginas}`;
    btnPrev.disabled = paginaActual === 1;
    btnNext.disabled = paginaActual === totalPaginas;
};

filtroTipo.addEventListener("change", () => { paginaActual = 1; renderTable(); });
ordenarPor.addEventListener("change", renderTable);
btnPrev.addEventListener("click", () => { paginaActual--; renderTable(); });
btnNext.addEventListener("click", () => { paginaActual++; renderTable(); });

renderTable();