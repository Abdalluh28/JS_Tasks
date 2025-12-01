let tasks = localStorage.getItem('tasks') || '[]';
tasks = JSON.parse(tasks);

let inputAdd = document.getElementById('task-input');
let btnAdd = document.getElementById('add-task-btn');
let todoList = document.querySelector('.todo-list');
let doneList = document.querySelector('.done-list');
let todocount = document.getElementById('todo-count');
let doneCount = document.getElementById('done-count');
let draggedItem = null;

// helper functions
let updateCounts = () => {
    let done = tasks.filter(task => task.done).length;
    let todo = tasks.length - done;

    const noTasksTodo = document.querySelector('.todo-list .no-tasks');
    const noTasksDone = document.querySelector('.done-list .no-tasks');

    noTasksTodo.setAttribute('data-visible', todo > 0 ? 'hidden' : 'visible');
    noTasksDone.setAttribute('data-visible', done > 0 ? 'hidden' : 'visible');

    todocount.textContent = todo;
    doneCount.textContent = done;
}

let saveTasks = () => localStorage.setItem('tasks', JSON.stringify(tasks));



// append task to the DOM
let appendTask = (task, list) => {
    let taskElement = document.createElement('li');
    taskElement.className = `task ${task.done ? "done-task" : "todo-task"}`;
    taskElement.id = task.id;
    taskElement.setAttribute('draggable', 'true');
    taskElement.innerHTML = `
        <span>${task.title}</span>
        <div class="task-actions">
            ${!task.done ? `<button class="btn complete-btn" title="mark as done">
                <i class="fa-solid fa-check"></i>
            </button>` : ''}
            <button class="btn delete-btn" title="delete task">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `

    list.appendChild(taskElement);
}


// initialize the DOM
let init = () => {
    tasks.forEach(task => {
        appendTask(task, task.done ? doneList : todoList);
    })

    updateCounts();
}

init();


// add a new task by clicking the button
let handleAddTask = () => {
    if (inputAdd.value === '') return;

    let task = {
        id: Date.now(),
        title: inputAdd.value,
        done: false
    }

    tasks.push(task);
    saveTasks();
    appendTask(task, todoList);

    inputAdd.value = ''
    updateCounts();
}

// add a new task by pressing enter
let handleInputEnter = (e) => {
    if (inputAdd.value === '') return;
    if (e.key === 'Enter') {
        handleAddTask();
    }
}


// mark task as done
let handleAddToDoneList = (id) => {
    let task = tasks.find(task => task.id == id);
    if (!task) return;
    task.done = true;
    localStorage.setItem("tasks", JSON.stringify(tasks));

    document.getElementById(id).remove();
    appendTask(task, doneList);

    updateCounts();
}


// delete task
let handleDeleteTask = (id) => {
    tasks = tasks.filter(task => task.id != id);
    saveTasks();


    document.getElementById(id)?.remove();

    updateCounts();
}



btnAdd.addEventListener("click", handleAddTask);
inputAdd.addEventListener("keydown", handleInputEnter);


todoList.addEventListener("click", e => {
    let li = e.target.closest('li.task');
    if (!li) return;

    if (e.target.closest('.complete-btn')) {
        handleAddToDoneList(li.id);
    } else if (e.target.closest('.delete-btn')) {
        handleDeleteTask(li.id);
    }
})

doneList.addEventListener("click", e => {
    let li = e.target.closest('li.task');
    if (!li) return;

    if (e.target.closest('.delete-btn')) {
        handleDeleteTask(li.id);
    }
})



// drag and drop

let dragStart = (e) => {
    let li = e.target.closest('li.task');
    if (!li) return;

    draggedItem = li;
    e.dataTransfer.effectAllowed = 'move';
}

let dragOver = (e) => {
    e.preventDefault();
    let target = e.target.closest('li.task');
    if (!target || target === draggedItem) return;

    let bounding = target.getBoundingClientRect();
    let offset = e.clientY - bounding.top

    if (offset > bounding.height / 2) {
        // move after
        target.insertAdjacentElement('afterend', draggedItem);
    } else {
        // move before
        target.insertAdjacentElement('beforebegin', draggedItem);
    }
}

let drop = (e) => {
    e.preventDefault();
    draggedItem = null;
}

todoList.addEventListener("dragstart", dragStart);

todoList.addEventListener("dragover", dragOver);

todoList.addEventListener("drop", drop);

doneList.addEventListener("dragstart", dragStart);

doneList.addEventListener("dragover", dragOver);

doneList.addEventListener("drop", drop);