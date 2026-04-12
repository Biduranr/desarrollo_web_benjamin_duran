// referencia a los elementos de registro-miembros
const tipoMiembroSelect = document.getElementById('tipo-miembro');
const seccionEstudiante = document.getElementById('seccion-estudiante');
const seccionProfesor = document.getElementById('seccion-profesor');

const updateSections = () => {
    let seleccion = tipoMiembroSelect.value;
    seccionEstudiante.classList.add('oculto');
    seccionProfesor.classList.add('oculto');

    document.getElementById('carrera').value = "";
    document.getElementById('departamento').value = "";

    if (seleccion === 'estudiante') {
        seccionEstudiante.classList.remove('oculto');
    } else if (seleccion === 'profesor') {
        seccionProfesor.classList.remove('oculto');
    }
}

tipoMiembroSelect.addEventListener('change', updateSections);