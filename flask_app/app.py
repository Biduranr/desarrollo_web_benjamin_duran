from flask import Flask, jsonify, render_template, request, redirect, url_for, flash
from database.db import Miembro, db, Region, Comuna, Actividad, Foto, Comentario
import re, os
from datetime import datetime
from werkzeug.utils import secure_filename
from sqlalchemy import func

app = Flask(__name__)
app.secret_key = "clave_secreta_cc5002_tarea2"
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://cc5002:programacionweb@localhost:3306/tarea2'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

db.init_app(app)

@app.route('/')
def index():
    ultimos_miembros = Miembro.query.order_by(Miembro.fecha_registro.desc()).limit(5).all()
    return render_template('index.html', miembros=ultimos_miembros)

@app.route('/registro-miembros', methods=['GET', 'POST'])
def registro_miembros():
    if request.method == 'POST':
        # Procesar el formulario de registro
        nombre = request.form.get('nombre')
        email = request.form.get('email')
        telefono = request.form.get('telefono')
        comuna_id = request.form.get('comuna')

        errores = []

        if not nombre or len(nombre) < 3:
            errores.append("El nombre debe tener al menos 3 caracteres.")
        
        if not email or not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            errores.append("Debe ingresar un correo electrónico válido.")

        if not telefono or not re.match(r"^9[0-9]{8}$", telefono):
            errores.append("Debe ingresar un número de teléfono válido (9 dígitos).")

        if not comuna_id:
            errores.append("Debe seleccionar una comuna.")
        
        if errores:
            regiones = Region.query.all()
            return render_template('registro-miembros.html', regiones=regiones, errores=errores)
    
        nuevo_miembro = Miembro(
            nombre=nombre,
            email=email,
            telefono=telefono,
            comuna_id=int(comuna_id),
            fecha_registro=datetime.now()
        )
        
        try:
            db.session.add(nuevo_miembro)
            db.session.commit()
            flash("Miembro registrado exitosamente.", "success")
            return redirect(url_for('index'))
        except Exception as e:
            db.session.rollback()
            print(f"Error al registrar miembro: {e}")
            return "Hubo un error al registrar el miembro. Por favor, inténtalo de nuevo.", 500
    regiones = Region.query.all()
    return render_template('registro-miembros.html', regiones=regiones)

@app.route('/get-comunas/<int:region_id>')
def get_comunas(region_id):
    comunas = Comuna.query.filter_by(region_id=region_id).all()
    return jsonify([{'id': c.id, 'nombre': c.nombre} for c in comunas])

@app.route('/lista-miembros')
def lista_miembros():
    page = request.args.get('page', 1, type=int)
    per_page = 10
    sort = request.args.get('sort', 'nombre-asc')

    query = Miembro.query


    if sort == 'nombre-asc':
        query = query.order_by(Miembro.nombre.asc())
    elif sort == 'nombre-desc':
        query = query.order_by(Miembro.nombre.desc())

    pagination = query.paginate(page=page, per_page=per_page)
    return render_template('lista-miembros.html', pagination=pagination)

@app.route('/informar-actividad', methods=['GET', 'POST'])
def informar_actividad():
    if request.method == 'POST':
        miembro_id = request.form.get('miembro_id')
        nombre = request.form.get('nombre')
        dia = request.form.get('dia').capitalize()
        hora = request.form.get('hora-inicio')
        duracion = request.form.get('duracion')
        tipo = request.form.get('tipo-actividad').capitalize()
        descripcion = request.form.get('descripcion')

        files = request.files.getlist('fotos')

        datos_previos = request.form

        errores = []
        if not nombre or len(nombre) < 3 or len(nombre) > 45:
            errores.append("El nombre de la actividad debe tener al menos 3 caracteres y máximo 45.")
        if not files or files[0].filename == '':
            errores.append("Debe subir al menos una foto de la actividad.")

        if errores:
            miembros = Miembro.query.all()
            return render_template('informar-actividad.html', errores=errores, miembros=miembros, datos=datos_previos)
        
        try:
            nueva_actividad = Actividad(
                miembro_id=miembro_id,
                nombre=nombre,
                dia=dia,
                hora_inicio=hora,
                duracion=duracion,
                tipo=tipo,
                descripcion=descripcion
            )
            db.session.add(nueva_actividad)
            db.session.flush()

            for file in files:
                if file:
                    filename = secure_filename(f"{datetime.now().timestamp()}_{file.filename}")
                    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

                    nueva_foto = Foto(
                        ruta_archivo=filename,
                        nombre_archivo=file.filename,
                        actividad_id=nueva_actividad.id
                    )
                    db.session.add(nueva_foto)
            db.session.commit()
            flash("Actividad informada exitosamente.", "success")
            return redirect(url_for('index'))
        except Exception as e:
            db.session.rollback()
            print(f"Error al informar actividad: {e}")
            return render_template('informar-actividad.html', errores=["Hubo un error al guardar en la base de datos."], miembros=Miembro.query.all())
    miembros = Miembro.query.all()
    return render_template('informar-actividad.html', miembros=miembros)

