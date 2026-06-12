document.addEventListener('DOMContentLoaded', function() {
    // Función para cargar las métricas desde el backend
    fetch('/get-metricas')
        .then(response => response.json())
        .then(data => {
            // Actualizar el total de miembros
            const dias = data.lineas.map(item => item.fecha);
            const totalesDias = data.lineas.map(item => item.total);

            Highcharts.chart('grafico-lineas', {
                chart: { type: 'line' },
                title: { text: 'Cantidad de Miembros registrados por Día' },
                xAxis: { categories: dias, title: { text: 'Días' } },
                yAxis: { title: { text: 'Cantidad de Miembros' }, allowDecimals: false },
                series: [{ name: 'Nuevos Miembros', data: totalesDias, color: '#001f3f' }]
            });

            const datosTorta = data.torta.map(item => ({ name: item.tipo, y: item.total }));

            Highcharts.chart('grafico-torta', {
                chart: { type: 'pie' },
                title: { text: 'Distribución de Actividades por Tipo' },
                tooltip: { pointFormat: '{series.name}: <b>{point.y}</b>' },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: { enabled: true, format: '<b>{point.name}</b>: {point.percentage:.1f}%' }
                    }
                },
                series: [{ name: 'Actividades', colorByPoint: true, data: datosTorta }]
            });
            const comunas = data.barras.map(item => item.comuna);
            const totalesComunas = data.barras.map(item => item.total);

            Highcharts.chart('grafico-barras', {
                chart: { type: 'column' },
                title: { text: 'Cantidad de Actividades por Comuna' },
                xAxis: { categories: comunas, title: { text: 'Comunas' } },
                yAxis: { title: { text: 'Cantidad de Actividades' }, allowDecimals: false },
                series: [{ name: 'Actividades', data: totalesComunas, color: '#0074d9' }]
            });
        })
        .catch(error => console.error('Error al cargar las métricas:', error));
});