document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('task-input');
  const taskTimeInput = document.getElementById('task-time');
  const taskColorInput = document.getElementById('task-color');
  const addTaskBtn = document.getElementById('add-task-btn');
  const taskList = document.getElementById('task-list');

  // Load tasks from localStorage
  const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => createTaskElement(task.text, task.time, task.color, task.completed));
  };

  // Save tasks to localStorage
  const saveTasks = () => {
    const tasks = Array.from(taskList.children).map(task => ({
      text: task.querySelector('.task-text').textContent,
      time: task.querySelector('.task-time').textContent,
      color: task.style.backgroundColor,
      completed: task.classList.contains('completed')
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const createTaskElement = (text, time, color, completed = false) => {
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    taskItem.style.backgroundColor = color;
    if (completed) taskItem.classList.add('completed');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = completed;
    checkbox.addEventListener('change', () => {
      taskItem.classList.toggle('completed');
      saveTasks();
    });

    const taskTextSpan = document.createElement('span');
    taskTextSpan.className = 'task-text';
    taskTextSpan.textContent = text;

    const taskTimeSpan = document.createElement('span');
    taskTimeSpan.className = 'task-time';
    taskTimeSpan.textContent = time;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
      taskList.removeChild(taskItem);
      saveTasks();
    });

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskTextSpan);
    taskItem.appendChild(taskTimeSpan);
    taskItem.appendChild(removeBtn);

    taskList.appendChild(taskItem);
  };

  const addTask = () => {
    const taskText = taskInput.value.trim();
    const taskTime = taskTimeInput.value;
    const taskColor = taskColorInput.value;

    if (!taskText) return;

    createTaskElement(taskText, taskTime, taskColor);
    saveTasks();

    taskInput.value = '';
    taskTimeInput.value = '';
    taskColorInput.value = '#ffffff';
  };

  addTaskBtn.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') addTask();
  });

  loadTasks();
});
