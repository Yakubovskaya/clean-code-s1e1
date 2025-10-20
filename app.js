const taskInput = document.getElementById("new-task");
const addButton = document.querySelector(".todo__add-btn");
const incompleteTaskHolder = document.querySelector(".todo__list_incomplete");
const completedTasksHolder = document.querySelector(".todo__list_complete");



const createNewTaskElement = function(taskString) {

    const listItem = document.createElement("li");
    listItem.className = "todo__item";
  
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.className = "todo__checkbox";
   
    const label = document.createElement("label");
    label.className = "todo__task";
    label.innerText = taskString;
    
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "todo__task-input";
    editInput.value = taskString;
   
    const editButton = document.createElement("button");
    editButton.className = "button todo__edit-btn";
    editButton.innerText = "Edit";
   
    const deleteButton = document.createElement("button");
    deleteButton.className = "button todo__delete-btn";
    const deleteButtonImg = document.createElement("img");
    deleteButtonImg.className = "todo__delete-icon";
    deleteButtonImg.src = './remove.svg';
    deleteButtonImg.alt = "Delete";
    deleteButton.appendChild(deleteButtonImg);

  
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
}



const addTask = function() {
    console.log("Add Task...");
    if (!taskInput.value) return;
    const listItem = createNewTaskElement(taskInput.value);

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    
    taskInput.value = "";
}



const editTask = function() {
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");

    const listItem = this.parentNode;

    const editInput = listItem.querySelector('.todo__task-input');
    const label = listItem.querySelector(".todo__task");
    const editBtn = listItem.querySelector(".todo__edit-btn");
    const containsClass = listItem.classList.contains("todo__item_edit-mode");
 
    if (containsClass) {
    	label.innerText = editInput.value;
    	label.classList.remove("todo__task_edit-mode");
    	editInput.classList.remove("todo__task-input_edit-mode");
    	editInput.style.display = "none";
    	label.style.display = "block";
    	editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        label.classList.add("todo__task_edit-mode");
        editInput.classList.add("todo__task-input_edit-mode");
        editInput.style.display = "inline-block";
        label.style.display = "none";
        editBtn.innerText = "Save";
    }
    listItem.classList.toggle("todo__item_edit-mode");
};

const deleteTask = function() {
    console.log("Delete Task...");

    const listItem = this.parentNode;
    const ul = listItem.parentNode;

    ul.removeChild(listItem);
}



const taskCompleted = function() {
    console.log("Complete Task...");

    const listItem = this.parentNode;

	const label = listItem.querySelector(".todo__task");

	listItem.classList.add("todo__item_done");
	label.classList.add("todo__task_line-through");

    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


const taskIncomplete = function() {
    console.log("Incomplete Task...");

    const listItem = this.parentNode;
	const label = listItem.querySelector(".todo__task");

	label.classList.remove("todo__task_line-through");

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}



const ajaxRequest = function() {
    console.log("AJAX Request");
}

addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


const bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    console.log("bind list item events");

    const checkBox = taskListItem.querySelector(".todo__checkbox");
    const editButton = taskListItem.querySelector(".todo__edit-btn");
    const deleteButton = taskListItem.querySelector(".todo__delete-btn");

    editButton.onclick = editTask;

    deleteButton.onclick = deleteTask;

    checkBox.onchange = checkBoxEventHandler;
}


for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}


for (let i = 0; i < completedTasksHolder.children.length; i++){
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
