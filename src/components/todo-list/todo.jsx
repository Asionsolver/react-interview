import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
const Todo = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      task: input,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInput("");
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleCompleteTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleEditTodo = (id) => {
    const newTask = prompt("Edit your task:");
    if (newTask && newTask.trim() !== "") {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, task: newTask } : todo
        )
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold text-pink-800 mb-4">Todo List</h1>

      <div className="flex gap-2 w-full max-w-md ">
        <input
          type="text"
          placeholder="Add a new task"
          className="border border-pink-300 rounded-lg p-2 w-full placeholder:text-pink-300 focus:outline-pink-500"
          value={input}
          onChange={handleChange}
        />

        <button
          onClick={handleAddTodo}
          className="bg-pink-500 text-white rounded-lg px-3 py-2 w-30 max-w-full hover:bg-pink-600 transition-all"
        >
          Add Task
        </button>
      </div>

      <ul className="mt-6 w-full max-w-md">
        {todos.length === 0 ? (
          <p className="text-pink-300 text-center">No tasks added yet!</p>
        ) : (
          todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center bg-pink-50 border border-pink-200 rounded-lg p-3 mb-2"
            >
              <div
                className="flex items-center text-lg"
                onClick={() => handleCompleteTodo(todo.id)}
              >
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={todo.completed}
                  onChange={() => handleCompleteTodo(todo.id)}
                />
                <span
                  className={todo.completed ? "line-through text-pink-400" : ""}
                >
                  {todo.task}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditTodo(todo.id)}
                  className="text-blue-500 rounded-lg hover:text-blue-600 transition-all"
                >
                  <MdModeEdit size={25} />
                </button>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="text-red-500 rounded-lg  hover:text-red-600 transition-all"
                >
                  <MdDelete size={25} />
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Todo;
