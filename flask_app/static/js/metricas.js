const miembros = [
    { nombre: 'Alexis Sanchez', tipo: 'Estudiante' },
    { nombre: 'Cristiano Ronaldo', tipo: 'Profesor' },
    { nombre: 'Lionel Messi', tipo: 'Estudiante' },
    { nombre: 'Zinedine Zidane', tipo: 'Profesor' },
    { nombre: 'Ronaldinho Gaucho', tipo: 'Estudiante' },
    { nombre: 'Kylian Mbappe', tipo: 'Estudiante' },
    { nombre: 'Claudio Bravo', tipo: 'Administrativo' }
]

const renderMetrics = () => {
    const total = miembros.length;
    
    // 1. Contar por tipo usando .filter()
    const estudiantes = miembros.filter(m => m.tipo === 'Estudiante').length;
    const profesores = miembros.filter(m => m.tipo === 'Profesor').length;
    const administrativos = miembros.filter(m => m.tipo === 'Administrativo').length;

    // 2. Actualizar los contadores de texto en el HTML
    document.getElementById('total-miembros').textContent = total;
    document.getElementById('total-estudiantes').textContent = estudiantes;
    document.getElementById('total-profesores').textContent = profesores;
    document.getElementById('total-administradores').textContent = administrativos;

    // 3. Calcular porcentajes para las barras (evitando división por cero)
    const pctEst = total > 0 ? (estudiantes / total) * 100 : 0;
    const pctProf = total > 0 ? (profesores / total) * 100 : 0;
    const pctAdmin = total > 0 ? (administrativos / total) * 100 : 0;

    // 4. Aplicar los anchos a las barras CSS
    document.getElementById('barra-estudiantes').style.width = `${pctEst}%`;
    document.getElementById('barra-profesores').style.width = `${pctProf}%`;
    document.getElementById('barra-administradores').style.width = `${pctAdmin}%`;

    // 5. Aplicar a la barra total
    document.getElementById('segmento-estudiantes').style.width = `${pctEst}%`;
    document.getElementById('segmento-profesores').style.width = `${pctProf}%`;
    document.getElementById('segmento-administradores').style.width = `${pctAdmin}%`;
};

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', renderMetrics);