const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");

let todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
  todos.forEach((item) => addTodo(item));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo(item) {
  let todoText = input.value;

  if (item) {
    todoText = item.text;
  }

  if (todoText) {
    const todoElement = document.createElement("li");
    if (item && item.completed) {
      todoElement.classList.add("completed");
    }

    todoElement.innerText = todoText;

    todoElement.addEventListener("click", () => {
      todoElement.classList.toggle("completed");
      updateLS();
    });

    todoElement.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      todoElement.remove();
      updateLS();
    });

    todosUL.appendChild(todoElement);
    input.value = "";
    updateLS();
  }
}

function updateLS() {
  todosEl = document.querySelectorAll("li");

  const todos = [];

  todosEl.forEach((todoElement) => {
    todos.push({
      text: todoElement.innerText,
      completed: todoElement.classList.contains("completed"),
    });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}
