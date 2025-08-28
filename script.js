let tasksContainerElement = document.getElementById('tasksListContainer');
let userInputTaskElement = document.getElementById("userInputTask");
let addTaskButtonElement = document.getElementById('addTaskButton');
let saveTasksButtonElement = document.getElementById('saveTasksButton');

function getLocalStorageTodos(){
  let todoList = JSON.parse(localStorage.getItem("todos"));
  if (todoList === null){
    saveTasksButtonElement.style.display = "none";
    return [];
    
  }else{
    saveTasksButtonElement.style.display = "block";
    return todoList;
  }
}

let todoList = getLocalStorageTodos();

let createNewTask = function(todo){
    let taskElement = document.createElement('li');
    let checkboxId= "checkbox-" + todo.id;

    let taskContainer = document.createElement('div');
    taskContainer.classList.add("d-flex", "flex-row", "align-items-center", "mb-2");
    taskElement.appendChild(taskContainer);

    let checkboxInput = document.createElement('input');
    checkboxInput.type = 'checkbox'; 
    checkboxInput.classList.add("checkbox-input");
    checkboxInput.id = checkboxId;
    taskContainer.appendChild(checkboxInput);

    let inputTaskCard = document.createElement('div');
    inputTaskCard.classList.add("input-task-card", "d-flex", "flex-row");
    taskContainer.appendChild(inputTaskCard);

    let taskName = document.createElement('label');
    taskName.setAttribute('for',checkboxId); 
    taskName.classList.add("task-name");
    taskName.textContent = todo.text;
    inputTaskCard.appendChild(taskName);

    checkboxInput.onclick = function() {
    taskName.classList.toggle("checked", checkboxInput.checked);
    inputTaskCard.classList.toggle("checked-container", checkboxInput.checked)
};

    let delIconContainer = document.createElement('div');
    delIconContainer.classList.add("del-icon-container", "ml-auto");
    let delIcon = document.createElement('i');
    delIcon.classList.add("fa-solid", "fa-circle-minus", "del-icon");   
    delIconContainer.appendChild(delIcon);
    inputTaskCard.appendChild(delIconContainer);

    delIconContainer.onclick = function() {
        tasksContainerElement.removeChild(taskElement);
    }

    tasksContainerElement.appendChild(taskElement);

}

addTaskButtonElement.onclick = function() {
    let userInputTask = userInputTaskElement.value.trim();

    if(userInputTask === ""){
      document.getElementById("customAlert").style.display = "flex";
      return;
    }

    let newTodo = {
      text: userInputTask,
      id: todoList.length + 1
    }

    todoList.push(newTodo);
    createNewTask(newTodo);
    userInputTaskElement.value = ""; 
    saveTasksButtonElement.style.display = "inline";

}

function closeAlert(){
  document.getElementById("customAlert").style.display = "none";
}

saveTasksButtonElement.onclick = function() {
  localStorage.setItem("todos", JSON.stringify(todoList));
}

//console.log(storedTodos);

for (todo of todoList) {
    createNewTask(todo);
}