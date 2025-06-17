from app import app, Task, db

# Usar el contexto de la aplicación
with app.app_context():
    # Consultar todas las tareas
    tasks = Task.query.all()
    
    # Mostrar el número de tareas
    print(f"Número de tareas en la base de datos: {len(tasks)}")
    
    # Mostrar detalles de cada tarea
    for task in tasks:
        print(f"ID: {task.id}")
        print(f"Título: {task.title}")
        print(f"Prioridad: {task.priority}")
        print("-" * 30)