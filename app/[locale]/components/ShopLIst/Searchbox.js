import React from "react";
import Dropdown from "./Dropdown";
const Searchbox = () => {
  return (
    <div>
      <div class="w-full ml-6 justify-center flex flex-1/2 gap-x-3">
        <div class="flex cursor-pointer select-none items-center gap-x-2 rounded-lg border   border-[#1E293B]  hover:text-white bg-[#1E293B] text-white transition duration-300 ease-in-out">
          <span className="rounded-none xl:text-2xl sm:text-xl font-medium">
            <Dropdown name="Catagories" />
          </span>
        </div>

        <input
          type="text"
          className="w-1/2 xl:w-1/3   md:px-3 md:py-1 md:text-xl  xl:text-xl placeholder-stone-300 focus:border-[#1E293B] rounded-full focus:outline-none sm:py-1 sm:px-2 sm:text-sm xs:py-1"
          placeholder="Search for your favorite store..."
        />
      </div>
    </div>
  );
};

export default Searchbox;
