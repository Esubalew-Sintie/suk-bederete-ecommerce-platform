import React from "react";

const Searchbox = () => {
  return (
    <div>
      <div class="w-full ml-6 justify-center flex flex-1/2 gap-x-3">
        <div class="flex cursor-pointer select-none items-center gap-x-2 rounded-full border hover:bg-[#484a39] sm:py-2 md:py-3 px-4 hover:text-white bg-stone-200  text-[#484a39] transition duration-300 ease-in-out">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-xl"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <span class="xl:text-2xl sm:text-xl font-medium">Categories</span>
        </div>

        <input
          type="text"
          className="w-1/2 xl:w-1/3 border-[#484a39] md:px-3 md:py-2 md:text-xl  xl:text-2xl focus:border-gray-800 hover:border-[#232515] placeholder-stone-300 rounded-full sm:py-1 sm:px-2 sm:text-sm xs:py-1"
          placeholder="Search for your favorite store..."
        />
      </div>
      <div>
        <form className="max-w-sm mx-auto my-4">
          <label for="underline_select" class="sr-only">
            Underline select
          </label>
          <select
            id="underline_select"
            className="block py-2.5 px-0 w-full xl:text-2xl md:text-xl sm:text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer mr-16 "
          >
            <option selected>Choose by Category</option>
            <option value="s1">Dress store</option>
            <option value="s2">home utilities</option>
            <option value="s3">home furniture</option>
            <option value="s4">different tools</option>
          </select>
        </form>
      </div>
    </div>
  );
};

export default Searchbox;
