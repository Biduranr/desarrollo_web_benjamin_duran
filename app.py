from flask import Flask, render_template
from flask_app.database.db import db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://cc5002:programacionweb@localhost:3306/tarea2'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/registro-miembros')
def registro_miembros():
    return render_template('registro_miembros.html')

@app.route('/lista-miembros')
def lista_miembros():
    return render_template('lista_miembros.html')

@app.route('/informar-actividad')
def informar_actividad():
    return render_template('informar_actividad.html')

@app.route('/consulta-metricas')
def consulta_metricas():
    return render_template('consulta_metricas.html')

if __name__ == '__main__':
    app.run(debug=True)