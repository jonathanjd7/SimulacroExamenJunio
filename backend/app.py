from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import uuid
import os

app = Flask(__name__)
CORS(app)

# Configuración de la base de datos SQLite
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Modelo de datos para las tareas
class Task(db.Model):
    id = db.Column(db.String(36), primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    priority = db.Column(db.String(20), nullable=False)
    
    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "priority": self.priority
        }

# Crear la base de datos si no existe
with app.app_context():
    db.create_all()
    
    # Migrar datos existentes si hay un archivo tasks.json
    if os.path.exists("tasks.json"):
        import json
        with open("tasks.json", "r") as f:
            try:
                existing_tasks = json.load(f)
                for task_data in existing_tasks:
                    # Verificar si la tarea ya existe en la base de datos
                    existing = Task.query.get(task_data["id"])
                    if not existing:
                        task = Task(
                            id=task_data["id"],
                            title=task_data["title"],
                            priority=task_data["priority"]
                        )
                        db.session.add(task)
                db.session.commit()
            except Exception as e:
                print(f"Error al migrar datos: {e}")

@app.route("/api/tasks", methods=["GET"])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([task.to_dict() for task in tasks]), 200

@app.route("/api/tasks", methods=["POST"])
def create_task():
    data = request.get_json()

    if not data or 'title' not in data or 'priority' not in data:
        return jsonify({"error": "Datos incompletos"}), 400

    task = Task(
        id=str(uuid.uuid4()),
        title=data["title"],
        priority=data["priority"]
    )
    
    db.session.add(task)
    db.session.commit()
    
    return jsonify(task.to_dict()), 201

@app.route("/api/tasks/<string:task_id>", methods=["PUT"])
def update_task(task_id):
    task = Task.query.get(task_id)
    
    if not task:
        return jsonify({"error": "Tarea no encontrada"}), 404
        
    data = request.get_json()
    
    if not data:
        return jsonify({"error": "Datos incompletos"}), 400
        
    if 'title' in data:
        task.title = data['title']
    if 'priority' in data:
        task.priority = data['priority']
        
    db.session.commit()
    
    return jsonify(task.to_dict()), 200
    
@app.route("/api/tasks/<string:task_id>", methods=["DELETE"])
def delete_task(task_id):
    task = Task.query.get(task_id)
    
    if not task:
        return jsonify({"error": "Tarea no encontrada"}), 404
        
    db.session.delete(task)
    db.session.commit()
    
    return jsonify({"message": "Tarea eliminada correctamente"}), 200

if __name__ == "__main__":
    app.run(debug=True)
