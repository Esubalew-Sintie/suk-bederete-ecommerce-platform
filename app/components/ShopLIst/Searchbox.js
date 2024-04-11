import React from "react";

const Searchbox = () => {
  return (
    <div>
      <div class="w-full ml-6 justify-center flex flex-1 gap-x-3">
        <div class="flex cursor-pointer select-none items-center gap-x-2 rounded-full border hover:bg-[#484a39] py-3 px-4 hover:text-white bg-stone-200  text-[#484a39] transition duration-300 ease-in-out">
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
          <span class="text-2xl font-medium">Categories</span>
        </div>

        <input
          type="text"
          className="w-1/2 border-[#484a39] px-3 py-4 text-2xl  focus:border-gray-800 hover:border-[#232515] placeholder-stone-300 rounded-full "
          placeholder="Search for your favorite store..."
        />
      </div>
    </div>
  );
};

export default Searchbox;
