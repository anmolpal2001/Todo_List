import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import TodoForm from "./TodoForm";
import SearchTodo from "./SearchTodo";
import { GiCheckMark } from "react-icons/gi";
import { VscDash } from "react-icons/vsc";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [todoForm, setTodoForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const itemsPerPage = 50;
  const [loading, setLoading] = useState(false);

  const tableRef = useRef(null);

  const length = todos.length;

  const getTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = await response.json();
      setTodos(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleFilterSearch = (e) => {
    const searchValue = e.target.value;
    setFilteredTodos(
      todos.filter((todo) => todo.userId.toString() === searchValue)
    );
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(
    filteredTodos.length > 0
      ? filteredTodos.length
      : todos.length / itemsPerPage
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTodos =
    filteredTodos.length > 0
      ? filteredTodos.slice(startIndex, endIndex)
      : todos.slice(startIndex, endIndex);
      
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      if (tableRef.current) {
        tableRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      if (tableRef.current) {
        tableRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  return (
    <div className="w-screen h-screen">
      <nav className="flex justify-center sm:text-5xl text-4xl bg-slate-950 py-5 text-white">
        Todo List App
      </nav>
      <section className="my-10">
        <SearchTodo handleFilterSearch={handleFilterSearch}  />
        {todoForm && <TodoForm length={length} todoForm={setTodoForm} />}
        <div className="flex justify-center lg:w-[50vw] w-[90vw] mx-auto">
          <button
            onClick={() => setTodoForm((prev) => !prev)}
            className={`py-4 text-white w-full bg-blue-600 ${
              todoForm ? "opacity-75" : "opacity-100"
            }`}
          >
            {todoForm ? "Close" : "Add New Todo"}
          </button>
        </div>

        <div ref={tableRef} className="relative overflow-x-auto shadow-md sm:w-[100vw] md:w-[90vw] mx-auto mt-10">
          <table className="table-auto w-[100vw] lg:w-[50vw] mt-10 mx-auto overflow-x-auto overflow-y-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th scope="col" className="border px-0 sm:px-4 py-2">
                  #
                </th>
                <th scope="col" className="border px-4 py-2">
                  Title
                </th>
                <th scope="col" className="border px-4 py-2">
                  UserID
                </th>
                <th scope="col" className="border px-4 py-2">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {!loading ? currentTodos.map((todo) => (
                <tr key={todo.id}>
                  <td className="text-center border px-4 py-2">{todo.id}</td>
                  <td className="border px-4 py-2">{todo.title}</td>
                  <td className="text-center border px-4 py-2">
                    {todo.userId}
                  </td>
                  <td className="border px-4 py-2">
                    {todo.completed ? "Done" : <VscDash />}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex justify-center mt-16 mb-10">
            <button
              className="bg-gray-700 text-white hover:bg-gray-600  px-4 py-2 rounded-lg text-lg md:text-xl font-medium"
              onClick={handlePrevPage}
              style={{
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                opacity: currentPage === 1 ? 0.5 : 1,
              }}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span className="mx-4 text-gray-600 md:text-xl text-sm md:px-12 px-6 py-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              className="bg-gray-700 text-white hover:bg-gray-600 px-4 md:py-1 rounded-lg text-lg md:text-xl font-medium"
              style={{
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                opacity: currentPage === totalPages ? 0.5 : 1,
              }}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TodoList;
