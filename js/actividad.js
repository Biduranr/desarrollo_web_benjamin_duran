const formActividad = document.getElementById('form-actividad');

const nombreMiembro = document.getElementById('nombre-miembro');
const tipoActividad = document.getElementById('tipo-actividad');
const descripcionActividad = document.getElementById('descripcion-actividad');
const fechaActividad = document.getElementById('fecha-actividad');
const duracionActividad = document.getElementById('duracion-actividad');
const fotoVideoActividad = document.getElementById('foto-video-actividad');
const enlaceRelacionado = document.getElementById('enlace-relacionado');

const cajaErrores = document.getElementById('val-box');
const listaErrores = document.getElementById('val-list');

const validateSelect = (Select) => {
    if (Select === "") return false;
    return true;
}

const validateDescripcion = (descripcion) => {
    if (descripcion === "") return false;

    let lengthValid = descripcion.trim().length >= 10 && descripcion.trim().length <= 500;

    return lengthValid;
}

const validateFecha = (fecha) => {
    if (fecha === "" || fecha === null) return false;
    return true;
}

const validateFile = (file) => {
    return file.files.length > 0; 
}

const validateURL = (url) => {
    if (url === "") return false;

    let urlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6})(\/[\w._-]*)*\/?$/i;
    let formatValid = urlRegex.test(url);

    return formatValid;
}

const validateActividadForm = (event) => {
    event.preventDefault();
    listaErrores.innerHTML = '';
    cajaErrores.classList.add('oculto');

    let errores = [];

    if (!validateSelect(nombreMiembro.value)) {
        errores.push('Debe seleccionar un miembro para la actividad.');
    }

    if (!validateSelect(tipoActividad.value)) {
        errores.push('Debe seleccionar un tipo de actividad.');
    }

    if (!validateDescripcion(descripcionActividad.value)) {
        errores.push('La descripción debe tener entre 10 y 500 caracteres.');
    }

    if (!validateFecha(fechaActividad.value)) {
        errores.push('Debe seleccionar una fecha para la actividad.');
    }

    if (!validateFecha(duracionActividad.value)) {
        errores.push('Debe seleccionar una duración para la actividad.');
    }

    if (!validateFile(fotoVideoActividad)) {
        errores.push('Debe cargar una imagen o video para la actividad.');
    }

    if (!validateURL(enlaceRelacionado.value)) {
        errores.push('El enlace relacionado no tiene un formato válido.');
    }

    if (errores.length > 0) {
        cajaErrores.classList.remove('oculto');
        errores.forEach((error) => {
            let li = document.createElement('li');
            li.textContent = error;
            listaErrores.appendChild(li);
        });
    } else {
        alert('Actividad informada exitosamente.');
        formActividad.reset();
    }
}

const cleanErrors = () => {
    listaErrores.innerHTML = "";
    cajaErrores.classList.add("oculto");
};

nombreMiembro.addEventListener('change', cleanErrors);
tipoActividad.addEventListener('change', cleanErrors);
descripcionActividad.addEventListener('input', cleanErrors);
fechaActividad.addEventListener('change', cleanErrors);
duracionActividad.addEventListener('change', cleanErrors);
fotoVideoActividad.addEventListener('change', cleanErrors);
enlaceRelacionado.addEventListener('input', cleanErrors);

formActividad.addEventListener('submit', validateActividadForm);