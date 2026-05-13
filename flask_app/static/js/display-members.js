const filtroTipo = document.getElementById('filtro-tipo'); 
const ordenarPor = document.getElementById('ordenar-por');

const actualizarLista = () => {
    const tipo = filtroTipo.value;
    const orden = ordenarPor.value;

    window.location.href = `/lista-miembros?page=1&tipo=${tipo}&sort=${orden}`;
};

filtroTipo.addEventListener('change', actualizarLista);
ordenarPor.addEventListener('change', actualizarLista);

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('tipo')) {
    filtroTipo.value = urlParams.get('tipo');
}
if (urlParams.has('sort')) {
    ordenarPor.value = urlParams.get('sort');
}