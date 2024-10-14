import { useState } from "react";

const AddTodo = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = { name, description, dueDate };

    fetch("http://localhost:8080/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("New todo added:", data);
        setName("");
        setDescription("");
        setDueDate("");
      })
      .catch((error) => console.error("Error adding todo:", error));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="w-full border border-gray-300 p-2"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full border border-gray-300 p-2"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full border border-gray-300 p-2"
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-3 py-2 rounded"
      >
        Add Todo
      </button>
    </form>
  );
};

export default AddTodo;
