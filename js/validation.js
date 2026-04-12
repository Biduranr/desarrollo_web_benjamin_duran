// referencias a los elementos de registro-miembros
const formulario = document.getElementById('form-registro');
const btnRegistrar = document.getElementById('submit-btn');
const cajaErrores = document.getElementById('val-box');
const listaErrores = document.getElementById('val-list');

// inputs de contacto y datos personales
const nombreInput = document.getElementById('nombre');
const emailInput = document.getElementById('email');
const telefonoInput = document.getElementById('telefono');

// inputs de roles academicos
const tipoMiembroInput = document.getElementById('tipo-miembro');
const carreraInput = document.getElementById('carrera');
const deptoInput = document.getElementById('departamento');

const validateName = (name) => {
    if (!name) return false;
    let lengthValid = name.trim().length >= 3 && name.trim().length <= 50;

    return lengthValid;
}

const validateEmail = (email) => {
    if (!email) return false;
    let lengthValid = email.length >= 5 && email.length <= 100;

    let emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+?\.[a-zA-Z]{2,3}$/;
    let formatValid = emailRegex.test(email);

    return lengthValid && formatValid;
}

const validatePhoneNumber = (phone) => {
    if (!phone) return false;
    
    let lengthValid = phone.length === 9;
    
    let phoneRegex = /^9[0-9]{8}$/;
    let formatValid = phoneRegex.test(phone);

    return lengthValid && formatValid;
}

const validateSelect = (type, carrera, depto) => {
    if (type === "") return false;

    if (type === "estudiante") {
        if (carrera.trim().length > 0) return true;
        return false;
    }

    if (type === "profesor") {
        if (depto.trim().length > 0) return true;
        return false;
    }

    return true;
}

const validateForm = (event) => {
    event.preventDefault(); // Evitar el envío predeterminado del formulario
    listaErrores.innerHTML = "";
    cajaErrores.classList.add("oculto");
    let errores = [];

    if (!validateName(nombreInput.value)) {
        errores.push("El nombre debe tener entre 3 y 50 caracteres.");
    }

    if (!validateEmail(emailInput.value)) {
        errores.push("El correo electrónico no es válido.");
    }

    if (!validatePhoneNumber(telefonoInput.value)) {
        errores.push("El número de teléfono no es válido, debe tener 9 dígitos y empezar con 9.");
    }

    if (!validateSelect(tipoMiembroInput.value, carreraInput.value, deptoInput.value)) {
        errores.push("Por favor, seleccione un tipo de miembro y complete los campos correspondientes.");
    }

    if (errores.length > 0) {
        cajaErrores.classList.remove("oculto");
        errores.forEach(error => {
            const li = document.createElement("li");
            li.textContent = error;
            listaErrores.appendChild(li);
        });
    } else {
        // Si no hay errores, se puede enviar el formulario
        alert("Formulario válido. Enviando datos...");
        formulario.reset();
    }
}

const cleanErrors = () => {
    listaErrores.innerHTML = "";
    cajaErrores.classList.add("oculto");
}

nombreInput.addEventListener('input', cleanErrors);
emailInput.addEventListener('input', cleanErrors);
telefonoInput.addEventListener('input', cleanErrors);

tipoMiembroInput.addEventListener('change', cleanErrors);
carreraInput.addEventListener('change', cleanErrors);
deptoInput.addEventListener('change', cleanErrors);

btnRegistrar.addEventListener('click', validateForm);