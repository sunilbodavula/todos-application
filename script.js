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

saveTasksButtonElement.onclick = function() {
  localStorage.setItem("todos", JSON.stringify(todoList));
}

addTaskButtonElement.onclick = function() {
    let userInputTask = userInputTaskElement.value.trim();

    if(userInputTask === ""){
      document.getElementById("customAlert").style.display = "flex";
      return;
    }

    let newTodo = {
      text: userInputTask,
      id: crypto.randomUUID(),
      completed: false
    }

    todoList.push(newTodo);
    createNewTask(newTodo);
    userInputTaskElement.value = ""; 
    saveTasksButtonElement.style.display = "inline";

}

deleteTask = function(todoId){
    let delIndex = todoList.findIndex(function(eachTodo){
      if(eachTodo.id === todoId){
        return true;
      }else{
        return false;
      }
    })
  
    todoList.splice(delIndex, 1);
}

onComleteTask = function(todoId){
  
  let taskIndex = todoList.findIndex(function(eachTodo){
    if(todoId === eachTodo.id){
      return true;
    }else{
      return false;
    }
  })
  let taskObject = todoList[taskIndex];
  if(taskObject.completed === true){
    taskObject.completed = false;
  }else{
    taskObject.completed = true;
  }
}

function closeAlert(){
  document.getElementById("customAlert").style.display = "none";
}



let createNewTask = function(todo){
    let taskElement = document.createElement('li');
    let checkboxId= "checkbox-" + todo.id;
    let taskElementId = "task-" + todo.id;
    let inputTaskCardId = "input-task-card-" + todo.id;

    let taskContainer = document.createElement('div');
    taskContainer.classList.add("d-flex", "flex-row", "align-items-center", "mb-2");
    taskElement.appendChild(taskContainer);

    let checkboxInput = document.createElement('input');
    checkboxInput.type = 'checkbox'; 
    checkboxInput.classList.add("checkbox-input");
    checkboxInput.id = checkboxId;
    checkboxInput.checked = todo.completed;
    taskContainer.appendChild(checkboxInput);

    let inputTaskCard = document.createElement('div');
    inputTaskCard.id = inputTaskCardId; 
    inputTaskCard.classList.add("input-task-card", "d-flex", "flex-row");
    if(checkboxInput.checked === true){
      inputTaskCard.classList.add("checked-container");
    }else{
      inputTaskCard.classList.remove("checked-container");
    }
    taskContainer.appendChild(inputTaskCard);

    let taskName = document.createElement('label');
    taskName.id = taskElementId;
    taskName.setAttribute('for',checkboxId); 
    taskName.classList.add("task-name");
    if(checkboxInput.checked === true){
        taskName.classList.add("checked");
      }else{
        taskName.classList.remove("checked");
    }
    taskName.textContent = todo.text;
    inputTaskCard.appendChild(taskName);

    checkboxInput.onclick = function() {
      taskName.classList.toggle("checked", checkboxInput.checked);
      inputTaskCard.classList.toggle("checked-container", checkboxInput.checked);
    onComleteTask(todo.id);
    };

    let delIconContainer = document.createElement('div');
    delIconContainer.classList.add("del-icon-container", "ml-auto");
    let delIcon = document.createElement('i');
    delIcon.classList.add("fa-solid", "fa-circle-minus", "del-icon");   
    delIconContainer.appendChild(delIcon);
    inputTaskCard.appendChild(delIconContainer);

    delIconContainer.onclick = function() {
      tasksContainerElement.removeChild(taskElement);
        deleteTask(todo.id);
    }

    tasksContainerElement.appendChild(taskElement);

}

for (todo of todoList) {
    createNewTask(todo);
}
