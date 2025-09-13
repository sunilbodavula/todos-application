let tasksContainerElement = document.getElementById('tasksListContainer');
let userInputTaskElement = document.getElementById("userInputTask");
let addTaskButtonElement = document.getElementById('addTaskButton');
let saveTasksButtonElement = document.getElementById('saveTasksButton');
let clearTasksButtonElement = document.getElementById('clearTasksButton');
let calenderContainerElement = document.getElementById('calenderContainer');
let calenderLogoElement = document.getElementById('calenderLogo');

calenderLogoElement.onclick = () => {
  calenderContainerElement.classList.toggle("calender-display");
}

let dailyTodos = [
  {id : "2025-09-12",
   todos : localStorage.getItem("todos")
  },
  {id :"2025-09-13",
   todos : localStorage.getItem("todos")
  },
  {id : "2025-09-14",
   todos : localStorage.getItem("todos")
  },
  {id : "2025-09-15",
   todos : localStorage.getItem("todos")
  },
  {id : "2025-09-16",
   todos : localStorage.getItem("todos")
  },
  {id : "2025-09-17",
   todos : localStorage.getItem("todos")
  },
  {id : "2025-09-18",
   todos : localStorage.getItem("todos")
  },
  {id :"2025-09-19",
   todos : localStorage.getItem("todos")
  },
  {id : "2025-09-20",
   todos : localStorage.getItem("todos")
  },
  {id : "2025-09-21",
   todos : localStorage.getItem("todos")
  },
  {id : "2025-09-22",
   todos : localStorage.getItem("todos")
  },
  {id : "2025-09-23",
   todos : localStorage.getItem("todos")
  },
  {id : "2025-09-24",
   todos : localStorage.getItem("todos")
  },
]

let displayOldTodos = function(todo){
  let oldTodosContainer = document.getElementById("oldTodosContainer");
  oldTodosContainer.style.display = "flex";
  let oldDateHeading = document.createElement("h1")
  oldDateHeading.classList.add("old-todos-heading");
  oldDateHeading.textContent = "Date: " + todo.id;
  let oldTodoListContainer = document.createElement("div");
  oldTodoListContainer.classList.add("old-todos-list");
  oldTodoListContainer.appendChild(oldDateHeading);
  let oldTodoList = JSON.parse(todo.todos);
  if(oldTodoList === null || oldTodoList.length === 0){
    let noDataFoundElement = document.createElement("p");
    noDataFoundElement.classList.add("no-data-found");
    noDataFoundElement.textContent = "No Data Found";
    oldTodoListContainer.appendChild(noDataFoundElement);
  }else {
    for (let eachOldTodo of oldTodoList){
    let oldTodoCard = document.createElement("div");
    oldTodoCard.classList.add("old-todo-card");
    let oldTodoText = document.createElement("p");
    oldTodoText.classList.add("old-todo-text");
    oldTodoText.textContent = eachOldTodo.text;
    oldTodoCard.appendChild(oldTodoText);
    let statusIcon = document.createElement("i");
    statusIcon.classList.add("status-icon",);
    if(eachOldTodo.completed === true){
      statusIcon.classList.add("fa-solid", "fa-circle-check");
      statusIcon.style.color = "#04d763ff";
      oldTodoCard.appendChild(statusIcon);
    }else{
      statusIcon.classList.add("fa-solid", "fa-circle-xmark");
      statusIcon.style.color = "#f81a1aff";
      oldTodoCard.appendChild(statusIcon);
    }
    oldTodoListContainer.appendChild(oldTodoCard);
  }
  }
  let closeButtonCard = document.createElement("div");
  closeButtonCard.classList.add("d-flex", "justify-content-end", "mt-3");
  let closeButton = document.createElement("button");
  closeButton.classList.add("button");
  closeButton.textContent = "Close";
  closeButton.onclick = function(){
    oldTodosContainer.style.display = "none";
  }
  closeButtonCard.appendChild(closeButton);
  oldTodoListContainer.appendChild(closeButtonCard);
  oldTodosContainer.innerHTML = "";
  oldTodosContainer.appendChild(oldTodoListContainer);
}

let createCalender = function(todo){
  let dateElement = document.createElement("div");
  dateElement.classList.add("date-card");
  let dateTextElement = document.createElement("p");
  dateTextElement.textContent = todo.id.slice(8, 10);
  dateTextElement.classList.add("date-text");
  dateElement.appendChild(dateTextElement);
  calenderContainerElement.appendChild(dateElement);
  dateElement.onclick = function(){
    displayOldTodos(todo);
  }
}

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
    delIcon.classList.add("fa-solid", "fa-trash", "icon");   
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

for (todo of dailyTodos) {
  createCalender(todo);
}