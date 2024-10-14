import React from "react";

const EditModal = ({ isOpen, todo, onClose, onSave, onChange }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit Todo</h2>
        <div className="space-y-4">
          <input
            type="text"
            value={todo.name}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="Todo Name"
            className="w-full border p-2"
          />
          <input
            type="text"
            value={todo.description}
            onChange={(e) => onChange("description", e.target.value)}
            placeholder="Description"
            className="w-full border p-2"
          />
          <input
            type="date"
            value={todo.dueDate}
            onChange={(e) => onChange("dueDate", e.target.value)}
            className="w-full border p-2"
          />
          <div className="flex justify-end space-x-2">
            <button
              className="bg-gray-500 text-white px-3 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white px-3 py-2 rounded"
              onClick={onSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
