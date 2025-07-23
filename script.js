document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-form');
    const input = document.getElementById('task-input');
    const list = document.getElementById('task-list');
  
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    function renderTasks() {
      list.innerHTML = '';
      tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
          <span contenteditable="false">${task.text}</span>
          <div class="task-buttons">
            <button class="edit" onclick="editTask(${index})">✏️</button>
            <button onclick="toggleTask(${index})">✅</button>
            <button class="delete" onclick="deleteTask(${index})">🗑️</button>
          </div>
        `;
        list.appendChild(li);
      });
      saveTasks();
    }
  
    form.addEventListener('submit', e => {
      e.preventDefault();
      const text = input.value.trim();
      if (text !== '') {
        tasks.push({ text, completed: false });
        input.value = '';
        renderTasks();
      }
    });
  
    window.toggleTask = function(index) {
      tasks[index].completed = !tasks[index].completed;
      renderTasks();
    };
  
    window.deleteTask = function(index) {
      tasks.splice(index, 1);
      renderTasks();
    };
  
    window.editTask = function(index) {
      const span = list.children[index].querySelector('span');
      const isEditable = span.contentEditable === 'true';
  
      if (isEditable) {
        tasks[index].text = span.innerText.trim();
        span.contentEditable = 'false';
      } else {
        span.contentEditable = 'true';
        span.focus();
      }
  
      renderTasks();
    };
  
    renderTasks();
  });
  