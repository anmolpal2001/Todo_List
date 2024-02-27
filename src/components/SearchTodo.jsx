import React from "react";
import { IoIosSearch } from "react-icons/io";

const SearchTodo = ({ handleFilterSearch }) => {
  return (
    <div className="w-[90vw] lg:w-[50vw] mx-auto my-10">
      <form className="mx-auto" onSubmit={(e) => e.preventDefault()}>
        <div className="relative w-full">
          <div className="absolute top-0 bottom-0 flex items-center ps-3 pointer-events-none">
            <IoIosSearch className="text-gray-400" size={20} />
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-white border border-gray-600 rounded-lg bg-gray-700 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 "
            placeholder="Search by user id"
            onChange={handleFilterSearch}
            required
          />
        </div>
      </form>
    </div>
  );
};

export default SearchTodo;
