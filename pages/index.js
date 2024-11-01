import { useState, useEffect } from "react";
import { getTodos, saveTodos } from "../lib/cookie";
import Head from "next/head";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const savedTodos = getTodos();
    setTodos(savedTodos);
  }, []);

  const addTodo = () => {
    if (!newTodo.trim()) return;
    const updatedTodos = [...todos, { text: newTodo, completed: false }];
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
    setNewTodo('');
  };

  const toggleTodo = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  return (
    <>
      <Head>
        <title>Todo App</title>
      </Head>
      <div className="flex flex-col min-h-screen items-center justify-center py-2 bg-gray-200">
        <h1 className="text-4xl font-bold underline">Todo App</h1>
        <div className="w-full max-w-sm mt-5">
          <div className="flex flex-col w-full px-8 py-6 bg-white shadow-md rounded-lg">
            <div className="flex w-full items-center justify-center">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add new todo"
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:border-blue-400"
              />
              <button
                onClick={addTodo}
                className="ml-2 px-4 py-2 text-white bg-blue-500 rounded-lg"
              >Add</button>
            </div>
            <ul className="space-y-3">
               {todos.map((todo, index) => (
                <li
                  key={index}
                  style={{
                    color: todo.completed ? 'green' : 'black',
                    cursor: 'pointer',
                  }}
                  className={`flex items-center justify-between p-2 my-3 bg-white border-l-4 border-green-500 rounded duration-500`}
                >
                  <span onClick={() => toggleTodo(index)}>{todo.text}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteTodo(index); }}
                    className="text-red-600 decoration"
                  >Delete</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}