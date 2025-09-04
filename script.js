let tasksContainerElement = document.getElementById('tasksListContainer');
let userInputTaskElement = document.getElementById("userInputTask");
let addTaskButtonElement = document.getElementById('addTaskButton');
let saveTasksButtonElement = document.getElementById('saveTasksButton');
let clearTasksButtonElement = document.getElementById('clearTasksButton');

function getLocalStorageTodos(){
  let todoList = JSON.parse(localStorage.getItem("todos"));
    if (todoList === null){
    return [];
    
  }else{
    return todoList;
  }
}

let todoList = getLocalStorageTodos();

clearTasksButtonElement.onclick = function() {
  tasksContainerElement.innerHTML = "";
  todoList = [];
}

saveTasksButtonElement.onclick = function() {
  localStorage.setItem("todos", JSON.stringify(todoList));
}

addTaskButtonElement.onclick = function() {
    let userInputTask = userInputTaskElement.value.trim();

    if(userInputTask ===  ""){
      let alertMessageElement = document.getElementById("alertMessage");
        alertMessageElement.textContent = "Input Task cannot be EMPTY!";
      document.getElementById("customAlert").style.display = "flex";
      return;
    }
    let isPresent = false;
    todoList.forEach(task => {
      if(userInputTask === task.text){
        isPresent = true;
      }
    })
    if(isPresent === true){
      let alertMessageElement = document.getElementById("alertMessage");
        alertMessageElement.textContent = "Task already exists!";
        document.getElementById("customAlert").style.display = "flex";
        return;
    }


    let newTodo = {
      text: userInputTask,
      id: Math.ceil(Math.random()*1000),
      completed: false
    }
    
    todoList.push(newTodo);
    createNewTask(newTodo);
    userInputTaskElement.value = ""; 
    saveTasksButtonElement.style.display = "inline";

}

moveUp = function(todo){
  let taskIndex = todoList.findIndex(function(eachTodo){
    if(todo.id === eachTodo.id){
      return true;
    }
  })
  let temp = todoList[taskIndex - 1];
  todoList[taskIndex - 1] = todoList[taskIndex];
  todoList[taskIndex] = temp;
}

moveDown = function(todo){
  let taskIndex = todoList.findIndex(function(eachTodo){
    if(todo.id === eachTodo.id){
      return true;
    }
  })
  let temp = todoList[taskIndex + 1];
  todoList[taskIndex + 1] = todoList[taskIndex];
  todoList[taskIndex] = temp;
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
  userInputTaskElement.value = "";
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

    let iconsContainer = document.createElement('div');
    iconsContainer.classList.add("icons-container", "ml-auto");
    let upArrowIcon = document.createElement("i");
    upArrowIcon.classList.add("fa-solid", "fa-circle-up", "icon", "up");
    iconsContainer.appendChild(upArrowIcon);
    let downArrowIcon = document.createElement('i');
    downArrowIcon.classList.add("fa-solid", "fa-circle-down", "icon", "down");
    iconsContainer.appendChild(downArrowIcon);
    let delIcon = document.createElement('i');
    delIcon.classList.add("fa-solid", "fa-circle-minus", "icon");   
    iconsContainer.appendChild(delIcon);
    inputTaskCard.appendChild(iconsContainer);

    upArrowIcon.onclick = function(){
      let prev = taskElement.previousElementSibling;
      if(prev){
        tasksContainerElement.insertBefore(taskElement, prev);
        moveUp(todo);
      }
    }

    downArrowIcon.onclick = function(){
      let next = taskElement.nextElementSibling;
      if(next){
        tasksContainerElement.insertBefore(next, taskElement);
        moveDown(todo);
      }
    }
    

    delIcon.onclick = function() {
      tasksContainerElement.removeChild(taskElement);
        deleteTask(todo.id);
    }

    tasksContainerElement.appendChild(taskElement);

}

for (todo of todoList) {
    createNewTask(todo);
}
