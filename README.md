# Gestor de Tareas

Una aplicación web para gestionar tareas con diferentes niveles de prioridad. Desarrollada con una arquitectura cliente-servidor utilizando Flask y SQLAlchemy en el backend y HTML/CSS/JavaScript en el frontend.

## Características

- Crear tareas con título y nivel de prioridad (baja, media, alta)
- Visualizar todas las tareas con indicadores de color según su prioridad
- Editar tareas existentes
- Eliminar tareas
- Almacenamiento persistente en base de datos SQLite
- Interfaz de usuario intuitiva y responsive
- Soporte para modo claro/oscuro

## Estructura del Proyecto

```
gestor-de-tareas/
├── backend/
│   ├── app.py                # API REST con Flask y SQLAlchemy
│   ├── requirements.txt      # Dependencias del backend
│   └── instance/
│       └── tasks.db          # Base de datos SQLite
├── frontend/
│   ├── index.html            # Estructura HTML de la aplicación
│   ├── app.js                # Lógica del cliente
│   └── styles.css            # Estilos CSS
└── README.md                 # Este archivo
```

## Tecnologías Utilizadas

### Backend
- Python 3
- Flask (Framework web)
- Flask-CORS (Para permitir peticiones cross-origin)
- SQLAlchemy (ORM para la base de datos)
- SQLite (Base de datos)

### Frontend
- HTML5
- CSS3 (Variables CSS, Flexbox)
- JavaScript (ES6+)
- Fetch API para comunicación con el backend

## Instalación y Ejecución

### Requisitos Previos
- Python 3.6 o superior
- Navegador web moderno

### Configuración del Backend

1. Clona este repositorio:
   ```
   git clone https://github.com/tu-usuario/gestor-de-tareas.git
   cd gestor-de-tareas
   ```

2. Instala las dependencias del backend:
   ```
   cd backend
   pip install -r requirements.txt
   ```

3. Ejecuta el servidor:
   ```
   python app.py
   ```
   El servidor estará disponible en `http://localhost:5000`

### Acceso al Frontend

1. Abre el archivo `frontend/index.html` en tu navegador web
   - Opcionalmente, puedes usar un servidor web local para servir los archivos frontend

## API REST

La API proporciona los siguientes endpoints:

- `GET /api/tasks` - Obtener todas las tareas
- `POST /api/tasks` - Crear una nueva tarea
- `PUT /api/tasks/<task_id>` - Actualizar una tarea existente
- `DELETE /api/tasks/<task_id>` - Eliminar una tarea

## Modelo de Datos

Cada tarea tiene la siguiente estructura:

```json
{
  "id": "uuid-generado-automáticamente",
  "title": "Título de la tarea",
  "priority": "baja|media|alta"
}
```

## Capturas de Pantalla
![gest](https://github.com/user-attachments/assets/3ebd7886-8178-4923-9588-be9771416f11)



## Posibles Mejoras

- Añadir autenticación de usuarios
- Implementar categorías para las tareas
- Añadir fechas de vencimiento
- Desarrollar funcionalidad de búsqueda y filtrado
- Implementar notificaciones
- Añadir tests automatizados

## Licencia

[Incluir información de licencia aquí]

## Autor

GitHub : jonathanjd7
IG: jonathanjd7

---

Desarrollado como proyecto de práctica para demostrar habilidades en desarrollo web full-stack.
