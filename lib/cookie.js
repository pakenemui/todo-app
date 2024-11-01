import Cookies from "js-cookie";

export function getTodos() {
  const todos = Cookies.get('todos');
  return todos ? JSON.parse(todos) : [];
}

export function saveTodos(todos) {
  Cookies.set('todos', JSON.stringify(todos), { expires: 7 });
}