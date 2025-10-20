//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

const taskInput=document.getElementById("new-task");//Add a new task.
const addButton=document.querySelector(".todo__add-btn");//first button
const incompleteTaskHolder=document.querySelector(".todo__list_incomplete");//ul of #incompleteTasks
const completedTasksHolder=document.querySelector(".todo__list_complete");//completed-tasks


//New task list item
const createNewTaskElement=function(taskString){

    const listItem=document.createElement("li");
    listItem.className = "todo__item";
    //input (checkbox)
    var checkBox=document.createElement("input");//checkbx
    checkBox.type = "checkbox";
    checkBox.className = "todo__checkbox";
    //label
    var label=document.createElement("label");//label
    label.className = "todo__task";
    label.innerText = taskString;
    //input (text)
    var editInput=document.createElement("input");//text
    editInput.type = "text";
    editInput.className = "todo__task-input";
    editInput.value = taskString;
    //button.edit
    var editButton=document.createElement("button");//edit button
    editButton.className = "button todo__edit-btn";
    editButton.innerText = "Edit";
    //button.delete
    var deleteButton=document.createElement("button");//delete button
    deleteButton.className = "button todo__delete-btn";
    var deleteButtonImg=document.createElement("img");//delete button image
    deleteButtonImg.className = "todo__delete-icon";
    deleteButtonImg.src = './remove.svg';
    deleteButtonImg.alt = "Delete";
    deleteButton.appendChild(deleteButtonImg);

    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
}



const addTask=function(){
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    
    taskInput.value = "";

}

//Edit an existing task.

const editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");

    const listItem=this.parentNode;

    const editInput=listItem.querySelector('.todo__task-input');
    const label=listItem.querySelector(".todo__task");
    const editBtn=listItem.querySelector(".todo__edit-btn");
    const containsClass=listItem.classList.contains("todo__item_edit-mode");
    //If class of the parent is .editmode
    if(containsClass){

        //switch to .editmode
        //label becomes the inputs value.
    	label.innerText = editInput.value;
    	label.classList.remove("todo__task_edit-mode");
    	editInput.classList.remove("todo__task-input_edit-mode");
    	editInput.style.display = "none";
    	label.style.display = "block";
    	editBtn.innerText = "Edit";
    }else{
        editInput.value = label.innerText;
        label.classList.add("todo__task_edit-mode");
        editInput.classList.add("todo__task-input_edit-mode");
        editInput.style.display = "inline-block";
        label.style.display = "none";
        editBtn.innerText = "Save";
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle("todo__item_edit-mode");
};


//Delete task.
const deleteTask=function(){
    console.log("Delete Task...");

    const listItem=this.parentNode;
    const ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
const taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem=this.parentNode;

	const label=listItem.querySelector(".todo__task");

	listItem.classList.add("todo__item_done");
	label.classList.add("todo__task_line-through");

    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


const taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    const listItem=this.parentNode;
	const label=listItem.querySelector(".todo__task");

	label.classList.remove("todo__task_line-through");
	
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.addEventListener("click",addTask);
// addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    var checkBox=taskListItem.querySelector(".todo__checkbox");
    var editButton=taskListItem.querySelector(".todo__edit-btn");
    var deleteButton=taskListItem.querySelector(".todo__delete-btn");


    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.