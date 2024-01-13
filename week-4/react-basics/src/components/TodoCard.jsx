const TodoCard = ({ todo, remove, check }) => {
  const { id, title, description, completed } = todo;
  return (
    <div className="bg-royal-blue-100 rounded p-2 flex gap-2 items-start">
      <div>
        <input type="checkbox" onChange={() => check(!completed, id)} />
      </div>
      <div>
        <h4
          className={`text-sm font-medium text-royal-blue-800 ${
            completed ? "line-through" : ""
          }`}
        >
          {title}
        </h4>
        <p
          className={`text-sm text-gray-400 ${completed ? "line-through" : ""}`}
        >
          {description}
        </p>
        <button
          onClick={(e) => remove(id)}
          className="py-2 px-7 text-xs font-medium text-red-500 hover:text-red-600 active:text-red-700 border border-red-500 hover:border-red-600 active:border-red-700 animate rounded "
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
