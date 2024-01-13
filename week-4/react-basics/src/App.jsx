import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoCard from "./components/TodoCard";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // ? add todo
  const handleAdd = (e) => {
    e.preventDefault();
    if (title && description) {
      let todo = { title, description, completed: false, id: uuidv4() };
      setTodos((todos) => [...todos, todo]);
      handleReset();
    }
  };

  // ? remove
  const handleRemove = (id) => {
    const newArray = todos.filter((todo) =>todo.id !== id);
    setTodos(() => newArray);
  };

  // ? check the todo
  const handleCheck = (completed, id) => {
    const newArray = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: completed };
      }
      return todo;
    });
    setTodos(() => newArray);
  };

  // ? reset form
  const handleReset = () => {
    setTitle("");
    setDescription("");
  };
  return (
    <div className="w-screen h-screen overflow-hidden">
      <div className="flex w-2/3 items-start gap-5 mx-auto h-full  p-5">
        {/* form section / create todos  */}
        <div className="w-1/2 mx-auto space-y-5 p-5 bg-royal-blue-50 rounded ">
          <h1 className="text-xl font-bold  text-royal-blue-800">
            Create Todos
          </h1>
          <form action="" className="space-y-3">
            <div className="space-y-1">
              <label htmlFor="title" className="text-sm">
                {" "}
                Title
              </label>{" "}
              <br />
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-royal-blue-100 text-sm py-1 px-2 rounded w-full outline-none"
                placeholder="Title"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="desc" className="text-sm">
                {" "}
                Description
              </label>{" "}
              <br />
              <textarea
                name="description"
                id="desc"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="bg-royal-blue-100 text-sm py-1 px-2 rounded w-full outline-none"
              ></textarea>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleAdd}
                className="py-2 px-7 text-xs font-medium text-white bg-royal-blue-500 hover:bg-royal-blue-600 active:bg-royal-blue-700 animate rounded "
              >
                Add
              </button>{" "}
              <button
                onClick={handleReset}
                className="py-2 px-7 text-xs font-medium text-royal-blue-500 hover:text-royal-blue-600 active:text-royal-blue-700 border border-royal-blue-500 hover:border-royal-blue-600 active:border-royal-blue-700 animate rounded "
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* todos list  */}
        <div className="w-1/2 h-full mx-auto space-y-5 p-5 bg-royal-blue-50 rounded overflow-hidden">
          <h1 className="text-xl font-bold  text-royal-blue-800">Todos List</h1>
          <div className="space-y-2 h-full overflow-hidden overflow-y-auto ">
            {todos.map((todo) => {
              return (
                <TodoCard
                  todo={todo}
                  key={todo.id}
                  remove={handleRemove}
                  check={handleCheck}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
