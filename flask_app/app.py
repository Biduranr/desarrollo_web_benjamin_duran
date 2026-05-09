from flask import Flask, render_template
from database.db import Miembro, db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://cc5002:programacionweb@localhost:3306/tarea2'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

@app.route('/')
def index():
    ultimos_miembros = Miembro.query.order_by(Miembro.fecha_registro.desc()).limit(5).all()
    return render_template('index.html', miembros=ultimos_miembros)

@app.route('/registro-miembros')
def registro_miembros():
    return render_template('registro-miembros.html')

@app.route('/lista-miembros')
def lista_miembros():
    return render_template('lista-miembros.html')

@app.route('/informar-actividad')
def informar_actividad():
    return render_template('informar-actividad.html')

@app.route('/consulta-metricas')
def consulta_metricas():
    return render_template('consulta-metricas.html')

if __name__ == '__main__':
    app.run(debug=True)