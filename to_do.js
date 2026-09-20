const taskInput = document.getElementById("taskInput");
const priority = document.getElementById("priority");
const taskDate = document.getElementById("taskDate");

const addButton = document.getElementById("addButton");
const deleteCompleted = document.getElementById("deleteCompleted");

const taskList = document.getElementById("taskList");
const emptyText = document.getElementById("emptyText");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");


function updateInfo() {

    const tasks = document.querySelectorAll(".task");
    const completed = document.querySelectorAll(".task.completed");

    totalTasks.textContent = tasks.length;
    completedTasks.textContent = completed.length;

    if (tasks.length === 0) {
        emptyText.style.display = "block";
    } else {
        emptyText.style.display = "none";
    }
}


function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        return;
    }

    const task = document.createElement("li");

    task.className = "task " + priority.value;


    const checkButton = document.createElement("button");

    checkButton.className = "check-button";
    checkButton.textContent = "✓";


    const taskInfo = document.createElement("div");

    taskInfo.className = "task-info";


    const taskText = document.createElement("span");

    taskText.className = "task-text";
    taskText.textContent = text;


    const dateText = document.createElement("small");

    dateText.className = "task-date";

    if (taskDate.value !== "") {

        dateText.textContent = "📅 " + taskDate.value;

    }


    taskInfo.appendChild(taskText);
    taskInfo.appendChild(dateText);


    const editButton = document.createElement("button");

    editButton.className = "edit-button";
    editButton.textContent = "✎";


    const deleteButton = document.createElement("button");

    deleteButton.className = "delete-button";
    deleteButton.textContent = "🗑";


    task.appendChild(checkButton);
    task.appendChild(taskInfo);
    task.appendChild(editButton);
    task.appendChild(deleteButton);

    taskList.appendChild(task);


    taskInput.value = "";
    taskDate.value = "";

    priority.value = "low";


    updateInfo();
}


addButton.addEventListener("click", addTask);


taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});


taskList.addEventListener("click", function(event) {

    const task = event.target.closest(".task");

    if (!task) {
        return;
    }


    // Выполнить задачу

    if (event.target.classList.contains("check-button")) {

        task.classList.toggle("completed");

        updateInfo();
    }


    // Удалить задачу

    if (event.target.classList.contains("delete-button")) {

        task.remove();

        updateInfo();
    }


    // Редактировать задачу

    if (event.target.classList.contains("edit-button")) {

        const taskText = task.querySelector(".task-text");

        const input = document.createElement("input");

        input.value = taskText.textContent;

        taskText.replaceWith(input);

        input.focus();


        input.addEventListener("keydown", function(event) {

            if (event.key === "Enter") {

                if (input.value.trim() !== "") {

                    taskText.textContent = input.value;

                }

                input.replaceWith(taskText);
            }

        });
    }

});


deleteCompleted.addEventListener("click", function() {

    const completedTasksList =
        document.querySelectorAll(".task.completed");

    completedTasksList.forEach(function(task) {

        task.remove();

    });

    updateInfo();

});