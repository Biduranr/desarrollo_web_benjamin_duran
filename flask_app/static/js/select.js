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

function cargarComunas(regionId) {
    const comunaSelect = document.getElementById('comuna');
    comunaSelect.innerHTML = '<option value="">Cargando...</option>';
    comunaSelect.disabled = true;

    if (!regionId) {
        comunaSelect.innerHTML = '<option value="">Seleccione una comuna</option>';
        return;
    }

    // Llamada a la ruta que creamos en app.py
    fetch(`/get-comunas/${regionId}`)
        .then(response => response.json())
        .then(data => {
            comunaSelect.innerHTML = '<option value="">Seleccione una comuna</option>';
            data.forEach(c => {
                const option = document.createElement('option');
                option.value = c.id;
                option.textContent = c.nombre;
                comunaSelect.appendChild(option);
            });
            comunaSelect.disabled = false;
        })
    }