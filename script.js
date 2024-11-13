// Selecting DOM elements
const todoForm = document.querySelector('form');
const todoInput = document.querySelector('#todo-input');
const todoListUl = document.querySelector('#todo-list');

// Retrieve todos from local storage
let allTodos = getTodos();

// Initial display of the todo list
updateTodoList();

// Add submit event listener to the form
todoForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent page reload on form submission
    addTodo(); // Add new todo item
});

// Function to add a new todo item
function addTodo() {
    const todoText = todoInput.value.trim(); // Trim input to remove extra spaces
    if (todoText.length > 0) {
        const todoObject = {
            text: todoText,
            completed: false,
        };
        allTodos.push(todoObject); // Add new todo to the array
        updateTodoList(); // Update the displayed todo list
        saveTodos(); // Save updated list to local storage
        todoInput.value = ''; // Clear input field
    }
}

// Function to update the displayed todo list
function updateTodoList() {
    todoListUl.innerHTML = ''; // Clear current list in the DOM
    allTodos.forEach((todo, todoIndex) => {
        const todoItem = createTodoItem(todo, todoIndex); // Create each todo item
        todoListUl.appendChild(todoItem); // Add item to the list in the DOM
    });
}

// Function to create individual todo item DOM element
function createTodoItem(todo, todoIndex) {
    const todoLI = document.createElement('li');
    const todoText = todo.text;
    const todoId = 'todo-' + todoIndex;
    todoLI.className = 'todo';
    todoLI.innerHTML = `
        <input type="checkbox" id="${todoId}">
        <label for="${todoId}" class="custom-checkbox">
            <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
        </label>
        <label for="${todoId}" class="todo-text">
            ${todoText}
        </label>
        <button class="delete-button">
            <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
        </button>
    `;

    // Delete button functionality
    const deleteButton = todoLI.querySelector('.delete-button');
    deleteButton.addEventListener('click', () => {
        deleteTodoItem(todoIndex);
    });

    // Checkbox functionality to mark completion
    const checkbox = todoLI.querySelector("input");
    checkbox.addEventListener('change', () => {
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodos(); // Save updated state to local storage
    });
    checkbox.checked = todo.completed; // Set checkbox based on completion status
    return todoLI;
}

// Function to delete a todo item
function deleteTodoItem(todoIndex) {
    allTodos = allTodos.filter((_, i) => i !== todoIndex); // Remove specific item
    saveTodos(); // Save updated list to local storage
    updateTodoList(); // Refresh the displayed list
}

// Function to save todos to local storage
function saveTodos() {
    const todosJson = JSON.stringify(allTodos);
    localStorage.setItem('todos', todosJson);
}

// Function to retrieve todos from local storage
function getTodos() {
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : []; // Return an empty array if no todos
}
