import React, { useState } from "react";

const TodoForm = ({ length, todoForm }) => {
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);

  const addTodo = async (e) => {
    e.preventDefault();
    try {
      length = length + 1;
      if (userId === "" || title === "") {
        alert("Please fill in all fields");
        return;
      }
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: length,
            userId: userId,
            title: title,
            completed: completed,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      todoForm((prev) => !prev);
      alert("Todo added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (e) => {
    const isNumeric = /^\d+$/;
    const isBackspace = e.key === "Backspace";
    const key = e.key;
    if (!(isNumeric.test(e.key) || isBackspace)) {
      e.preventDefault();
    }
  };

  const handleSubmit = (e) => {
    addTodo();
  };
  return (
    <div className="w-[90vw] lg:w-[50vw] mx-auto my-10">
      <form onSubmit={handleSubmit}>
        <div className="w-full flex flex-col my-5">
          <label htmlFor="todo" className="text-[15px]">
            Todo
          </label>
          <input
            type="text"
            placeholder="Enter your todo here"
            className="h-14 bg-gray-200 pl-5 outline-none"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="sm:flex gap-5 my-5 block">
          <div className="md:w-1/2 flex flex-col">
            <label htmlFor="completed">User Id</label>
            <input
              type="text"
              className="h-14 bg-gray-200 pl-5 outline-none"
              inputMode="numeric"
              pattern="\d*"
              placeholder="Enter user id here"
              onChange={(e) => setUserId(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="md:w-1/2 flex flex-col w-full mt-5 sm:mt-0">
            <label htmlFor="completed">Completed</label>
            <select
              name="completed"
              id="completed"
              defaultValue={completed}
              className="h-14 bg-gray-200 pl-5 outline-none"
              onChange={(e) => setCompleted(e.target.value)}
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={addTodo}
          className="py-4 text-white text-xl bg-blue-600 w-full"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
