"use client";
import React from "react";

const ShopItem = ({ fullWidth }) => {
  return (
    <div
      className={`transition-transform duration-500 rounded-lg shadow-lg hover:transform hover:scale-105 hover:cursor-pointer hover:shadow-blue-200 transform hover:shadow-md ${
        fullWidth ? "w-full" : "md:w-[45%] xl:w-[30%]"
      }  p-4 my-5  mx-5 overflow-hidden`}
    >
      <div className="relative h-80 overflow-hidden">
        <img
          className="transition-transform duration-500 hover:scale-105 inset-0 h-full w-full object-cover"
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
      <div className="transition-all duration-500 hover:border-stone-500 hover:bg-stone-200 p-4 border-t border-b text-xs text-gray-700 bg-stone-300 text-orange-800 flex">
        <span className=" hover:ml-2 flex items-center text-xl font-bold  transition-all duration-500">
          <i className="far fa-address-card fa-fw text-gray-900 mr-2"></i>{" "}
          Category
        </span>

        <span className="text-xl ml-auto">Rating: </span>
      </div>
    </div>
  );
};
export default ShopItem;
