const TodoItem = ({ todo, onDelete, onUpdate }) => {
  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-300">
      <div>
        <h3 className="text-xl font-bold">{todo.name}</h3>
        <p className="text-sm text-gray-600">{todo.description}</p>
        <p className="text-sm text-gray-500">Due: {todo.dueDate}</p>
      </div>
      <div className="flex space-x-2">
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={() => onUpdate(todo)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded"
          onClick={() => onDelete(todo.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
