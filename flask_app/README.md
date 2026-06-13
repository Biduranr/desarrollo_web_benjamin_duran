# Webs Tarea-3

Este proyecto es una aplicación web desarrollada con **Flask** y **MySQL** para la gestión de miembros, reportes de actividades, carga de fotos y comentarios.

## Características
- **Registro de Miembros**: Validación de datos en JS y persistencia en MySQL.
- **Listado Dinámico**: Visualización de miembros con paginación y ordenamiento.
- **Reporte de Actividades**: Formulario con validación en cliente y servidor, subida de múltiples fotos (1 a 5 archivos), y almacenamiento en `static/uploads`.
- **Relación Actividad-Miembro**: Cada actividad se asocia a un miembro y se accede con `actividad.miembro`.
- **Comentarios en Actividad**: Se muestran comentarios en la página de actividad y se envían vía fetch a `/api/comentarios/<actividad_id>`.
- **Métricas**: API para generar datos de métricas por miembros, actividades por tipo y actividades por comuna.

## Requisitos
- Python 3.x
- MySQL Server
- Bibliotecas: `Flask`, `Flask-SQLAlchemy`, `pymysql`

## Instalación y Uso
1. Clona el repositorio.
2. Crea la base de datos en MySQL y configura la conexión en `app.py`:
   ```python
   app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://usuario:password@localhost:3306/nombre_db'
   ```
3. Instala dependencias:
   ```bash
   pip install -r requirements.txt
   ```
4. Ejecuta la aplicación:
   ```bash
   python app.py
   ```
5. Accede en el navegador a `http://localhost:5000`.

## Archivos importantes
- `app.py`: rutas y lógica principal de Flask.
- `database/db.py`: definición de modelos SQLAlchemy.
- `templates/informar-actividad.html`: formulario de actividades y sección de comentarios.
- `static/js/actividad.js`: validación de formulario y gestión de comentarios.
- `static/uploads/`: archivos subidos de fotos/videos de actividades.

## Nota
Asegúrate de tener la tabla `actividad` con la relación `miembro_id` hacia `miembro` y que el modelo `Actividad` tenga relación con `Miembro` para usar `actividad.miembro` en las plantillas.