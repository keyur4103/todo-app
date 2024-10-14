import React from "react";

const DeleteModal = ({ isOpen, todo, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Delete Todo</h2>
        <p>
          Are you sure you want to delete <strong>{todo.name}</strong>?
        </p>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="bg-gray-500 text-white px-3 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-3 py-2 rounded"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
