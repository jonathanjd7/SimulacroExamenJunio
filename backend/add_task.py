from app import app, Task, db
import uuid

# Usar el contexto de la aplicación
with app.app_context():
    # Crear una nueva tarea
    new_task = Task(
        id=str(uuid.uuid4()),
        title="Tarea añadida directamente a la BD",
        priority="media"
    )
    
    # Añadir a la base de datos
    db.session.add(new_task)
    db.session.commit()
    
    print(f"Tarea añadida con ID: {new_task.id}")
    print("Título:", new_task.title)
    print("Prioridad:", new_task.priority)