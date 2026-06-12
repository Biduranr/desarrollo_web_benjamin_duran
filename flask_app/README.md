# Webs Tarea-2

Este proyecto es una aplicación web desarrollada con **Flask** y **MySQL** para la gestión de miembros y reportes de actividades de una comunidad.

## Características
- **Registro de Miembros**: Validación de datos en JS y persistencia en MySQL.
- **Listado Dinámico**: Visualización de miembros con paginación y ordenamiento desde la DB.
- **Reporte de Actividades**: Formulario con subida de múltiples fotos y validaciones de servidor.
- **Vista de Detalle**: Perfil individual de miembros con su historial de actividades y galería de imágenes.
- **Interfaz Responsiva**: Uso de Jinja2 para renderizado dinámico y CSS personalizado.

## Requisitos
- Python 3.x
- MySQL Server
- Bibliotecas: `flask`, `flask-sqlalchemy`, `pymysql`, `cryptography`

## Instalación y Uso
1. Clonar el repositorio.
2. Configurar la base de datos en MySQL con el archivo `schema.sql` (o similar).
3. Actualizar `app.config['SQLALCHEMY_DATABASE_URI']` en `app.py`.
4. Ejecutar la aplicación:
   ```bash
   python app.py