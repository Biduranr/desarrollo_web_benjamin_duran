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

if __name__ == '__main__':
    app.run(debug=True)