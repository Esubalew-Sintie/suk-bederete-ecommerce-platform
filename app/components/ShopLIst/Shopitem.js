import React from "react";

const ShopItem = () => {
  return (
    <div className="hover:cursor-pointer hover:shadow-blue-200 transform hover:shadow-md sm:w-1/2 md:w-1/2 xl:w-[33%] p-4 my-5">
      <a
        href=""
        class="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden"
      >
        <div className="relative h-80 overflow-hidden">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://media.istockphoto.com/id/1206906927/photo/the-word-preview-on-a-blue-keyboard-button.jpg?b=1&s=612x612&w=0&k=20&c=d6ukqegO-dwN5FBgU8aDuhp54tYhmcoMCqVbUeKXRPY="
            alt=""
          />
        </div>
        <div className="p-4 bg-stone-100">
          <span className="inline-block px-4 py-4 leading-none bg-orange-300  text-[#484a39] rounded-full font-bold uppercase tracking-wide text-xl hover:bg-orange-500  hover:text-[#242619] hover:px-6 transition-all duration-500">
            Name of the Shop
          </span>
          <h2 className="mt-2 mb-2  font-bold text-2xl">
            Lorem ipsum dolor sit amet, consectetur
          </h2>
          <p className="text-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod
          </p>
        </div>
        <div className="transition-all duration-500 hover:border-stone-500 hover:bg-stone-200 p-4 border-t border-b text-xs text-gray-700 bg-stone-300 text-orange-800 ">
          <span className=" hover:ml-2 flex items-center text-xl font-bold  transition-all duration-500">
            <i className="far fa-address-card fa-fw text-gray-900 mr-2"></i>{" "}
            Category
          </span>
        </div>
        <div className="transition-all duration-500 hover:border-stone-500 border hover:bg-stone-200 p-4 flex items-center text-sm text-gray-600 bg-stone-300 text-orange-800 text-xl">
          <span className=" ml-2">Rating: </span>
        </div>
      </a>
    </div>
  );
};
export default ShopItem;
