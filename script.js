const themeToggle = document.getElementById('themeToggle');

// Apply saved theme on page load
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  themeToggle.checked = true;
}

themeToggle.addEventListener('change', function () {
  document.body.classList.toggle('dark-mode', themeToggle.checked);
  localStorage.setItem('theme', themeToggle.checked ? 'dark' : 'light');
});
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Our "source of truth" — the real data. The page is just a reflection of this array.
let tasks = [];

// Load any saved tasks the moment the page opens
loadTasks();

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    addTask();
  }
});

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  // Add to our data array first
  const newTask = { text: taskText, completed: false };
  tasks.push(newTask);

  saveTasks();
  renderTasks();

  taskInput.value = '';
  taskInput.focus();
}

function renderTasks() {
  // Clear whatever is currently on the page
  taskList.innerHTML = '';

  // Rebuild the whole list from the tasks array
  tasks.forEach(function (task, index) {
    const li = document.createElement('li');
    if (task.completed) {
      li.classList.add('completed');
    }

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', function () {
      task.completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const span = document.createElement('span');
    span.textContent = task.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function () {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    const buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add('task-buttons');
    buttonWrapper.appendChild(deleteBtn);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(buttonWrapper);

    taskList.appendChild(li);
  });
}

function saveTasks() {
  localStorage.setItem('myTasks', JSON.stringify(tasks));
}

function loadTasks() {
  const saved = localStorage.getItem('myTasks');
  if (saved) {
    tasks = JSON.parse(saved);
  }
  renderTasks();
}