@app.route('/consulta-metricas')
def consulta_metricas():
    return render_template('consulta-metricas.html')

@app.route('/get-metricas')
def get_metricas():
    # 1. Gráfico de Líneas: Miembros registrados por día 
    miembros_por_dia = db.session.query(
        func.date(Miembro.fecha_registro).label('fecha'),
        func.count(Miembro.id).label('total')
    ).group_by(func.date(Miembro.fecha_registro)).all()
    
    line_data = [{"fecha": str(row.fecha), "total": row.total} for row in miembros_por_dia]

    # 2. Gráfico de Torta: Total de actividades por tipo 
    actividades_por_tipo = db.session.query(
        Actividad.tipo,
        func.count(Actividad.id).label('total')
    ).group_by(Actividad.tipo).all()

    pie_data = [{"tipo": row.tipo, "total": row.total} for row in actividades_por_tipo]

    # 3. Gráfico de Barras: Total de actividades registradas por comuna
    actividades_por_comuna = db.session.query(
        Comuna.nombre,
        func.count(Actividad.id).label('total')
    ).join(Miembro, Actividad.miembro_id == Miembro.id)\
     .join(Comuna, Miembro.comuna_id == Comuna.id)\
     .group_by(Comuna.nombre).all()

    bar_data = [{"comuna": row.nombre, "total": row.total} for row in actividades_por_comuna]

    return jsonify({
        "lineas": line_data,
        "torta": pie_data,
        "barras": bar_data
    })

@app.route('/api/comentarios/<int:actividad_id>', methods=['GET', 'POST'])
def api_comentarios(actividad_id):
    
    if request.method == 'POST':
        data = request.get_json()
        nombre = data.get('nombre', '').strip()
        texto = data.get('texto', '').strip()

        errores = []
        if not nombre or len(nombre) > 80 or len(nombre) < 3:
            errores.append("El nombre es obligatorio y debe tener como máximo 80 caracteres.")
        if not texto or len(texto) > 300 or len(texto) < 5:
            errores.append("El texto es obligatorio y debe tener entre 5 y 300 caracteres.")

        if errores:
            return jsonify({"status": "error", "errores": errores}), 400
        
        try:
            nuevo_comentario = Comentario(
                actividad_id=actividad_id,
                nombre=nombre,
                texto=texto,
            )
            db.session.add(nuevo_comentario)
            db.session.commit()
            return jsonify({"status": "success", "mensaje": "Comentario guardado exitosamente"}), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({"status": "error", "mensaje": "Hubo un error al guardar el comentario. Por favor, inténtalo de nuevo."}), 500
    
    comentarios = Comentario.query.filter_by(actividad_id=actividad_id).order_by(Comentario.fecha.desc()).all()

    lista_comentarios = []
    for c in comentarios:
        lista_comentarios.append({
            "nombre": c.nombre,
            "texto": c.texto,
            "fecha": c.fecha.strftime("%d-%m-%y %H:%M:%S")
        })
    return jsonify({"status": "success", "comentarios": lista_comentarios})

if __name__ == '__main__':
    app.run(debug=True)