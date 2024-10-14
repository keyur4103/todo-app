import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/todos/${id}`, {
      method: "DELETE",
    })
      .then(() => setTodos(todos.filter((todo) => todo.id !== id)))
      .catch((error) => console.error("Error deleting todo:", error));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="space-y-4">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={handleDelete}
            onUpdate={(todo) => console.log("Edit", todo)}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
