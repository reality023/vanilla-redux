import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";


const addTodo = (text) => {
  return {
    type: ADD_TODO,
    id: Date.now(),
    text
  }
}
const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    id,
  }
}

const reducer = (state = [], action) => {
  switch(action.type) {
    case ADD_TODO:
      return [{text: action.text, id: action.id }, ...state];
    case DELETE_TODO:
      return state.filter((todo) => todo.id !== Number(action.id));
    default:
      return state;
  }
}

const store = createStore(reducer);

store.subscribe(() => {
  paintTodos();
});

const dispatchAddTodo = (text) => {
  store.dispatch(addTodo(text))
};

const dispatchDeleteTodo = (e) => {
  store.dispatch(deleteTodo(e.target.parentNode.id));
}

const paintTodos = () => {
  const todos = store.getState();
  ul.innerHTML = "";
  todos.forEach(todo => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteTodo);
    li.id = todo.id;
    li.innerText = todo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

const onSubmit = e => {
  e.preventDefault();
  const todo = input.value;
  input.value = "";

  dispatchAddTodo(todo);
};

form.addEventListener("submit", onSubmit);