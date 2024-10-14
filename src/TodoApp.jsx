import React, { useState, useEffect } from "react";
import EditModal from "./EditModal"; // Import the modal component
import DeleteModal from "./DeleteModal";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [alert, setAlert] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state
  const [currentTodo, setCurrentTodo] = useState(null); // Current todo for editing
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Modal open state for deleting

  // Fetch all todos
  useEffect(() => {
    fetch("http://ec2-18-234-54-0.compute-1.amazonaws.com:8080/api/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => setAlert(""), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = { name, description, dueDate };

    fetch("http://ec2-18-234-54-0.compute-1.amazonaws.com:8080/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos([...todos, data]);
        showAlert("Todo added successfully!");
        setName("");
        setDescription("");
        setDueDate("");
      })
      .catch((error) => console.error("Error adding todo:", error));
  };

  // Handle delete
  const handleDelete = (id) => {
    fetch(
      `http://ec2-18-234-54-0.compute-1.amazonaws.com:8080/api/todos/${id}`,
      {
        method: "DELETE",
      }
    )
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
        setIsDeleteModalOpen(false); // Close the delete modal

        showAlert("Todo deleted successfully!");
      })
      .catch((error) => console.error("Error deleting todo:", error));
  };

  // Handle opening the edit modal
  const handleEdit = (todo) => {
    setIsModalOpen(true);
    setCurrentTodo(todo);
  };

  // Handle saving the updated todo
  const handleSave = () => {
    fetch(
      `http://ec2-18-234-54-0.compute-1.amazonaws.com:8080/api/todos/${currentTodo.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentTodo),
      }
    )
      .then((response) => response.json())
      .then((updatedTodo) => {
        setTodos(
          todos.map((todo) => (todo.id === currentTodo.id ? updatedTodo : todo))
        );
        setIsModalOpen(false);
        showAlert("Todo updated successfully!");
      })
      .catch((error) => console.error("Error updating todo:", error));
  };

  // Handle input change for editing
  const handleChange = (field, value) => {
    setCurrentTodo({
      ...currentTodo,
      [field]: value,
    });
  };

  // Handle filtering
  const handleFilter = (e) => {
    e.preventDefault();

    let query = `http://ec2-18-234-54-0.compute-1.amazonaws.com:8080/api/todos/filter?`;
    if (filterName) query += `name=${filterName}&`;
    if (filterDate) query += `date=${filterDate}`;

    fetch(query)
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error filtering todos:", error));
  };

  const handleOpenDeleteModal = (todo) => {
    setIsDeleteModalOpen(true);
    setCurrentTodo(todo);
  };

  return (
    <div className="container mx-auto p-4">
      {alert && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold">{alert}</p>
          </div>
        </div>
      )}
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>

      {/* Add Todo Form */}
      <form onSubmit={handleSubmit} className="mb-4 space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Todo Name"
          className="w-full border p-2"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full border p-2"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full border p-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-2 rounded"
        >
          Add Todo
        </button>
      </form>

      {/* Filter Todos */}
      <form onSubmit={handleFilter} className="mb-4 space-y-4">
        <input
          type="text"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          placeholder="Filter by Name"
          className="w-full border p-2"
        />
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="w-full border p-2"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-3 py-2 rounded"
        >
          Filter Todos
        </button>
      </form>

      {/* Todo List */}
      <div className="space-y-4">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex justify-between items-center p-4 border-b border-gray-300"
          >
            <div>
              <h3 className="text-xl font-bold">{todo.name}</h3>
              <p>{todo.description}</p>
              <p className="text-sm text-gray-500">Due Date: {todo.dueDate}</p>
            </div>
            <div className="space-x-2">
              <button
                className="bg-yellow-500 text-white px-3 py-2 rounded"
                onClick={() => handleEdit(todo)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-2 rounded"
                onClick={() => handleOpenDeleteModal(todo)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      <EditModal
        isOpen={isModalOpen}
        todo={currentTodo}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        onChange={handleChange}
      />
      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        todo={currentTodo}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => handleDelete(currentTodo.id)}
      />
    </div>
  );
};

export default TodoApp;
