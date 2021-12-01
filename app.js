//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Functions

function addTodo(event) {
    //Prevent form from submitting
    event.preventDefault();
    if (todoInput.value !== "") {
        //Todo DIV
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        //Create LI
        const newTodo = document.createElement("li");
        if (todoInput.value !== "") {
            //alert("");
            newTodo.innerText = todoInput.value;
            newTodo.classList.add("todo-item");
            todoDiv.appendChild(newTodo);
        } else {
            alert("Add Items");
            //newTodo.innerText = "Add Items";
            newTodo.classList.add("todo-item");
            todoDiv.appendChild(newTodo);
        }

        //Add Todo to Local Storage
        saveLocalTodos(todoInput.value);

        //Check Mark button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn", "press-down");
        todoDiv.appendChild(completedButton);

        //Delete button
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add("delete-btn");
        todoDiv.appendChild(deleteButton);

        //Append to UL
        todoList.appendChild(todoDiv);

        todoInput.value = "";
    } else {
        alert("Enter some task todo");
    }

}

function deleteCheck(e) {
    const item = e.target;
    //Delete ToDo
    if (item.classList[0] === "delete-btn") {
        const todo = item.parentElement;
        //Adnimation
        todo.classList.add("deleted");
        //Remove element
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function() {
            todo.remove();
        });
    }

    //Check Mark
    if (item.classList[0] === "complete-btn") {
        console.log(e.target);
        const todo = item.parentElement;
        const button = e.target;
        todo.classList.toggle("completed");
        button.classList.toggle("press-down");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    //Check if there is anything in local storage
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    //Check if there is anything in local storage
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
        //Todo DIV
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        //Create LI
        const newTodo = document.createElement("li");

        if (todoInput.value !== "") {
            newTodo.innerText = value;
            newTodo.classList.add("todo-item");
            todoDiv.appendChild(newTodo);
        } else {

            //newTodo.innerText = "Add Items";
            newTodo.classList.add("todo-item");
            todoDiv.appendChild(newTodo);
        }

        //Check Mark button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn", "press-down");
        todoDiv.appendChild(completedButton);

        //Delete button
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add("delete-btn");
        todoDiv.appendChild(deleteButton);

        //Append to UL
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}