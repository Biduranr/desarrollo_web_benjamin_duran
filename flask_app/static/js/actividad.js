const formActividad = document.getElementById('form-actividad');

const miembroSelect = document.getElementById('miembro_id');
const nombreActividad = document.getElementById('nombre');
const tipoActividad = document.getElementById('tipo_actividad');
const descripcionActividad = document.getElementById('descripcion');
const diaActividad = document.getElementById('dia'); 
const horaInicio = document.getElementById('hora_inicio'); 
const duracionActividad = document.getElementById('duracion');
const fotosActividad = document.getElementById('fotos');
const enlaceRelacionado = document.getElementById('enlace-relacionado');

const cajaErrores = document.getElementById('val-box');
const listaErrores = document.getElementById('val-list');

const validateSelect = (Select) => {
    if (Select === "") return false;
    return true;
}

const validateNombre = (nombre) => {
    return nombre.trim().length >= 3 && nombre.trim().length <= 45;
}

const validateDescripcion = (descripcion) => {
    if (descripcion === "") return false;

    let lengthValid = descripcion.trim().length >= 10 && descripcion.trim().length <= 500;

    return lengthValid;
}

const validateTime = (time) => {
    return time !== "" && time !== null;
}

const validateFile = (file) => {
    const cantidad = file.files.length;
    return cantidad >= 1 && cantidad <= 5; 
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
    cajaErrores.classList.remove('val-exito');

    let errores = [];

    if (!validateSelect(miembroSelect.value)) {
        errores.push('Debe seleccionar un miembro para la actividad.');
    }

    if (!validateNombre(nombreActividad.value)) {
        errores.push('El nombre de la actividad debe tener entre 3 y 45 caracteres.');
    }

    if (!validateSelect(tipoActividad.value)) {
        errores.push('Debe seleccionar un tipo de actividad.');
    }

    if (!validateDescripcion(descripcionActividad.value)) {
        errores.push('La descripción debe tener entre 10 y 500 caracteres.');
    }

    if (!validateSelect(diaActividad.value)) {
        errores.push('Debe seleccionar un día de la semana.');
    }

    if (!validateTime(horaInicio.value)) {
        errores.push('Debe ingresar una hora de inicio válida.');
    }

    if (!validateFile(fotosActividad)) {
        errores.push('Debe cargar entre 1 y 5 imágenes o videos para la actividad.');
    }

    if (!validateURL(enlaceRelacionado.value)) {
        errores.push('El enlace relacionado no tiene un formato válido.');
    }

    if (errores.length > 0) {
        cajaErrores.classList.remove('oculto');
        document.getElementById('val-msg').textContent = 'Han ocurrido los siguientes errores:';
        errores.forEach((error) => {
            let li = document.createElement('li');
            li.textContent = error;
            listaErrores.appendChild(li);
        });
    } else {
        formActividad.submit();
    }
}

const cleanErrors = () => {
    listaErrores.innerHTML = "";
    cajaErrores.classList.add("oculto");
};

nombreActividad.addEventListener('change', cleanErrors);
tipoActividad.addEventListener('change', cleanErrors);
descripcionActividad.addEventListener('input', cleanErrors);
diaActividad.addEventListener('change', cleanErrors);
horaInicio.addEventListener('change', cleanErrors);
fotosActividad.addEventListener('change', cleanErrors);
enlaceRelacionado.addEventListener('input', cleanErrors);

formActividad.addEventListener('submit', validateActividadForm);