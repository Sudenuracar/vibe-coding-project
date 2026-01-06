const taskInput = document.getElementById('new-task');
const addButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Kaydetme fonksiyonu
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Görevleri render et
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    if(task.completed) li.classList.add('completed');

    const taskSpan = document.createElement('span');
    taskSpan.textContent = task.text;
    taskSpan.onclick = () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    };

    const dateSpan = document.createElement('span');
    dateSpan.classList.add('task-date');
    dateSpan.textContent = task.date;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Düzenle';
    editBtn.classList.add('edit');
    editBtn.onclick = () => {
      const newTask = prompt('Görevi düzenle:', task.text);
      if (newTask) {
        tasks[index].text = newTask;
        saveTasks();
        renderTasks();
      }
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Sil';
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    li.appendChild(taskSpan);
    li.appendChild(dateSpan);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}

// Yeni görev ekleme
addButton.onclick = () => {
  const taskText = taskInput.value.trim();
  if(taskText) {
    const date = new Date().toLocaleString();
    tasks.push({text: taskText, date: date, completed: false});
    taskInput.value = '';
    saveTasks();
    renderTasks();
  }
};

// Başlangıçta render et
renderTasks();
