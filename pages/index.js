import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
// const todoTemplate = document.querySelector("#todo-template");
// const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter();

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const name = inputValues["name"];
    const dateValues = inputValues["date"]
     let date = new Date(dateValues);
       if (dateValues === "") {
    date = "";
  } else {
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  }
  

    const id = uuidv4();
    const values = { name, date, id };
    renderTodo(values);
    newTodoformValidator.resetValidation();

    addTodoPopup.close();
      },
});
addTodoPopup.setEventListeners();

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();
  return todoElement;
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    return generateTodo(item);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

// const openModal = (modal) => {
//   modal.classList.add("popup_visible");
// };

// const closeModal = (modal) => {
//   modal.classList.remove("popup_visible");
// };

// The logic in this function should all be handled in the Todo class.

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

// addTodoCloseBtn.addEventListener("click", () => {
//   addTodoPopup.close();
// });

const renderTodo = (item) => {
  const todo = generateTodo(item);
  section.addItem(todo);
};

// addTodoForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   const name = evt.target.name.value;
//   const dateInput = evt.target.date.value;

//   // Create a date object and adjust for timezone
//   let date = new Date(dateInput);

//   if (dateInput === "") {
//     date = "";
//   } else {
//     date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
//   }

//   const id = uuidv4();
//   const values = { name, date, id };
//   renderTodo(values);
//   newTodoformValidator.resetValidation();

//   addTodoPopup.close();
// });

// initialTodos.forEach((item) => {
//   renderTodo(item);
// });

const newTodoformValidator = new FormValidator(validationConfig, addTodoForm);
newTodoformValidator.enableValidation();
