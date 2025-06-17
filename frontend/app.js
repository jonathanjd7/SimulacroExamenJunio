document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("task-form");
    const taskTitleInput = document.getElementById("task-title");
    const taskPrioritySelect = document.getElementById("task-priority");
    const taskList = document.getElementById("task-list");
    
    // Variables para edición
    let editMode = false;
    let currentTaskId = null;
  
    const API_URL = "http://localhost:5000/api/tasks";
  
    // 🟢 Mostrar tareas existentes al cargar
    function loadTasks() {
      taskList.innerHTML = ""; // Limpiar lista antes de cargar
      fetch(API_URL)
        .then((res) => res.json())
        .then((tasks) => {
          tasks.forEach(renderTask);
        })
        .catch((err) => {
          console.error("Error al obtener tareas:", err);
        });
    }
    
    // Cargar tareas al iniciar
    loadTasks();
  
    // 🟡 Manejar envío del formulario
    taskForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const title = taskTitleInput.value.trim();
      const priority = taskPrioritySelect.value;
  
      if (!title) return;
  
      const taskData = {
        title,
        priority
      };
      
      if (editMode && currentTaskId) {
        // Actualizar tarea existente
        fetch(`${API_URL}/${currentTaskId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskData),
        })
          .then((res) => res.json())
          .then(() => {
            loadTasks(); // Recargar todas las tareas
            taskForm.reset();
            editMode = false;
            currentTaskId = null;
            document.querySelector("button[type='submit']").textContent = "Agregar tarea";
          })
          .catch((err) => {
            console.error("Error al actualizar tarea:", err);
          });
      } else {
        // Crear nueva tarea
        fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskData),
        })
          .then((res) => res.json())
          .then(() => {
            loadTasks(); // Recargar todas las tareas
            taskForm.reset();
          })
          .catch((err) => {
            console.error("Error al agregar tarea:", err);
          });
      }
    });
  
    // 🧱 Función para renderizar una tarea en el DOM
    function renderTask(task) {
      const li = document.createElement("li");
      li.setAttribute("data-id", task.id);
      li.setAttribute("data-priority", task.priority);
      
      // Contenido de la tarea
      const taskContent = document.createElement("span");
      taskContent.textContent = `${task.title} [${task.priority}]`;
      taskContent.className = "task-content";
      li.appendChild(taskContent);
      
      // Contenedor para botones
      const buttonsContainer = document.createElement("div");
      buttonsContainer.className = "task-buttons";
      
      // Botón de editar
      const editButton = document.createElement("button");
      editButton.textContent = "Editar";
      editButton.className = "edit-btn";
      editButton.addEventListener("click", () => {
        // Activar modo edición
        editMode = true;
        currentTaskId = task.id;
        
        // Rellenar formulario con datos de la tarea
        taskTitleInput.value = task.title;
        taskPrioritySelect.value = task.priority;
        
        // Cambiar texto del botón
        document.querySelector("button[type='submit']").textContent = "Actualizar tarea";
      });
      
      // Botón de eliminar
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Eliminar";
      deleteButton.className = "delete-btn";
      deleteButton.addEventListener("click", () => {
        if (confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
          fetch(`${API_URL}/${task.id}`, {
            method: "DELETE"
          })
            .then((res) => {
              if (res.ok) {
                li.remove(); // Eliminar elemento de la lista
              } else {
                console.error("Error al eliminar tarea");
              }
            })
            .catch((err) => {
              console.error("Error al eliminar tarea:", err);
            });
        }
      });
      
      // Añadir botones al contenedor
      buttonsContainer.appendChild(editButton);
      buttonsContainer.appendChild(deleteButton);
      
      // Añadir contenedor de botones a la tarea
      li.appendChild(buttonsContainer);
      
      // Añadir tarea a la lista
      taskList.appendChild(li);
    }
  });
  