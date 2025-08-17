let tasksContainerElement = document.getElementById('tasksContainer');

let todoList = [
  {
    text: "Learn HTML",
    checkBoxId: "checkboxInput1"
  },
  {
    text: "Learn CSS",
    checkBoxId: "checkboxInput2"
  },
  {
    text: "Learn JavaScript",
    checkBoxId: "checkboxInput3"
  }
];

let createNewTask = function(todo){
    let taskElement = document.createElement('li');

    let taskContainer = document.createElement('div');
    taskContainer.classList.add("d-flex", "flex-row", "align-items-center", "mb-2");
    taskElement.appendChild(taskContainer);

    let checkboxInput = document.createElement('input');
    checkboxInput.type = 'checkbox'; 
    checkboxInput.classList.add("checkbox-input");
    checkboxInput.id = todo.checkBoxId;
    taskContainer.appendChild(checkboxInput);

    let inputTaskCard = document.createElement('div');
    inputTaskCard.classList.add("input-task-card", "d-flex", "flex-row");
    taskContainer.appendChild(inputTaskCard);

    let taskName = document.createElement('label');
    taskName.setAttribute('for', todo.checkBoxId); 
    taskName.classList.add("task-name");
    taskName.textContent = todo.text;
    inputTaskCard.appendChild(taskName);

    let delIconContainer = document.createElement('div');
    delIconContainer.classList.add("del-icon-container", "ml-auto");
    let delIcon = document.createElement('i');
    delIcon.classList.add("fa-solid", "fa-circle-minus", "del-icon");   
    delIconContainer.appendChild(delIcon);
    inputTaskCard.appendChild(delIconContainer);

    tasksContainerElement.appendChild(taskElement);

}


for (todo of todoList) {
    createNewTask(todo);
}